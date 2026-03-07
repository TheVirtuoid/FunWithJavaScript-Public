import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

export default class Store {
	#conveyors;
	#purifiers;
	#extractors;
	#combinators;
	#level;
	#id;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#level = 0;
		this.#conveyors = new Map();
		this.#purifiers = new Map();
		this.#extractors = new Map();
		this.#combinators = new Map();
	}

	get id() {
		return this.#id;
	}
	get level() {
		return this.#level;
	}
	get conveyors() {
		return new Map([...this.#conveyors]);
	}
	get purifiers() {
		return new Map([...this.#purifiers]);
	}
	get extractors() {
		return new Map([...this.#extractors]);
	}
	get combinators() {
		return new Map([...this.#combinators]);
	}

	reset() {
		this.#conveyors.clear();
		this.#purifiers.clear();
		this.#extractors.clear();
		this.#combinators.clear();
	}

	start() {
		this.reset();
		this.#addConveyors();
		this.#addExtractors();
		this.#addPurifiers();
		this.#addCombinators();
	}

	getExtractor(extractor) {
		if (Extractor.Has(extractor)) {
			const price = this.#extractors.get(extractor);
			return { price };
		}
	}

	getPurifier(purifier) {
		if (Purifier.Has(purifier)) {
			const price = this.#purifiers.get(purifier);
			return { price };
		}
	}

	getCombinator(combinator) {
		if (Combinator.Has(combinator)) {
			const price = this.#combinators.get(combinator);
			return { price };
		}
	}

	purchaseBuilding(buildingType) {
		if (Conveyor.Has(buildingType)) {
			return this.#adjustBuildingForPurchase({ db: this.#conveyors, type: buildingType });
		} else if (Purifier.Has(buildingType)) {
			return this.#adjustBuildingForPurchase({ db: this.#purifiers, type: buildingType });
		} else if (Extractor.Has(buildingType)) {
			return this.#adjustBuildingForPurchase({ db: this.#extractors, type: buildingType });
		} else if (Combinator.Has(buildingType)) {
			return this.#adjustBuildingForPurchase({ db: this.#combinators, type: buildingType });
		}
	}

	#adjustBuildingForPurchase(args) {
		const { db, type } = args;
		const { cost } = db.get(type);
		const level = Extractor.Base(type).level;
		const newCost = Math.round(cost * level);
		db.set(type, { cost: newCost });
		return newCost;
	}

	#addConveyors() {
		Conveyor.TYPES.forEach((type) => {
			this.#conveyors.set(type, { cost: 10 });
		});
	}

	#addExtractors() {
		Extractor.TYPES.forEach((type) => {
			this.#extractors.set(type, { cost: Extractor.Base(type)?.cost || 100 });
		})
	}

	#addPurifiers() {
		Purifier.TYPES.forEach((type) => {
			this.#purifiers.set(type, { cost: 100 });
		})
	}

	#addCombinators() {
		Combinator.TYPES.forEach((type) => {
			this.#combinators.set(type, { cost: 100 });
		})
	}
}