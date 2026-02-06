import Alloy from "./Alloy.js";

export default class AlloyUI {

	static Preload = (scene) => {
		Alloy.TYPES.forEach(alloy => {
			const ingot = `ingot-${alloy.description}`;
			scene.load.image(ingot, `img/${ingot}.png`);
		});
	}

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createAlloy(type) {
		const alloy = new Alloy({ type });
		alloy.setImage(`ingot-${type.description}`);
		return alloy;
	}
}