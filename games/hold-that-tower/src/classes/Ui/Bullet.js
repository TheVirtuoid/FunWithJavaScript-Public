export default class Bullet {
	static NAME = 'bullet';
	static IMAGE_URL = '/src/images/bullet.png';
	static DEFAULT_SCALE = .25;

	#scene;
	#scale;
	#image;

	constructor(args = {}) {
		const { scene, scale } = args;
		this.#scene = scene;
		this.#scale = scale || Bullet.DEFAULT_SCALE;
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
	}

	get image() {
		return this.#image;
	}

	static preload(scene) {
		scene.load.image(Bullet.NAME, Bullet.IMAGE_URL);
	}

	create() {
		this.#image = this.#scene.physics.add.image(0, 0, Bullet.NAME).setScale(this.scale);
	}
}