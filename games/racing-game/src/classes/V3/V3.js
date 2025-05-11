export default class V3 {
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

	getNewPosition(startingPosition, length) {
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
}