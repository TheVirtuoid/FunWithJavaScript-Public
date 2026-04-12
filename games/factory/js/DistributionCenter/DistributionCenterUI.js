import Utilities from "../Utilities/Utilities.js";
import World from "../World/World.js";

export default class DistributionCenterUI {

	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	create(distributionCenter) {
		let { x, y } = Utilities.GridToPosition(distributionCenter.position);
		x += World.UNIT_HALF_SIZE;
		y += World.UNIT_HALF_SIZE;
		this.#scene.add.image(x, y, 'distribution-center');
	}

	preload() {
		this.#scene.load.image('distribution-center', 'img/distribution-center.png');
	}

}