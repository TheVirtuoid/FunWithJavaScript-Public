import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import WorldData from "../WorldData/WorldData.js";

export default class Stats {

	static CASH_START = 10000;
	static LEVEL_START = 1;
	static CURSOR_POSITION_START = new Vector2d(-1, -1);

	#id;
	#cash;
	#inventory;
	#level;
	#cursorPosition;
	#started;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#cash = -1;
		this.#inventory = new Map();
		this.#level = 0;
		this.#cursorPosition = new Vector2d(-1, -1);
		this.#started = false;
	}

	get id() {
		return this.#id;
	}
	get cash() {
		return this.#cash;
	}
	get inventory() {
		return new Map([...this.#inventory]);
	}
	get level() {
		return this.#level;
	}
	get cursorPosition() {
		return this.#cursorPosition;
	}
	get started() {
		return this.#started;
	}

	start() {
		this.#cash = Stats.CASH_START;
		this.#level = Stats.LEVEL_START;
		this.#cursorPosition = Stats.CURSOR_POSITION_START;
		this.#inventory.clear();
		this.#started = true;
	}

	setCursorPosition(position) {
		if (!(position instanceof Vector2d)) {
			throw new Error('Position must be a Vector2d');
		}
		/*if (!this.started) {
			throw new Error('Cannot set cursor position before game has started');
		}*/
		this.#cursorPosition = position;
	}

	updateCash(amount) {
		if (!Number.isInteger(amount)) {
			throw new Error('Amount must be an integer');
		}
		if (!this.started) {
			throw new Error('Cannot update cash before game has started');
		}
		this.#cash += amount;
	}

	updateInventory(item, amount) {
		if (!WorldData.BUILDING_TYPES.includes(item)) {
			throw new Error('Invalid item provided');
		}
		if (!Number.isInteger(amount)) {
			throw new Error('Amount must be an integer');
		}
		if (!this.started) {
			throw new Error('Cannot update inventory before game has started');
		}
		const currentCount = this.#inventory.get(item) ?? 0;
		this.#inventory.set(item, currentCount + amount);
	}

	incrementLevel() {
		if (!this.started) {
			throw new Error('Cannot increment level before game has started');
		}
		this.#level++;
	}
}