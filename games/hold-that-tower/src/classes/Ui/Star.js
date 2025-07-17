import Prize from "./Prize.js";

export default class Star extends Prize {
	static NAME = 'star';
	static IMAGE_URL = '/src/images/star.png';
	static DEFAULT_SCALE = 0.075;

	constructor(args = {}) {
		const { scale } = args;
		args.scale = scale || Star.DEFAULT_SCALE;
		super(args);
	}

	static preload(scene) {
		scene.load.image(Star.NAME, Star.IMAGE_URL);
	}

	create() {
		super.create(Star.NAME);
	}
}