import Vector from "../Vector/Base/Vector.js";

export default class Segment {
	#position;
	#direction;
	#id;

	constructor(args = {}) {
		const { position, direction, id = window.crypto.randomUUID() } = args;
		if (!(position instanceof Vector)) {
			throw new Error(`'position' property must be an instance of Vector`);
		}
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' property must be an instance of Vector`);
		}
		this.#position = position.clone();
		this.#direction = direction.clone();
		this.#id = id;
	}

	get position() {
		return this.#position.clone();
	}

	get direction() {
		return this.#direction.clone();
	}

	get id() {
		return this.#id;
	}

	move(speed = 1) {
		this.#position = this.getProjectedPosition(speed);
	}

	changeDirection(newDirection) {
		if (!(newDirection instanceof Vector)) {
			throw new Error(`'newDirection' argument must be an instance of Vector`);
		}
		this.#direction = newDirection;
	}

	getProjectedPosition(speed = 1) {
		const adder = this.#direction.multiply(this.#direction.fill(speed));
		return this.#position.add(adder);
	}
}