import Stats from "./Stats.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import DistributionCenter from "../DistributionCenter/DistributionCenter.js";
import Utilities from "../Utilities/Utilities.js";
import StatCursorPositionUI from "./StatCursorPosition/StatCursorPositionUI.js";
import StatCashUI from "./StatCash/StatCashUI.js";
import StatInformationUI from "./StatInformation/StatInformationUI.js";
import StatInventoryUI from "./StatInventory/StatInventoryUI.js";

export default class StatsUI {

	#domCursorPosition;
	#domCash;
	#domInventory;
	#domInformation;
	#inventoryPlacement;
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

/*	updateInventory(item, amount) {
		super.updateInventory(item, amount);
		const inventoryAmount = this.inventory.get(item);
		if (inventoryAmount === 0) {
			GameEvent.Emit(GameEvent.INVENTORY_REMOVE_ACTIVE);
		}
		this.updateDom();
	}*/

	updateDom() {
		this.#cursorPositionUI.update(this.#stats.cursorPosition);
		this.#cashUI.update(this.#stats.cash);
		/*this.#domCash.textContent = this.started ? this.cash : 'n/a';
		[...this.inventory].forEach(([item, count]) => {
			const existingDom = this.#domInventory.querySelector(`li[data-item="${item.description}"]`);
			if (existingDom) {
				if (count === 0) {
					existingDom.remove();
				} else {
					existingDom.querySelector('span').textContent = count;
				}
			} else if (count > 0) {
				const li = document.createElement('li');
				li.dataset.item = item.description;
				const img = document.createElement('img');
				img.src = `img/${item.description}.png`;
				img.alt = item.description;
				const button = document.createElement('button');
				button.classList.add('icon-only');
				button.appendChild(img);
				const span = document.createElement('span');
				span.textContent = count;
				li.appendChild(button);
				li.appendChild(span);
				this.#domInventory.appendChild(li);
			}
		});
		this.#domInformation.querySelectorAll('button').forEach(button => {

		})*/
	}
}