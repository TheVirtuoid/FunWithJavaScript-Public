import Game from "../Game/Game.js";
import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Utilities from "../Utilities/Utilities.js";

export default class TransporterUI {

	#inactiveItems;
	#activeItems;
	#inMotionItems;
	#scene;

	constructor(scene) {
		this.#activeItems = new Map();
		this.#inactiveItems = new Map();
		this.#inMotionItems = new Map();
		this.#scene = scene;
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
		/*this.#inactiveItems.forEach((oreData, item) => {
			if (this.#moveItem(item, oreData)) {
				this.#activeItems.set(item, oreData);
			}
			this.#inactiveItems.delete(item);
		});*/
	}

	keepItemsInMotion() {
		this.#motionTheItems(this.#inMotionItems);
		/*this.#inMotionItems.forEach((oreData, item) => {
			if (this.#moveItem(item, oreData)) {
				this.#activeItems.set(item, oreData);
			}
			this.#inMotionItems.delete(item);
		});*/
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
		const duration = Extractor.Has(cellData.building.type) ? 500 : 1000;
		const movement = Extractor.Has(cellData.building.type) ? Game.HALF_SIZE : Game.UNIT_SIZE;
		const tweenInformation = this.#getTweenInformation(item, cellData.building);
		const directionVector = cellData.directionVector[0].round();
		if (!tweenInformation) {
			item.oreImage.destroy();
			return false;
		}
		/*if (!item.directionVector.equals(directionVector)) {
			item.oreImage.destroy();
			return false;
		} else {*/
			item.oreImage.setPosition(tweenInformation.start.x, tweenInformation.start.y);
			this.#scene.tweens.add({
				onCompleteParams: [item, cellData.building],
				targets: item.oreImage,
				x: tweenInformation.end.x,
				y: tweenInformation.end.y,
				duration: tweenInformation.duration,
				onComplete: (tween, targets, item, building) => {
					this.#activeItems.delete(item);
					const nextPosition = cellData.building.position.add(cellData.directionVector[0]);
					const nextWorldItem = this.#scene.getPosition(nextPosition);
					if (!Conveyor.Has(nextWorldItem.building?.type)) {
						item.oreImage.destroy();
					} else {
						this.#inMotionItems.set(item, { building: nextWorldItem.building, directionVector: nextWorldItem.building.startDirectionVector });
					}
				}
			});
			return true;
		/* } */
	}

	#getTweenInformation(item, building) {
		if (Extractor.Has(building.type)) {
			const duration = 500;
			const movement = Game.HALF_SIZE;
			const startDirectionVector = building.directionVector.round();
			const start = Utilities.GridToPosition(building.position);
			const end = { x: start.x + Game.HALF_SIZE * startDirectionVector.x, y: start.y + Game.HALF_SIZE * startDirectionVector.y };
			return { item, building, start, end, duration, movement };
		} else if (Conveyor.Has(building.type)) {
			const duration = 1000;
			const movement = Game.UNIT_SIZE;
			if (building.type === Conveyor.STRAIGHT) {
				const startDirectionVector = building.startDirectionVector[0].round();
				if (!item.directionVector.equals(startDirectionVector)) {
					return false;
				}
				const start = Utilities.GridToPosition(building.position);
				const oppositeDirectionVector = startDirectionVector.opposite();
				start.x += oppositeDirectionVector.x * Game.HALF_SIZE;
				start.y += oppositeDirectionVector.y * Game.HALF_SIZE;
				const end = { x: start.x + Game.UNIT_SIZE * startDirectionVector.x, y: start.y + Game.UNIT_SIZE * startDirectionVector.y };
				return { item, building, start, end, duration, movement };
			}
		} else {
			return false;
		}
	}

}