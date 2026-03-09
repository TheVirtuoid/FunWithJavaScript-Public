import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

export default class Store {
	#id;
	#inventory;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#inventory = new Map();
	}

	get id() {
		return this.#id;
	}

	getInventory(description) {
		return this.#inventory.get(description);
	}

	setInventory(description, data) {
		this.#inventory.set(description, data);
	}

	reset() {
		this.#inventory.clear();
	}

	start() {
		this.reset();
		this.#addConveyors();
		this.#addExtractors();
		this.#addPurifiers();
		this.#addCombinators();
	}

	purchaseBuilding(description) {
		const item = this.getInventory(description);
		const { cost, level } = item;
		item.cost = Math.round(cost * level);
		this.setInventory(description, item);
		return item.cost;
	}

	#addConveyors() {
		Conveyor.TYPES.forEach((type) => {
			this.#inventory.set(type.description, { ...Conveyor.Base(type) });
		});
	}

	#addExtractors() {
		Extractor.TYPES.forEach((type) => {
			this.#inventory.set(type.description, { ...Extractor.Base(type) });
		})
	}

	#addPurifiers() {
		Purifier.TYPES.forEach((type) => {
			this.#inventory.set(type.description, { ...Purifier.Base(type) });
		})
	}

	#addCombinators() {
		Combinator.TYPES.forEach((type) => {
			this.#inventory.set(type.description, { ...Combinator.Base(type) });
		})
	}
}