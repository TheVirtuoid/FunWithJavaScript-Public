import Mineral from "../Mineral/Mineral.js";

export default class PurifierUI {

	static Preload = (scene) => {
		Mineral.TYPES.forEach(mineral => {
			const purifier = `purifier-${mineral.description}`;
			scene.load.image(purifier, `img/${purifier}.png`);
		})
	}

	constructor(purifier) {
	}
}