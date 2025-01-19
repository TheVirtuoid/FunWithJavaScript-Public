export default class Engine {
	#table;

	constructor(args = {}) {
		const { table } = args;
		this.#table = table || null;
	}

	get table() {
		return this.#table;
	}
}