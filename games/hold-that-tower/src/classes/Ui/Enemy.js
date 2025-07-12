import Position from "../Position.js";

export default class Enemy {
	static NAME = 'enemy';
	static IMAGE_URL = '/src/images/snowman.png';
	static DEFAULT_SCALE = .1;

	#scene;
	#image;
	#position;
	#visible;
	#scale;
	#name = Enemy.NAME;

	constructor(args = {}) {
		const { scene, name } = args;
		this.#scene = scene;
		this.#name = name;
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

	get name() {
		return this.#name;
	}

	static preload(scene) {
		scene.load.image(Enemy.NAME, Enemy.IMAGE_URL);
	}

	create(args = {}) {
		const { position = new Position(0, 0), scale = Enemy.DEFAULT_SCALE, visible = true } = args;
		this.#position = position;
		this.#visible = visible;
		this.#scale = scale;
		// this.#image = this.#scene.add.image(this.position.x, this.position.y, Enemy.NAME).setScale(this.scale);
		this.#image = this.#scene.physics.add.image(this.position.x, this.position.y, this.#name).setScale(this.scale);
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