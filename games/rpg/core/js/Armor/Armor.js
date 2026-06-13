import Item from "../Item/Item.js";

export default class Armor extends Item {
	#armorClass;
	#category;

	static #data = new Map(Item.GetItems('armor'));
	static #categories = new Set([...Armor.#data.values()].flatMap((data) => data.category));
	static #dataByType = new Map([...Armor.#data.values()].map((data) => [data.type, data]));

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

	static GetArmorByType(type) {
		if (typeof type !== 'string') {
			throw new Error('type must be a string');
		}
		return this.#dataByType.get(type);
	}

	static IsArmorCategory(category) {
		if (typeof category !== 'string') {
			throw new Error('category must be a string');
		}
		return Armor.#categories.has(category);
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