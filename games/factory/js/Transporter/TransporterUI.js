import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Utilities from "../Utilities/Utilities.js";
import DistributionCenter from "../DistributionCenter/DistributionCenter.js";
import GameEvent from "../GameEvent/GameEvent.js";
import World from "../World/World.js";
import Purifier from "../Purifier/Purifier.js";

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
		} else if (Conveyor.Has(building.type)) {
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
			item.oreImage.destroy();
			return false;
		}
		item.oreImage.setPosition(tweenInformation.start.x, tweenInformation.start.y);
		this.#scene.tweens.add({
			onCompleteParams: [item, cellData.building],
			targets: item.oreImage,
			x: tweenInformation.end.x,
			y: tweenInformation.end.y,
			duration: tweenInformation.duration,
			onComplete: (tween, targets, item, building) => {
				this.#activeItems.delete(item);
				const nextPosition = cellData.building.position.add(tweenInformation.endingDirectionVector);
				const nextWorldItem = this.#scene.getPosition(nextPosition);
				if (!Conveyor.Has(nextWorldItem.building?.type)) {
					if (DistributionCenter.Has(nextWorldItem.building?.type)) {
						const { type, purity } = item;
						const amount = DistributionCenter.Pricing(type) * purity;
						GameEvent.Emit(GameEvent.STAT_CASH, amount);
					} else if (Purifier.Has(nextWorldItem.building?.type)) {

					}
					item.oreImage.destroy();
				} else {
					this.#inMotionItems.set(item, { building: nextWorldItem.building, directionVector: nextWorldItem.building.startingDirectionVector });
				}
			}
		});
		return true;
	}

	#getTweenInformation(item, building) {
		if (Extractor.Has(building.type)) {
			const duration = 500;
			const movement = World.UNIT_HALF_SIZE;
			const startingDirectionVector = building.directionVector.round();
			const start = Utilities.GridToPosition(building.position);
			const end = {x: start.x + World.UNIT_HALF_SIZE * startingDirectionVector.x, y: start.y + World.UNIT_HALF_SIZE * startingDirectionVector.y };
			return { item, building, start, end, duration, movement, endingDirectionVector: startingDirectionVector };
		} else if (Conveyor.Has(building.type)) {
			const duration = 1000;
			const movement = World.UNIT_SIZE;
			if (building.type === Conveyor.STRAIGHT) {
				const startingDirectionVector = building.startingDirectionVector[0].round();
				if (!item.directionVector.equals(startingDirectionVector)) {
					return false;
				}
				const start = Utilities.GridToPosition(building.position);
				const oppositeDirectionVector = startingDirectionVector.opposite();
				start.x += oppositeDirectionVector.x * World.UNIT_HALF_SIZE;
				start.y += oppositeDirectionVector.y * World.UNIT_HALF_SIZE;
				const end = { x: start.x + World.UNIT_SIZE * startingDirectionVector.x, y: start.y + World.UNIT_SIZE * startingDirectionVector.y };
				return { item, building, start, end, duration, movement, endingDirectionVector: startingDirectionVector };
			}
			if (building.type === Conveyor.CURVE_LEFT || building.type === Conveyor.CURVE_RIGHT) {
				const startingDirectionVector = building.startingDirectionVector[0].round();
				const endingDirectionVector = building.endingDirectionVector[0].round();
				if (!item.directionVector.equals(startingDirectionVector)) {
					return false;
				}
				const start = Utilities.GridToPosition(building.position);
				const oppositeDirectionVector = startingDirectionVector.opposite();
				start.x += oppositeDirectionVector.x * World.UNIT_HALF_SIZE;
				start.y += oppositeDirectionVector.y * World.UNIT_HALF_SIZE;
				const end = Utilities.GridToPosition(building.position);
				end.x += endingDirectionVector.x * World.UNIT_HALF_SIZE;
				end.y += endingDirectionVector.y * World.UNIT_HALF_SIZE;
				item.setDirectionVector(endingDirectionVector);
				return { item, building, start, end, duration, movement, endingDirectionVector };
			}
			if (building.type === Conveyor.T_INTERSECTION_RIGHT || building.type === Conveyor.T_INTERSECTION_LEFT) {
				let startingDirectionVector;
				if (item.directionVector.equals(building.startingDirectionVector[0].round())) {
					startingDirectionVector = building.startingDirectionVector[0].round();
				} else if (item.directionVector.equals(building.startingDirectionVector[1].round())) {
					startingDirectionVector = building.startingDirectionVector[1].round();
				} else {
					return false;
				}
				const endingDirectionVector = building.endingDirectionVector[0].round();
				const start = Utilities.GridToPosition(building.position);
				const oppositeDirectionVector = startingDirectionVector.opposite();
				start.x += oppositeDirectionVector.x * World.UNIT_HALF_SIZE;
				start.y += oppositeDirectionVector.y * World.UNIT_HALF_SIZE;
				const end = Utilities.GridToPosition(building.position);
				end.x += endingDirectionVector.x * World.UNIT_HALF_SIZE;
				end.y += endingDirectionVector.y * World.UNIT_HALF_SIZE;
				item.setDirectionVector(endingDirectionVector);
				return { item, building, start, end, duration, movement, endingDirectionVector };
			}
			if (building.type === Conveyor.X_INTERSECTION) {
				let startingDirectionVector;
				let endingDirectionVector;
				if (item.directionVector.equals(building.startingDirectionVector[0].round())) {
					startingDirectionVector = building.startingDirectionVector[0].round();
					endingDirectionVector = building.endingDirectionVector[0].round();
				} else if (item.directionVector.equals(building.startingDirectionVector[1].round())) {
					startingDirectionVector = building.startingDirectionVector[1].round();
					endingDirectionVector = building.endingDirectionVector[1].round();
				} else {
					return false;
				}
				const start = Utilities.GridToPosition(building.position);
				const oppositeDirectionVector = startingDirectionVector.opposite();
				start.x += oppositeDirectionVector.x * World.UNIT_HALF_SIZE;
				start.y += oppositeDirectionVector.y * World.UNIT_HALF_SIZE;
				const end = Utilities.GridToPosition(building.position);
				end.x += endingDirectionVector.x * World.UNIT_HALF_SIZE;
				end.y += endingDirectionVector.y * World.UNIT_HALF_SIZE;
				item.setDirectionVector(endingDirectionVector);
				return { item, building, start, end, duration, movement, endingDirectionVector };
			}
		} else {
			return false;
		}
	}
}