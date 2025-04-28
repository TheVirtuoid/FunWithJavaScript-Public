import layoutData from "./LayoutDb.js";

export default class LayoutData {
	#id;
	#name;
	#description;
	#layout;

	constructor(args = {}) {
		const { id = '', name = '', description = '' } = args;
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#layout = null;
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

	get layout() {
		return this.#layout;
	}

	// TODO: When the database is official, replace this with a proper URL load function
	getLayout() {
		if (this.#layout === null) {
			this.#layout = 'This is a layout';
		}
	}
}