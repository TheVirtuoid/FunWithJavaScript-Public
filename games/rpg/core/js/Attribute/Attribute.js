import Database from "../Database/Database.js";
import config from "./../../../config.json" with { type: 'json' };
import Dice from "../Dice/Dice.js";
const databasePath = config.database.path;

const database = new Database(databasePath);
const attributeCollection = database.getAll({ databaseName: 'attributes' });
const attributes = new Map(attributeCollection.map((attribute) => [attribute.id, attribute]));
const attributesByType = new Map(attributeCollection.map((attribute) => [attribute.type, attribute]));
const categories = new Map();
attributeCollection.forEach((attribute) => {
	if (!categories.has(attribute.category)) {
		categories.set(attribute.category, []);
	};
	const attributeList = categories.get(attribute.category);
	attributeList.push(attribute);
	categories.set(attribute.category, attributeList);
});

export default class Attribute {

	static IsAttribute(id) {
		if (typeof id !== 'string') {
			throw new Error(`id must be a string`);
		}
		return attributes.has(id);
	}

	static GetAttribute(id) {
		if (typeof id !== 'string') {
			throw new Error(`id must be a string`);
		}
		return attributes.get(id);
	}

	static GetCategoryData(categoryName) {
		if (typeof categoryName !== 'string') {
			throw new Error(`categoryName must be a string`);
		}
		return categories.get(categoryName) || [];
	}

	static GetAttributeByType(type) {
		if (typeof type !== 'string') {
			throw new Error(`id must be a string`);
		}
		return attributesByType.get(type);
	}

	#id;
	#value;
	#attributeData;

	constructor(args = {}) {
		const { id, value } = args;
		if (!Attribute.IsAttribute(id)) {
			throw new Error(`Invalid attribute type: ${id}`);
		}
		this.setValue(value);
		this.#id = id;
		this.#attributeData = Attribute.GetAttribute(id);
	}

	get id() {
		return this.#id;
	}

	get type() {
		return this.#attributeData.type;
	}

	get value() {
		return this.#value;
	}

	get category() {
		return this.#attributeData.category;
	}

	get name() {
		return this.#attributeData.name;
	}

	get abbreviation() {
		return this.#attributeData.abbreviation;
	}

	get description() {
		return this.#attributeData.description;
	}

	setValue(newValue) {
		if (!Number.isInteger(newValue) && !Dice.ValidExpression(newValue)) throw new Error(
			`Attribute value must be an integer or Dice expression: ${newValue}`
		);
		this.#value = newValue;
	}

	toObject() {
		return {
			id: this.id,
			value: this.value,
			category: this.category,
			name: this.name,
			abbreviation: this.abbreviation,
			description: this.description
		}
	}

	toString() {
		return JSON.stringify(this.toObject());
	}

}