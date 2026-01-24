import Mineral from "../Mineral/Mineral.js";

export default class ExtractorUI {

	static Preload = (scene) => {
		Mineral.TYPES.forEach(mineral => {
			const extractor = `extractor-${mineral.description}`;
			scene.load.image(extractor, `img/${extractor}.png`);
		})
	}

	constructor(extractor) {
	}
}