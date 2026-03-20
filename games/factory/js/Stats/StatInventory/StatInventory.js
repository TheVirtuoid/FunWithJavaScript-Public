import WorldData from "../../WorldData/WorldData.js";

export default class StatInventory {
	#inventory;

	constructor() {
		this.#inventory = new Map();
	}

	clear() {
		this.#inventory.clear();
	}

	update(item, amount) {
		if (!WorldData.BUILDING_TYPES.includes(item)) {
			throw new Error('Invalid item provided');
		}
		if (!Number.isInteger(amount)) {
			throw new Error('Amount must be an integer');
		}
		this.#inventory.set(item, (this.#inventory.get(item) ?? 0) + amount);
	}

	getItemInventory(item) {
		return this.#inventory.get(item) ?? 0;
	}

	getInventory() {
		return this.#inventory;
	}
}