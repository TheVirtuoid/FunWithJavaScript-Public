export default class Tower {
	static DEFAULT_RADIUS = 75;
	static NAME = 'tower';
	static IMAGE_URL = './images/tower.png';
	static DEFAULT_SCALE = .15;

	#position;
	#radius;
	#scene;
	#image;

	constructor(args = {}) {
		const { position, radius, scene } = args;
		this.#position = position;
		this.#radius = radius || Tower.DEFAULT_RADIUS;
		this.#scene = scene;
	}

	get position() {
		return this.#position;
	}

	get radius() {
		return this.#radius;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	static preload(scene) {
		scene.load.image(Tower.NAME, Tower.IMAGE_URL);
	}

	create() {
		this.#image = this.#scene.add.image(this.position.x, this.position.y, Tower.NAME).setScale(Tower.DEFAULT_SCALE);
	}
}