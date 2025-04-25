import modelData from "./Model.js";

export default class ModelData {
	#id;
	#name;
	#description;
	#url;
	#model;

	constructor(args = {}) {
		const { id = '', name = '', description = '', url = '' } = args;
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#url = url;
		this.#model = null;
	}

	get id() {
		return this.#id;
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

	get model() {
		return this.#model;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	getModel() {
		if (this.#model === null) {
			this.#model = 'This is a model';
		}
	}
}