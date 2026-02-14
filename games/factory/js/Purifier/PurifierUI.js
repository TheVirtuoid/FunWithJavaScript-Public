import Mineral from "../Mineral/Mineral.js";
import Purifier from "./Purifier.js";

export default class PurifierUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createPurifier(type) {
		const purifier = new Purifier({ type });
		purifier.setImage(`purifier-${type.description}`);
		return purifier;
	}

	preload() {
		Mineral.TYPES.forEach(mineral => {
			const purifier = `purifier-${mineral.description}`;
			this.#scene.load.image(purifier, `img/${purifier}.png`);
		})
	}
}