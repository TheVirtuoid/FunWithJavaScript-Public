import crypto from 'crypto';
import Database from "../Database/Database.js";
import { databasePath } from "./../../../config.json" with { type: 'json' };

const legalClasses = ['armor', 'equipment', 'weapon'];

const database = new Database(databasePath);
const itemCollection = new Map();
legalClasses.forEach((collectionName) => {
	const collection = database.getAll({ databaseName: collectionName });
	itemCollection.set(collectionName, collection.map((data) => [data.id, data]));
});

export default class Item {

	#id;
	#name;
	#price;
	#priceUnit;
	#weight;

	static GetItems(collection) {
		if (typeof collection !== 'string') {
			throw new Error('Item collection must be a string');
		}
		return itemCollection.get(collection) || [];
	}

	constructor(args = {}) {
		const { name, price = 0, priceUnit = 'gp', weight = 0 } = args;
		if (typeof name !== 'string') {
			throw new Error('Item name must be a string');
		}
		if (typeof weight !== 'number') {
			throw new Error('Item weight must be a number');
		}
		if (weight < 0) {
			throw new Error('Item weight must be greater than or equal to 0');
		}
		this.setPrice(price);
		this.setPriceUnit(priceUnit);
		this.#id = crypto.randomUUID();
		this.#name = name;
		this.#weight = weight;
	}

	get id() {
		return this.#id;
	}
	get name() {
		return this.#name;
	}
	get price() {
		return this.#price;
	}
	get priceUnit() {
		return this.#priceUnit;
	}
	get weight() {
		return this.#weight;
	}

	setPrice(price) {
		if (typeof price !== 'number') {
			throw new Error('Item price must be a number');
		}
		this.#price = price;
	}

	setPriceUnit(priceUnit) {
		if (typeof priceUnit !== 'string') {
			throw new Error('Item price unit must be a string');
		}
		this.#priceUnit = priceUnit;
	}

	toObject() {
		return {
			id: this.id,
			name: this.name,
			price: this.price,
			priceUnit: this.priceUnit,
			weight: this.weight
		};
	}
}