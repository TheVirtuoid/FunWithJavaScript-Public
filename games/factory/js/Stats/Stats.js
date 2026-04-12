import StatCursorPosition from "./StatCursorPosition/StatCursorPosition.js";
import EventHandler from "../Utilities/EventHandler.js";
import GameEvent from "../GameEvent/GameEvent.js";
import StatCash from "./StatCash/StatCash.js";
import StatInformation from "./StatInformation/StatInformation.js";
import StatInventory from "./StatInventory/StatInventory.js";

export default class Stats extends EventHandler{

	#id;
	#inventory;
	#cursorPosition;
	#cash;
	#information;

	constructor() {
		super();
		this.#id = window.crypto.randomUUID();
		this.#cash = new StatCash({ cash: 0 });
		this.#cursorPosition = new StatCursorPosition();
		this.#information = new StatInformation();
		this.#inventory = new StatInventory();
	}

	get id() {
		return this.#id;
	}

	get cash() {
		return this.#cash.cash;
	}

	get cursorPosition() {
		return this.#cursorPosition.cursorPosition;
	}

	start() {
		this.#inventory.clear();
	}

	setCursorPosition(position) {
		this.#cursorPosition.setCursorPosition(position);
		this.triggerAllCallbacks({ type: GameEvent.STAT_CURSOR_POSITION, data: position });
	}

	updateCash(amount) {
		this.#cash.setCash(this.#cash.cash + amount);
		this.triggerAllCallbacks({ type: GameEvent.STAT_CASH, data: this.#cash.cash });
	}

	updateInventory(item, amount) {
		this.#inventory.update(item, amount);
		this.triggerAllCallbacks({ type: GameEvent.STAT_INVENTORY_UPDATE, data: this.#inventory });
	}

	populateInformation(data) {
		this.#information.populate(data);
		this.triggerAllCallbacks({ type: GameEvent.STAT_INFORMATION_UPDATE, data: this.#information });
	}
}