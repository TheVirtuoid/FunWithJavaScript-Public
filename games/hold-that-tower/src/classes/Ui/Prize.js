import Position from "../Position.js";

export default class Prize {

	#scene;
	#scale;
	#amount;
	#position;
	#visible;
	#image;

	constructor(args = {}) {
		const { scene, scale, amount, position = new Position(0, 0), visible = true } = args;
		this.#scene = scene;
		this.#scale = scale;
		this.#amount = amount;
		this.#position = position;
		this.#visible = visible;
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
	}

	get amount() {
		return this.#amount;
	}

	get position() {
		return this.#position;
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

	get image() {
		return this.#image;
	}

	create(name) {
		this.#image = this.#scene.add.image(this.x, this.y, name).setScale(this.scale);
		this.setVisible(this.visible);
	}

	setVisible(visible) {
		this.#visible = visible;
		if (this.image) {
			this.image.setVisible(this.visible);
		}
	}

	setPosition(position) {
		this.#position = position;
		if (this.image) {
			this.image.setPosition(this.x, this.y);
		}
	}

	setAmount(amount) {
		this.#amount = amount;
	}


}