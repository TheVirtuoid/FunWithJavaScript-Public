import Alloy from "./Alloy.js";
import Mineral from "../Mineral/Mineral.js";
import Utilities from "../Utilities/Utilities.js";

export default class AlloyUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createAlloy(type, purity, position) {
		const alloy = new Alloy({ type, purity });
		const worldPosition = Utilities.GridToPosition(position);
		alloy.setActiveImage(this.#scene.add.image(worldPosition.x, worldPosition.y, `ingot-${type.description}`));
		alloy.activeImage.setDepth(10000);
		return alloy;
	}

	preload() {
		Alloy.TYPES.forEach(alloy => {
			const ingot = `ingot-${alloy.description}`;
			this.#scene.load.image(ingot, `img/${ingot}.png`);
		});
	}
}