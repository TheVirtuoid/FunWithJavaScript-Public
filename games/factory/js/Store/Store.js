export default class Store {
	#conveyors;
	#purifiers;
	#extractors;
	#combinators;
	#level;
	#id;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#level = 0;
		this.#conveyors = new Map();
		this.#purifiers = new Map();
		this.#extractors = new Map();
		this.#combinators = new Map();
	}

	get id() {
		return this.#id;
	}
	get level() {
		return this.#level;
	}
	get conveyors() {
		return new Map([...this.#conveyors]);
	}
	get purifiers() {
		return new Map([...this.#purifiers]);
	}
	get extractors() {
		return new Map([...this.#extractors]);
	}
	get combinators() {
		return new Map([...this.#combinators]);
	}

	incrementLevel() {
		this.#level++;
	}
}