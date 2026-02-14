import Alloy from "./Alloy.js";

export default class AlloyUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createAlloy(type) {
		const alloy = new Alloy({ type });
		alloy.setImage(`ingot-${type.description}`);
		return alloy;
	}

	preload() {
		Alloy.TYPES.forEach(alloy => {
			const ingot = `ingot-${alloy.description}`;
			this.#scene.load.image(ingot, `img/${ingot}.png`);
		});
	}
}