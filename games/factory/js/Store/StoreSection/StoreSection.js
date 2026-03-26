import EventHandler from "../../Utilities/EventHandler.js";
import GameEvent from "../../GameEvent/GameEvent.js";

export default class StoreSection {
	#inventory;
	#name;

	constructor(args = {}) {
		const { name } = args;
		this.#name = name;
		this.#inventory = new Map();
	}

	get name() {
		return this.#name;
	}

	get inventory() {
		return this.#inventory;
	}

	getInventoryItem(type) {
		return this.#inventory.get(type);
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