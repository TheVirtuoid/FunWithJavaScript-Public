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
		return new Vector2d(0, -1);
	}

	static Down() {
		return new Vector2d(0, 1);
	}

	static Fill(number) {
		return new Vector2d(number, number);
	}

	static Random(dimensions) {
		if (!(dimensions instanceof Vector2d)) {
			throw new Error('Argument must be an instance of Vector2d');
		}
		return new Vector2d(
			Math.floor(Math.random() * dimensions.x),
			Math.floor(Math.random() * dimensions.y)
		);
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

	multiply(vector) {
		if (!(vector instanceof Vector2d)) {
			throw new Error(Vector2d.MISSING_ARGUMENT_ERROR);
		}
		const x = this.#x * vector.x;
		const y = this.#y * vector.y;
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

	compareTo(vector) {
		const x = this.#x < vector.x ? -1 : (this.#x > vector.x ? 1 : 0);
		const y = this.#y < vector.y ? -1 : (this.#y > vector.y ? 1 : 0);
		return new Vector2d(x, y);
	}

	// For isPerimeter, inBounds, and isInside, we assume a rectangular area defined by this vector's coordinates.
	inBounds(vector) {
		const x = vector.x >= 0 && vector.x < this.#x;
		const y = vector.y >= 0 && vector.y < this.#y;
		return x && y;
	}

	isInside(vector) {
		const x = vector.x >= 1 && vector.x < this.#x - 1;
		const y = vector.y >= 1 && vector.y < this.#y - 1;
		return x && y;
	}

	isPerimeter(vector) {
		const x = vector.x === 0 || vector.x === this.#x - 1;
		const y = vector.y === 0 || vector.y === this.#y - 1;
		return x || y;
	}

	fill(number) {
		return new Vector2d(number, number);
	}

	clone() {
		return new Vector2d(this.#x, this.#y);
	}

	toString() {
		return `(${this.#x},${this.#y})`;
	}

	opposite() {
		return new Vector2d(this.#x * -1, this.#y * -1);
	}

	random(dimensions) {
		return Vector2d.Random(dimensions)
	}

	rotate(degrees) {
		const rad = (degrees * Math.PI) / 180;
		const cos = Math.cos(rad);
		const sin = Math.sin(rad);
		return new Vector2d(this.#x * cos - this.#y * sin, this.#x * sin + this.#y * cos);
	}

	round() {
		return new Vector2d(Math.round(this.#x), Math.round(this.#y));
	}
}