import Game from "../Game/Game.js";
import DistributionCenter from "./DistributionCenter.js";

export default class DistributionCenterUI extends DistributionCenter{

	static Preload = (scene) => {
		scene.load.image('distribution-center', 'img/distribution-center.png');
	}

	#scene;
	#centerX;
	#centerY;

	constructor(scene) {
		super();
		this.#scene = scene;
		this.#centerX = Game.UNIT_SIZE * Game.WORLD_UNITS / 2 - Game.UNIT_SIZE;
		this.#centerY = Game.UNIT_SIZE * Game.WORLD_UNITS / 2 - Game.UNIT_SIZE;

	}

	create() {
		this.#scene.add.image(this.#centerX, this.#centerY, 'distribution-center');
	}
}