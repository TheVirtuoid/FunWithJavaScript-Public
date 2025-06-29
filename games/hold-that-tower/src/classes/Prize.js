import PrizeType from "../enums/PrizeType.js";
import Position from "./Position.js";

export default class Prize {
	#value;
	#type;
	#position;

	constructor(args = {}) {
		const { value, type, position } = args;
		if (!type) {
			throw new Error('Prize type is required');
		}
		if (!value) {
			throw new Error('Prize value is required');
		}
		if (!PrizeType.TYPES.includes(type)) {
			throw new Error('Invalid prize type');
		}
		this.#type = type;
		this.#value = value;
		this.#position = position || null;
	}

	get type() {
		return this.#type;
	}

	get value() {
		return this.#value;
	}

	get position() {
		return this.#position;
	}

	setPosition(position) {
		if (!(position instanceof Position)) {
			throw new Error('Position must be an instance of Position class');
		}
		this.#position = position.clone();
	}
}