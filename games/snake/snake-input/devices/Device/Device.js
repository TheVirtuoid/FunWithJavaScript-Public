import Vector from "../../../snake-base/Vector/Base/Vector.js";

export default class Device {
	#id;
	#vectorReference;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), vectorReference } = args;
		const isVector = vectorReference?.prototype instanceof Vector;
		if (!isVector) {
			throw new Error(`'vectorReference' argument is required and must be a Vector class`);
		}
		this.#id = id;
		this.#vectorReference = vectorReference;
	}

	get id() {
		return this.#id;
	}

	get vectorReference() {
		return this.#vectorReference;
	}

	dispose() {
		throw new Error('You must implement the method dispose.');
	}
}