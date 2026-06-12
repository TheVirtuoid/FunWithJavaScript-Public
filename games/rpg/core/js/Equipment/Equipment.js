import Item from "../Item/Item.js";

export default class Equipment extends Item {

	static #data = new Map(Item.GetItems('equipment'));

	static IsEquipment(id) {
		if (typeof id !== 'string') {
			throw new Error('id must be a string');
		}
		return this.#data.has(id);
	}

	static GetEquipment(id) {
		if (typeof id !== 'string') {
			throw new Error('id must be a string');
		}
		return this.#data.get(id);
	}

	constructor(args = {}) {
		super(args);
	}
}