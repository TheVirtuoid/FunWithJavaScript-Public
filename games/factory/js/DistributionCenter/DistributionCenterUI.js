import Game from "../Game/Game.js";
import DistributionCenter from "./DistributionCenter.js";
import Utilities from "../Utilities/Utilities.js";

export default class DistributionCenterUI {

	#scene;
	#distributionCenter;

	constructor(scene) {
		this.#scene = scene;
	}

	createDistributionCenter(position) {
		this.#distributionCenter = new DistributionCenter();
		let { x, y } = Utilities.GridToPosition(this.#distributionCenter.position);
		x -= Game.HALF_SIZE;
		y -= Game.HALF_SIZE;
		this.#distributionCenter.setImage(this.#scene.add.image(x, y, 'distribution-center'));
	}

	preload() {
		this.#scene.load.image('distribution-center', 'img/distribution-center.png');
	}


}