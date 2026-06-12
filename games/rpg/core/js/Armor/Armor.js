import Item from "../Item/Item.js";

export default class Armor extends Item {
	#armorClass;
	#category;

	static #data = new Map(Item.GetItems('armor'));

	static IsArmor(id) {
		if (typeof id !== 'string') {
			throw new Error('id must be a string');
		}
		return this.#data.has(id);
	}

	static GetArmor(id) {
		if (typeof id !== 'string') {
			throw new Error('id must be a string');
		}
		return this.#data.get(id);
	}

	constructor(args = {}) {
		const { armorClass, category = ['armor'] } = args;
		if (typeof armorClass !== 'number') {
			throw new Error('armorClass must be a number');
		}
		if (!Array.isArray(category)) {
			throw new Error('category must be an array');
		}
		category.forEach((entry) => {
			if (typeof entry !== 'string') {
				throw new Error('category entries must be strings');
			}
		});
		super(args);
		this.#armorClass = armorClass;
		this.#category = category;
	}

	get armorClass() {
		return this.#armorClass;
	}

	get category() {
		return structuredClone(this.#category);
	}

	toObject() {
		const armorObject = super.toObject();
		armorObject.armorClass = this.#armorClass;
		armorObject.category = structuredClone(this.#category);
		return armorObject;
	}

}