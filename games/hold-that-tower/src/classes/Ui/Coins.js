import Prize from "./Prize.js";

export default class Coins extends Prize {
	static NAME = 'coin';
	static IMAGE_URL = '/src/images/coin.png';
	static DEFAULT_SCALE = 0.075;

	constructor(args = {}) {
		const { scale } = args;
		args.scale = scale || Coins.DEFAULT_SCALE;
		super(args);
	}

	static preload(scene) {
		scene.load.image(Coins.NAME, Coins.IMAGE_URL);
	}

	create() {
		super.create(Coins.NAME);
	}
}