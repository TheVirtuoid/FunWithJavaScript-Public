import Item from "../Item/Item.js";

export default class Weapon extends Item {
	#damage;
	#range;
	#size;
	#category;

	constructor(args = {}) {
		const { damage, range, size, category } = args;
		if (typeof damage !== 'string') {
			throw new Error('Damage must be a string');
		}
		if (typeof size !== 'string') {
			throw new Error('Size must be a string');
		}
		if (range) {
			if (!Array.isArray(range)) {
				throw new Error('Range must be an array');
			}
			range.forEach((entry) => {
				if (!Array.isArray(entry)) {
					throw new Error('Range entries must be arrays');
				}
				if (entry.length !== 2 || typeof entry[0] !== 'number' || typeof entry[1] !== 'number') {
					throw new Error('Range entries must have exactly two numbers');
				}
			});
		}
		if (!category) {
			throw new Error('Category is required');
		}
		if (!Array.isArray(category)) {
			throw new Error('Category must be an array');
		}
		category.forEach((entry) => {
			if (typeof entry !== 'string') {
				throw new Error('Category entries must be strings');
			}
		})
		super(args);
		this.#damage = damage;
		this.#range = range;
		this.#size = size;
		this.#category = category;
	}

	get damage() {
		return this.#damage;
	}
	get range() {
		return structuredClone(this.#range);
	}
	get size() {
		return this.#size;
	}
	get category() {
		return [...this.#category];
	}

	toObject() {
		const weaponObject = super.toObject();
		weaponObject.damage = this.#damage;
		weaponObject.range = structuredClone(this.#range);
		weaponObject.size = this.#size;
		weaponObject.category = structuredClone(this.#category);
		return weaponObject;
	}
}