import Vector2d from "../Vector/Vector2d/Vector2d.js";

export default class Base {
	#id;
	#type;
	#position;
	#level;
	#orientation;

	constructor(args = {}) {
		const { type, position = new Vector2d(0, 0), orientation = 0 } = args;
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#level = 1;
		this.setPosition(position);
		this.setOrientation(orientation);
	}

	get id() {
		return this.#id;
	}
	get type() {
		return this.#type;
	}
	get position() {
		return this.#position;
	}
	get level() {
		return this.#level;
	}
	get orientation() {
		return this.#orientation;
	}

	setPosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		this.#position = position;
	}

	incrementLevel() {
		this.#level++;
	}

	setOrientation(orientation) {
		if (![0, 90, 180, 270].includes(orientation)) {
			throw new Error(`Invalid orientation: ${orientation}`);
		}
		this.#orientation = orientation;
	}
}