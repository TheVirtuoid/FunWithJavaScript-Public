export default class CutDbData {
	#name;
	#description;
	#url;
	#id;

	constructor(args = {}) {
		this.#name = args.name || null;
		this.#description = args.description || null;
		this.#url = args.url || null;
		this.#id = args.id || null;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get url() {
		return this.#url;
	}

	get id() {
		return this.#id;
	}
}
