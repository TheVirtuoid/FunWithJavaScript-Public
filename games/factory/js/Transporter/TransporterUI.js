import Game from "../Game/Game.js";
import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";

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
		this.#inactiveItems.forEach((oreData, item) => {
			this.#moveItem(item, oreData);
			/*this.#scene.tweens.add({
				onCompleteParams: [item, building],
				targets: item.oreImage,
				y: item.oreImage.y + Game.HALF_SIZE,
				duration: 500,
				onComplete: (tween, targets, item) => {
					item.oreImage.destroy();
					this.#activeItems.delete(item);
				}
			});*/
			this.#activeItems.set(item, oreData);
			this.#inactiveItems.delete(item);
		});
	}

	#moveItem(item, oreData) {
		const duration = Extractor.Has(oreData.building.type) ? 500 : 1000;
		const movement = Extractor.Has(oreData.building.type) ? Game.HALF_SIZE : Game.UNIT_SIZE;
		const directionVector = oreData.directionVector[0];
		this.#scene.tweens.add({
			onCompleteParams: [item, oreData.building],
			targets: item.oreImage,
			x: item.oreImage.x + (movement * directionVector.x),
			y: item.oreImage.y + (movement * directionVector.y),
			duration,
			onComplete: (tween, targets, item, building) => {
				this.#activeItems.delete(item);
				const nextPosition = oreData.building.position.add(oreData.directionVector[0]);
				const nextWorldItem = this.#scene.getPosition(nextPosition);
				if (!Conveyor.Has(nextWorldItem.building?.type)) {
					item.oreImage.destroy();
				} else {
					this.#inactiveItems.set(item, { building: nextWorldItem.building, directionVector: nextWorldItem.building.startDirectionVector });
				}
			}
		});
	}

}