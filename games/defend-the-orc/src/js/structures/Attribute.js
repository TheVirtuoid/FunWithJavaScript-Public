export default class Attribute {

	#id;
	#name;
	#value;

	constructor(args = {}) {
		const { id, name, value } = args;
		this.#id = id;
		this.#name = name;
		this.#value = value;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get value() {
		return this.#value;
	}

	setValue(value) {
		this.#value = value;
	}
}