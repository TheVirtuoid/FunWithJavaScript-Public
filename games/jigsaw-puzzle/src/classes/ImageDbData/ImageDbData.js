export default class ImageDbData {
	#name;
	#url;
	#category;
	#id;

	constructor(args = {}) {
		const { name, url, id, category } = args;
		this.#name = name || null;
		this.#url = url || null;
		this.#category = category || null;
		this.#id = id || null;
	}

	get name() {
		return this.#name;
	}

	get url() {
		return this.#url;
	}

	get category() {
		return this.#category;
	}

	get id() {
		return this.#id;
	}
}
