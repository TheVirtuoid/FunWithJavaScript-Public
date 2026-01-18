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
		this.updateInventory(Conveyor.STRAIGHT, 10);
		this.updateInventory(Conveyor.CURVE_RIGHT, 10);
		this.updateInventory(Conveyor.CURVE_LEFT, 10);
		this.updateInventory(Conveyor.T_INTERSECTION_LEFT, 10);
		this.updateInventory(Conveyor.T_INTERSECTION_RIGHT, 10);
		this.updateInventory(Conveyor.X_INTERSECTION, 10);

		this.updateInventory(Extractor.AETHERITE, 10);
		this.updateInventory(Extractor.OBSIDIANITE, 10);
		this.updateInventory(Extractor.LUMINITE, 10);
		this.updateInventory(Extractor.PYROTITE, 10);
		this.updateInventory(Extractor.ZENITHITE, 10);

		this.updateInventory(Purifier.AETHERITE, 10);
		this.updateInventory(Purifier.OBSIDIANITE, 10);
		this.updateInventory(Purifier.LUMINITE, 10);
		this.updateInventory(Purifier.PYROTITE, 10);
		this.updateInventory(Purifier.ZENITHITE, 10);

		this.updateInventory(Combinator.ETHERIUM, 10);
		this.updateInventory(Combinator.IGNISIUM, 10);
		this.updateInventory(Combinator.MAGNANIUM, 10);
		this.updateInventory(Combinator.PHOTONIUM, 10);
		this.updateInventory(Combinator.SOLTARIUM, 10);
		this.updateInventory(Combinator.VOIDTISSIUM, 10);
		this.updateInventory(Combinator.STARFORGE, 10);

		this.updateInventory(Conveyor.STRAIGHT, 20);
		this.updateInventory(Conveyor.CURVE_RIGHT, -10);
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
			console.log(item, count, existingDom);
		})
	}

	/*
						<li><img src="img/extractor-aetherite.png" alt="Extractor Aetherite"/><span>2</span></li>

	 */
}