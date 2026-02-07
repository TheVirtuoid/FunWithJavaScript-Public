import Mineral from "../Mineral/Mineral.js";
import Purifier from "./Purifier.js";

export default class PurifierUI {

	static Preload = (scene) => {
		Mineral.TYPES.forEach(mineral => {
			const purifier = `purifier-${mineral.description}`;
			scene.load.image(purifier, `img/${purifier}.png`);
		})
	}

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createPurifier(type) {
		const purifier = new Purifier({ type });
		purifier.setImage(`purifier-${type.description}`);
		return purifier;
	}
}