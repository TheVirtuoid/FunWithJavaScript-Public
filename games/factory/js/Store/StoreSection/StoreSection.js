export default class StoreSection {
	#inventory;
	#name;

	constructor(args = {}) {
		const { name } = args;
		this.#name = name;
	}
}