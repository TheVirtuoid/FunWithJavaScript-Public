import Model from "../Model/Model.js";

export default class CarData {
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
	loadCar() {
		this.#model = null;
	}
}