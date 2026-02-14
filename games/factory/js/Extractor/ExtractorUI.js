import Mineral from "../Mineral/Mineral.js";
import Extractor from "./Extractor.js";

export default class ExtractorUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createExtractor(type) {
		const extractor = new Extractor({ type });
		extractor.setImage(`extractor-${type.description}`);
		return extractor;
	}

	preload() {
		Mineral.TYPES.forEach(mineral => {
			const extractor = `extractor-${mineral.description}`;
			this.#scene.load.image(extractor, `img/${extractor}.png`);
		})
	}


}