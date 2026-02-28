import Vector2d from "../Vector/Vector2d/Vector2d.js";

export default class Base {
	#id;
	#type;
	#position;
	#level;
	#orientation;
	#directionVector;
	#active;
	#purity;
	#image;

	constructor(args = {}) {
		const { image, purity, type, position = new Vector2d(0, 0), orientation = 0, directionVector = Vector2d.Down() } = args;
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#level = 1;
		this.#active = true;
		this.#purity = this.setPurity(purity || 0);
		this.#image = this.setImage(image);
		this.setPosition(position);
		this.setOrientation(orientation);
		this.setDirectionVector(directionVector);
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
	get directionVector() {
		return this.#directionVector.clone();
	}
	get active() {
		return this.#active;
	}
	get purity() {
		return this.#purity;
	}
	get image() {
		return this.#image;
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

	setInactive() {
		this.#active = false;
	}

	setActive() {
		this.#active = true;
	}

	setPurity(purity) {
		if (!Number.isInteger(purity)) {
			throw new Error('Purity must be an integer');
		}
		purity = Math.max(0, Math.min(purity, 100));
		this.#purity = purity;
	}

	setOrientation(orientation) {
		if (![0, 90, 180, 270].includes(orientation)) {
			throw new Error(`Invalid orientation: ${orientation}`);
		}
		this.#orientation = orientation;
	}

	setDirectionVector(directionVector) {
		if (!(directionVector instanceof Vector2d)) {
			throw new Error('Direction vector must be a Vector2d');
		}
		this.#directionVector = directionVector;
	}

	setImage(image) {
		this.#image = image;
	}
}