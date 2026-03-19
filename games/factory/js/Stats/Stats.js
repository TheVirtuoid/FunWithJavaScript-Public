import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import WorldData from "../WorldData/WorldData.js";
import StatCursorPosition from "./StatCursorPosition/StatCursorPosition.js";

export default class Stats {

	static CASH_START = 200000;

	#id;
	#cash;
	#inventory;
	#cursorPosition;
	#started;
	#eventCallback;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#cash = -1;
		this.#inventory = new Map();
		this.#cursorPosition = new StatCursorPosition();
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

	get cursorPosition() {
		return this.#cursorPosition.cursorPosition;
	}

	get started() {
		return this.#started;
	}

	setEventCallback(callback) {
		this.#eventCallback = callback;
	}

	start() {
		this.#cash = Stats.CASH_START;
		this.#cursorPosition = Stats.CURSOR_POSITION_START;
		this.#inventory.clear();
		this.#started = true;
	}

	setCursorPosition(position) {
		this.#cursorPosition.setCursorPosition(position);
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
}