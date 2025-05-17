import Track from "../Track/Track.js";

export default class V3 {
	static PERPENDICULAR_NEGATIVE = Symbol('perpendicular-negative');
	static PERPENDICULAR_POSITIVE = Symbol('perpendicular-positive');

	#x;
	#y;
	#z;

	constructor(x, y, z) {
		if (isNaN(x) || isNaN(y) || isNaN(z)) {
			throw new Error('V3 constructor: x, y, and z must be numbers');
		}
		this.#x = x;
		this.#y = y;
		this.#z = z;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get z() {
		return this.#z;
	}

	normalize() {
		const magnitude = Math.sqrt(this.#x ** 2 + this.#y ** 2 + this.#z ** 2);
		if (magnitude === 0) {
			throw new Error('Cannot normalize a zero vector');
		}
		return new V3(this.#x / magnitude, this.#y / magnitude, this.#z / magnitude);
	}

	scale(length) {
		if (length < 0) {
			throw new Error('Length must be a positive number');
		}
		const normalizedVector = this.normalize();
		return new V3(normalizedVector.x * length, normalizedVector.y * length, normalizedVector.z * length);
	}

	setDirectedPosition(startingPosition, length) {
		const scaledVector = this.scale(length);
		return new V3(
			startingPosition.x + scaledVector.x,
			startingPosition.y + scaledVector.y,
			startingPosition.z + scaledVector.z
		);
	}

	compareTo(vector3) {
		return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z;
	}

	coordinates() {
		return [this.x, this.y, this.z];
	}

	clone() {
		return new V3(this.#x, this.#y, this.#z);
	}

	perpendicular(direction) {
		if (this.x === 0 && this.y === 0 && this.z === 0) {
			throw new Error('V3.perpendicular: Cannot find a perpendicular vector for the zero vector');
		}
		if (direction !== V3.PERPENDICULAR_NEGATIVE && direction !== V3.PERPENDICULAR_POSITIVE) {
			throw new Error('V3.perpendicular: Argument must be V3.PERPENDICULAR_NEGATIVE or V3.PERPENDICULAR_POSITIVE');
		}
		if (direction === V3.PERPENDICULAR_POSITIVE) {
			return new V3(this.z, this.y, this.x * -1);
		} else {
			return new V3(this.z * -1, this.y, this.x);
		}
	}
}