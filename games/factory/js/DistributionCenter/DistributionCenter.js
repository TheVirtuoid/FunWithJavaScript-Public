export default class DistributionCenter {
	static DEFAULT_CASH = 1000;

	#id;
	#name;
	#cash;

	constructor(args = {}) {
		this.#id = window.crypto.randomUUID();
		this.#name = '';
		this.#cash = 0;
	}

	get name() {
		return this.#name;
	}

	get cash() {
		return this.#cash;
	}

	get id() {
		return this.#id;
	}

	initialize(name) {
		if (typeof name !== 'string') {
			throw new Error('DistributionCenter.initialize() requires a string');
		}
		if (name.length === 0) {
			throw new Error('DistributionCenter.initialize() requires a non-empty string');
		}
		if (name.length > 30) {
			throw new Error('DistributionCenter.initialize() requires a string shorter than 30 characters');
		}
		this.#name = name;
		this.#cash = DistributionCenter.DEFAULT_CASH;
	}
}