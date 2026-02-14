export default class Transporter {

	#inactiveItems;
	#activeItems;

	constructor() {
		this.#activeItems = new Set();
		this.#inactiveItems = new Set();
	}

	add(item) {
		this.#inactiveItems.add(item);
	}

	remove(item) {
		this.#activeItems.delete(item);
		this.#inactiveItems.delete(item);
	}

}