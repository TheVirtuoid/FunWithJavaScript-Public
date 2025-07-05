import PrizeType from "../enums/PrizeType.js";
import Position from "./Position.js";
import PrizeUi from "./Ui/Prize.js";

export default class Prize {
	#value;
	#type;
	#position;
	#ui;

	constructor(args = {}) {
		const { value, type, position, scene } = args;
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
		this.#ui = new PrizeUi({ scene });
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

	get ui() {
		return this.#ui;
	}

	setPosition(position) {
		if (!(position instanceof Position)) {
			throw new Error('Position must be an instance of Position class');
		}
		this.#position = position.clone();
	}
}