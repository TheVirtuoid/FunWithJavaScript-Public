export default class Track {
	#id;
	#type;

	constructor(args = {}) {
		const { id, type } = args;
		this.#id = id;
		this.#type = type;
	}

	get id() {
		return this.#id;
	}

	get type() {
		return this.#type;
	}
}