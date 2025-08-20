import Vector from "../Base/Vector.js";

export default class Vector2d extends Vector {
	#x;
	#y;

	static MISSING_ARGUMENT_ERROR = 'Argument must be an instance of Vector2d';

	static Zero() {
		return new Vector2d(0, 0);
	}

	static Right() {
		return new Vector2d(1, 0);
	}

	static Left() {
		return new Vector2d(-1, 0);
	}

	static Up() {
		return new Vector2d(0, 1);
	}

	static Down() {
		return new Vector2d(0, -1);
	}

	constructor(x, y) {
		super({ x, y });
		if (arguments.length !== 2) {
			throw new Error('Vector2d constructor requires two arguments: x and y');
		}
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error('Both Vector2d arguments must be numeric');
		}
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	add(vector) {
		if (!(vector instanceof Vector2d)) {
			throw new Error(Vector2d.MISSING_ARGUMENT_ERROR);
		}
		const x = this.#x + vector.x;
		const y = this.#y + vector.y;
		return new Vector2d(x, y);
	}

	subtract(vector) {
		if (!(vector instanceof Vector2d)) {
			throw new Error(Vector2d.MISSING_ARGUMENT_ERROR);
		}
		const x = this.#x - vector.x;
		const y = this.#y - vector.y;
		return new Vector2d(x, y);
	}

	equals(vector) {
		if (!(vector instanceof Vector2d)) {
			throw new Error(Vector2d.MISSING_ARGUMENT_ERROR);
		}
		return this.#x === vector.x && this.#y === vector.y;
	}

	clone() {
		return new Vector2d(this.#x, this.#y);
	}

	toString() {
		return `(${this.#x},${this.#y})`;
	}
}