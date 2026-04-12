import GameEvent from "../GameEvent/GameEvent.js";
import StatCursorPositionUI from "./StatCursorPosition/StatCursorPositionUI.js";
import StatCashUI from "./StatCash/StatCashUI.js";
import StatInformationUI from "./StatInformation/StatInformationUI.js";
import StatInventoryUI from "./StatInventory/StatInventoryUI.js";

export default class StatsUI {

	#scene;

	#cursorPositionUI;
	#cashUI;
	#informationUI;
	#inventoryUI;
	#stats;
	#eventHandlerId;


	constructor(scene) {
		this.#scene = scene;
		this.#eventHandlerId = window.crypto.randomUUID();
	}

	preload() {}

	create() {
		this.#cursorPositionUI = new StatCursorPositionUI(document.getElementById('cursor-position'));
		this.#cashUI = new StatCashUI(document.getElementById('cash'));
		this.#informationUI = new StatInformationUI(document.querySelector('.stats .stat.information'));
		this.#inventoryUI = new StatInventoryUI(document.getElementById('inventory'));
	}

	start(stats) {
		this.#stats = stats;
		this.#stats.setCallback(this.#eventHandlerId, this.#eventCallback.bind(this));
	}

	updateCombinatorInformation(combinator) {
		this.#informationUI.updateCombinatorInformation(combinator);
	}

	removeBuilding() {
		this.#informationUI.removeBuilding();
	}

	#eventCallback(event) {
		if (event.type === GameEvent.STAT_CURSOR_POSITION) {
			this.#cursorPositionUI.update(event.data);
		} else if (event.type === GameEvent.STAT_CASH) {
			this.#cashUI.update(event.data);
			this.#informationUI.updateAvailability(this.#stats.cash);
		} else if (event.type === GameEvent.STAT_INVENTORY_UPDATE) {
			this.#inventoryUI.update(event.data);
		} else if (event.type === GameEvent.STAT_INFORMATION_UPDATE) {
			this.#informationUI.update(event.data);
		}
	}
}