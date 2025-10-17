export default class Device {
	#id;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID() } = args;
		this.#id = id;
	}

	get id() {
		return this.#id;
	}
}