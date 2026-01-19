import Stats from "./Stats.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

export default class StatsUI extends Stats {

	#domCursorPosition;
	#domCash;
	#domLevel;
	#domInventory;

	constructor() {
		super();
	}

	create() {
		this.#domCursorPosition = document.getElementById('cursor-position');
		this.#domCash = document.getElementById('cash');
		this.#domLevel = document.getElementById('level');
		this.#domInventory = document.getElementById('inventory');
		this.updateDom();
	}

	start() {
		super.start();
		this.updateDom();
	}

	setCursorPosition(position) {
		super.setCursorPosition(position);
		this.updateDom();
	}

	updateInventory(item, amount) {
		super.updateInventory(item, amount);
		this.updateDom();
	}

	updateCash(amount) {
		super.updateCash(amount);
		this.updateDom();
	}

	updateDom() {
		this.#domCursorPosition.textContent = this.started ? this.cursorPosition.toString() : 'n/a';
		this.#domCash.textContent = this.started ? this.cash : 'n/a';
		this.#domLevel.textContent = this.started ? this.level : 'n/a';
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
				const span = document.createElement('span');
				span.textContent = count;
				li.appendChild(img);
				li.appendChild(span);
				this.#domInventory.appendChild(li);
			}
		})
	}

	/*
						<li><img src="img/extractor-aetherite.png" alt="Extractor Aetherite"/><span>2</span></li>

	 */
}