import Alloy from "../Alloy/Alloy.js";

export default class Combinator {

	#id;
	#level;
	#type;

	constructor(args = {}) {
		const { type } = args;
		if (!Alloy.Has(type)) {
			throw new Error('Invalid alloy type provided');
		}
		this.#id = window.crypto.randomUUID();
		this.#level = 1;
		this.#type = type;
	}

	get id() {
		return this.#id;
	}
	get level() {
		return this.#level;
	}
	get type() {
		return this.#type;
	}
}