import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Utilities from "../Utilities/Utilities.js";
import DistributionCenter from "../DistributionCenter/DistributionCenter.js";
import GameEvent from "../GameEvent/GameEvent.js";
import World from "../World/World.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

export default class TransporterUI {

	static BASE_DELTA = 1000;
	#inactiveItems;
	#activeItems;
	#inMotionItems;
	#scene;
	#transporterDelta;

	constructor(scene) {
		this.#activeItems = new Map();
		this.#inactiveItems = new Map();
		this.#inMotionItems = new Map();
		this.#scene = scene;
		this.#transporterDelta = TransporterUI.BASE_DELTA;
	}

	update(time, delta) {
		this.#transporterDelta -= delta;
		if (this.#transporterDelta <= 0) {
			this.#transporterDelta = TransporterUI.BASE_DELTA;
			this.activateItems();
		}
		this.keepItemsInMotion();
	}

	add(item, building) {
		let directionVector;
		if (Extractor.Has(building.type)) {
			directionVector = [building.directionVector.clone()];
			item.setActiveImage(item.oreImage);
		} else if (Conveyor.Has(building.type)) {
			directionVector = building.startingDirectionVector;
		} else if (Purifier.Has(building.type)) {
			directionVector = building.startingDirectionVector;
			item.setActiveImage(item.oreImage);
		} else if (Combinator.Has(building.type)) {
			directionVector = building.startingDirectionVector;
		}
		this.#inactiveItems.set(item, { building, directionVector });
	}

	remove(item) {
		this.#activeItems.remove(item);
		this.#inactiveItems.remove(item);
	}

	activateItems() {
		this.#motionTheItems(this.#inactiveItems);
	}

	keepItemsInMotion() {
		this.#motionTheItems(this.#inMotionItems);
	}

	#motionTheItems(items) {
		items.forEach((cellData, item) => {
			if (this.#moveItem(item, cellData)) {
				this.#activeItems.set(item, cellData);
			}
			items.delete(item);
		});
	}

	#moveItem(item, cellData) {
		const tweenInformation = this.#getTweenInformation(item, cellData.building);
		if (!tweenInformation) {
			item.activeImage.destroy();
			return false;
		}
		item.activeImage.setPosition(tweenInformation.start.x, tweenInformation.start.y);
		const tweenConfig = {
			duration: tweenInformation.duration,
			onCompleteParams: [item, cellData.building],
			targets: item.activeImage,
			onComplete: (tween, targets, item) => {
				this.#activeItems.delete(item);
				const nextPosition = cellData.building.position.add(tweenInformation.endingDirectionVector);
				const nextWorldItem = this.#scene.getPosition(nextPosition);
				if (!Conveyor.Has(nextWorldItem.building?.type)) {
					if (DistributionCenter.Has(nextWorldItem.building?.type)) {
						const {type, purity} = item;
						const amount = DistributionCenter.Pricing(type) * purity;
						GameEvent.Emit(GameEvent.STAT_CASH, amount);
					} else if ((Purifier.Has(nextWorldItem.building?.type) || Combinator.Has(nextWorldItem.building?.type)) && nextWorldItem.building.canAcceptOre(item)) {
						const {building} = nextWorldItem;
						building.addOreToInventory(item);
					}
					item.activeImage?.destroy();
				} else {
					this.#inMotionItems.set(item, {
						building: nextWorldItem.building,
						directionVector: nextWorldItem.building.startingDirectionVector
					});
				}
			}
		};
		if (tweenInformation.isCurve) {
			tweenConfig.x = tweenInformation.interpolationData.x;
			tweenConfig.y = tweenInformation.interpolationData.y;
			tweenConfig.interpolation = 'bezier';
		} else {
			tweenConfig.x = tweenInformation.end.x;
			tweenConfig.y = tweenInformation.end.y;
		}
		this.#scene.tweens.add(tweenConfig);
		return true;
	}

	#getTweenStartingEndingDirectionVector(item, building) {
		const directionIndex = building.startingDirectionVector.findIndex(
			directionVector => directionVector.round().equals(item.directionVector.round())
		);
		if (directionIndex === -1) {
			return false;
		}
		const startingDirectionVector = building.startingDirectionVector[directionIndex];
		const endingDirectionVector = building.endingDirectionVector.length === 1 ?
			building.endingDirectionVector[0] :
			building.endingDirectionVector[directionIndex];
		return { startingDirectionVector, endingDirectionVector };
	}

	#processConveyorTweenInformation(item, building, directionVectors) {
		const duration = 1000;
		const movement = World.UNIT_SIZE;
		const { startingDirectionVector, endingDirectionVector } = directionVectors;
		const start = Utilities.GridToPosition(building.position);
		const isCurve = !startingDirectionVector.equals(endingDirectionVector);
		const oppositeDirectionVector = startingDirectionVector.opposite();
		start.x += oppositeDirectionVector.x * World.UNIT_HALF_SIZE;
		start.y += oppositeDirectionVector.y * World.UNIT_HALF_SIZE;
		const end = Utilities.GridToPosition(building.position);
		end.x += endingDirectionVector.x * World.UNIT_HALF_SIZE;
		end.y += endingDirectionVector.y * World.UNIT_HALF_SIZE;
		let interpolationData = {};
		if (isCurve) {
			const controlPoint = Utilities.GridToPosition(building.position);
			interpolationData = {
				x: [start.x, controlPoint.x, end.x],
				y: [start.y, controlPoint.y, end.y]
			};
		}
		return { item, building, start, end, duration, movement, endingDirectionVector, isCurve, interpolationData };
	}

	#getTweenInformation(item, building) {
		if (Extractor.Has(building.type) || Purifier.Has(building.type) || Combinator.Has(building.type)) {
			const duration = 500;
			const movement = World.UNIT_HALF_SIZE;
			const startingDirectionVector = Combinator.Has(building.type) ? building.endingDirectionVector[0].round() : building.directionVector.round();
			const start = Utilities.GridToPosition(building.position);
			const end = {x: start.x + World.UNIT_HALF_SIZE * startingDirectionVector.x, y: start.y + World.UNIT_HALF_SIZE * startingDirectionVector.y };
			return { item, building, start, end, duration, movement, endingDirectionVector: startingDirectionVector };
		} else if (Conveyor.Has(building.type)) {
			const directionVectors = this.#getTweenStartingEndingDirectionVector(item, building);
			if (!directionVectors) {
				return;
			}
			const processedData = this.#processConveyorTweenInformation(item, building, directionVectors);
			item.setDirectionVector(processedData.endingDirectionVector);
			return processedData;
		} else {
			return false;
		}
	}
}