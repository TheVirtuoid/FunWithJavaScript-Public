import Mineral from "../Mineral/Mineral.js";

export default class ExtractorUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	preload() {
		Mineral.TYPES.forEach(mineral => {
			const extractor = `extractor-${mineral.description}`;
			this.#scene.load.image(extractor, `img/${extractor}.png`);
		})
	}


}