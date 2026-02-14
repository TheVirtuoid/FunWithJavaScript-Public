import Game from "../Game/Game.js";

export default class TransporterUI {

	#inactiveItems;
	#activeItems;
	#scene;

	constructor(scene) {
		this.#activeItems = new Map();
		this.#inactiveItems = new Map();
		this.#scene = scene;
	}

	add(item, building) {
		this.#inactiveItems.set(item, building);
	}

	remove(item) {
		this.#activeItems.remove(item);
		this.#inactiveItems.remove(item);
	}

	activateItems() {
		this.#inactiveItems.forEach((building, item) => {
			this.#scene.tweens.add({
				onCompleteParams: [item, building],
				targets: item.oreImage,
				y: item.oreImage.y + Game.HALF_SIZE,
				duration: 500,
				onComplete: (tween, targets, item) => {
					item.oreImage.destroy();
					this.#activeItems.delete(item);
				}
			});
			this.#activeItems.set(item, building);
			this.#inactiveItems.delete(item);
		});
	}

}