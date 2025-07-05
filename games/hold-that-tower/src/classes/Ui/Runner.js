import Position from "../Position.js";

export default class Runner {
	static NAME = 'runner';
	static IMAGE_URL = './images/dancing.png';
	static DEFAULT_SCALE = .1;

	#scene;
	#image;
	#position;
	#visible;
	#scale;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
	}

	get position() {
		return this.#position;
	}

	get visible() {
		return this.#visible;
	}

	get image() {
		return this.#image;
	}

	static preload(scene) {
		scene.load.image(Runner.NAME, Runner.IMAGE_URL);
	}

	create(args = {}) {
		const { position = new Position(0, 0), scale = Runner.DEFAULT_SCALE, visible = true } = args;
		this.#position = position;
		this.#visible = visible;
		this.#scale = scale;
		this.#image = this.#scene.add.image(this.position.x, this.position.y, Runner.NAME).setScale(this.scale);
		this.#image.setVisible(this.visible);
	}

	setPosition(position) {
		this.#position = position;
		if (this.#image) {
			this.#image.setPosition(this.position.x, this.position.y);
		}
	}

	setVisible(visible) {
		this.#visible = visible;
		if (this.#image) {
			this.#image.setVisible(this.visible);
		}
	}
}