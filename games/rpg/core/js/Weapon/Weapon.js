import Item from "../Item/Item.js";
import Size from "../../static/Size/Size.js";

export default class Weapon extends Item {
	#damage;
	#range;
	#size;
	#category;
	#sharp;

	constructor(args = {}) {
		const { damage, range, size, category, sharp = true } = args;
		if (typeof damage !== 'string') {
			throw new Error('Damage must be a string');
		}
		const sizeSymbol = Size.GetSymbol(size);
		if (!sizeSymbol) {
			throw new Error('Size must be a member of Size');
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
		});
		if (typeof sharp !== 'boolean') {
			throw new Error('Sharp must be a boolean');
		}
		super(args);
		this.#damage = damage;
		this.#range = range;
		this.#size = sizeSymbol;
		this.#category = category;
		this.#sharp = sharp;
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
	get sharp() {
		return this.#sharp;
	}

	toObject() {
		const weaponObject = super.toObject();
		weaponObject.damage = this.damage;
		weaponObject.range = structuredClone(this.range);
		weaponObject.size = Size.GetSize(this.size).abbr;
		weaponObject.category = structuredClone(this.category);
		weaponObject.sharp = this.sharp;
		return weaponObject;
	}
}