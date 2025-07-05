import Position from "../Position.js";

export default class Gun {
	static NAME = 'gun';
	static IMAGE_URL = '/src/images/gun.png';
	static DEFAULT_SCALE = 0.1;

	#scene;
	#scale;
	#image;
	#position;
	#rotation;
	#visible;

	constructor(args = {}) {
		const { scene, scale, position = new Position(0, 0), rotation = 0, visible = true } = args;
		this.#scene = scene;
		this.#scale = scale || Gun.DEFAULT_SCALE;
		this.#position = position;
		this.#rotation = rotation;
		this.#visible = visible;
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
	}

	get rotation() {
		return this.#rotation;
	}

	get position() {
		return this.#position;
	}

	get image() {
		return this.#image;
	}

	get visible() {
		return this.#visible;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	static preload(scene) {
		scene.load.image(Gun.NAME, Gun.IMAGE_URL);
	}

	create(args = {}) {
		const { position = this.position } = args;
		this.#position = position;
		this.#image = this.#scene.add.image(this.position.x, this.position.y, Gun.NAME).setScale(this.scale);
		this.#image.rotation = this.rotation;
	}

	setPosition(position) {
		this.#position = position;
		if (this.#image) {
			this.#image.setPosition(this.position.x, this.position.y);
		}
	}

	setRotation(rotation) {
		this.#rotation = rotation;
		if (this.#image) {
			this.#image.setRotation(rotation);
		}
	}

	setVisible(visible) {
		this.#visible = visible;
		if (this.#image) {
			this.#image.setVisible(this.visible);
		}
	}
}