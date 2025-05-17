import Track from "../Track/Track.js";

export default class V3 {
	static DIRECTION_POSITIVE = Symbol('direction-positive');		// clockwise
	static DIRECTION_NEGATIVE = Symbol('direction-negative');		// counter-clockwise

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
		if (direction !== V3.DIRECTION_NEGATIVE && direction !== V3.DIRECTION_POSITIVE) {
			throw new Error('V3.perpendicular: Argument must be V3.DIRECTION_NEGATIVE or V3.DIRECTION_POSITIVE');
		}
		if (direction === V3.DIRECTION_POSITIVE) {
			return new V3(-this.z, this.y, this.x);
		} else {
			return new V3(this.z, this.y, -this.x);
		}
	}

	getDirectionVectorFromDegrees(degrees, direction) {
		if (isNaN(degrees)) {
			throw new Error('V3.getDirectionVectorFromDegrees: curve must be a number');
		}
		if (direction !== V3.DIRECTION_POSITIVE && direction !== V3.DIRECTION_NEGATIVE) {
			throw new Error('V3.getDirectionVectorFromDegrees: direction must be V3.DIRECTION_POSITIVE or V3.DIRECTION_NEGATIVE');
		}
		// perform the rotation
		const radians = (degrees * Math.PI) / 180;
		let x;
		let z;
		if (direction === V3.DIRECTION_NEGATIVE) {
			x = this.x * Math.cos(radians) + this.z * Math.sin(radians);
			z = -this.x * Math.sin(radians) + this.z * Math.cos(radians);
		} else {
			x = this.x * Math.cos(radians) - this.z * Math.sin(radians);
			z = this.x * Math.sin(radians) + this.z * Math.cos(radians);
		}
		return new V3(x, this.y, z);
	}
	// TODO: We may not need this function.
	#tolerate(value, tolerance) {
		// Check if the value is close to a whole number
		const nearestInteger = Math.round(value);
		if (Math.abs(value - nearestInteger) < tolerance) {
			return nearestInteger;
		}
		return value;
	}
}