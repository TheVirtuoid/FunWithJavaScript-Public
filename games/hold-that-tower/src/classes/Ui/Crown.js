import Prize from "./Prize.js";

export default class Crown extends Prize {
	static NAME = 'crown';
	static IMAGE_URL = './images/crown.png';
	static DEFAULT_SCALE = 0.075;

	constructor(args = {}) {
		args.scale = Crown.DEFAULT_SCALE;
		super(args);
	}

	static preload(scene) {
		scene.load.image(Crown.NAME, Crown.IMAGE_URL);
	}

	create() {
		super.create(Crown.NAME);
	}
}