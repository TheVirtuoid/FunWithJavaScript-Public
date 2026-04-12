import Mineral from "../Mineral/Mineral.js";

export default class PurifierUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	preload() {
		Mineral.TYPES.forEach(mineral => {
			const purifier = `purifier-${mineral.description}`;
			this.#scene.load.image(purifier, `img/${purifier}.png`);
		})
	}
}