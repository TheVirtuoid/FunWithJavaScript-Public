import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import StoreSection from "./StoreSection/StoreSection.js";
import GameEvent from "../GameEvent/GameEvent.js";
import EventHandler from "../Utilities/EventHandler.js";

export default class Store extends EventHandler {

	static STORES = [
		{ name: Conveyor.NAME, buildClass: Conveyor },
		{ name: Extractor.NAME, buildClass: Extractor },
		{ name: Purifier.NAME, buildClass: Purifier },
		{ name: Combinator.NAME, buildClass: Combinator }
	];

	#id;
	#stores;
	#availableCash;

	constructor() {
		super();
		this.#id = window.crypto.randomUUID();
		this.#stores = new Map();
		Store.STORES.forEach(storeData => {
			this.#addSection(storeData.name, storeData.buildClass);
		})
	}

	get id() {
		return this.#id;
	}

	getStoreSection(name) {
		return this.#stores.get(name);
	}

	setAvailableCash(cash) {
		this.#availableCash = cash;
		this.#stores.forEach((storeSection) => storeSection.setAvailableCash(cash));
		this.triggerAllCallbacks({ type: GameEvent.STORE_UPDATE_CASH, data: this.#availableCash });
	}

	#addSection(name, buildClass) {
		const storeSection = new StoreSection(name);
		storeSection.addInventory(buildClass);
		this.#stores.set(name, storeSection);
	}
}