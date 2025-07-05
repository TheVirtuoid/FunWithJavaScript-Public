export default class Ground {
	static IMAGE_URL = './images/vecteezy_brown-pixel-pattern-or-background_33048268.jpg';
	static NAME = 'ground';

	#scene;
	#image;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
	}

	static preload(scene) {
		scene.load.image(
			Ground.NAME,
			Ground.IMAGE_URL
		);
	}

	create() {
		this.#image = this.#scene.add.tileSprite(
			this.#scene.cameras.main.width / 2,
			this.#scene.cameras.main.height / 2,
			this.#scene.cameras.main.width,
			this.#scene.cameras.main.height,
			Ground.NAME
		);
		this.#image.setAlpha(.5, .5, .5, .5);
		this.#image.tileScaleX = .05;
		this.#image.tileScaleY = .05;
	}

	get image() {
		return this.#image;
	}

}