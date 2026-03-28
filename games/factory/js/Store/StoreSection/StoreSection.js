import EventHandler from "../../Utilities/EventHandler.js";
import GameEvent from "../../GameEvent/GameEvent.js";

export default class StoreSection {
	#inventory;
	#availableCash;
	#name;

	constructor(args = {}) {
		const { name } = args;
		this.#name = name;
		this.#inventory = new Map();
		this.#availableCash = 0;
	}

	get name() {
		return this.#name;
	}

	get inventory() {
		return this.#inventory;
	}

	get availableCash() {
		return this.#availableCash;
	}

	getInventoryItem(type) {
		return this.#inventory.get(type);
	}

	setAvailableCash(cash) {
		this.#availableCash = cash;
	}

	addInventory(buildingClass) {
		buildingClass.TYPES.forEach((type) => {
			const pricing = buildingClass.Pricing(type);
			this.#inventory.set(type, { cost: pricing.base.cost, pricing });
		});
	}

	purchaseBuilding(type, cost) {
		const data = this.#inventory.get(type);
		const level = data.pricing.base.level;
		const newCost = Math.floor(cost * level);
		data.cost = newCost;
		this.#inventory.set(type, data);
		GameEvent.Emit(GameEvent.INVENTORY_ADD, { type, number: 1 });
		GameEvent.Emit(GameEvent.STAT_CASH, -cost);
		return newCost;
	}
}