import Store from "./Store.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Combinator from "../Combinator/Combinator.js";
import Purifier from "../Purifier/Purifier.js";
import Extractor from "../Extractor/Extractor.js";
import WorldData from "../WorldData/WorldData.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Utilities from "../Utilities/Utilities.js";

export default class StoreUI extends Store {

	#scene;
	#cash;

	constructor(scene) {
		super();
		this.#scene = scene;
		this.reset();
		document.getElementById('store').addEventListener('click', this.#purchase.bind(this));
	}

	setCash(cash) {
		this.#cash = cash;
		this.#disablePurchases();
	}

	start() {
		super.start();
		this.render();
		this.#disablePurchases();
	}

	reset() {
		super.reset();
		this.render();
	}

	render() {
		this.#renderSection('conveyors', Conveyor.DESCRIPTIONS);
		this.#renderSection('extractors', Extractor.DESCRIPTIONS);
		this.#renderSection('purifiers', Purifier.DESCRIPTIONS);
		this.#renderSection('combinators', Combinator.DESCRIPTIONS);
	}

	#renderSection(section, database) {
		const ul = document.querySelector(`#store .subsection.${section} ul`);
		database.forEach((description, key) => {
			const item = this.getInventory(description);
			const li = ul.querySelector(`li[data-key="${key.description}"]`);
			if (item && !li) {
				const liElement = document.createElement('li');
				liElement.dataset.key = key.description;
				const img = document.createElement('img');
				img.src = `img/${key.description}.png`;
				img.alt = key.description;
				liElement.appendChild(img);
				const button = document.createElement('button');
				button.classList.add('primary', 'small', 'purchase');
				button.textContent = Utilities.FormatShortNumber(item.cost);
				button.title = `Total cost: ${item.cost}`;
				liElement.appendChild(button);
				ul.appendChild(liElement);
			} else if (!item && li) {
				li.remove();
			}
		});
	}

	#disablePurchases() {
		const buttons = document.querySelectorAll('#store .subsection button.purchase');
		buttons.forEach(button => {
			const description = button.closest('li').dataset.key;
			const item = this.getInventory(description);
			if (item.cost <= this.#cash) {
				button.disabled = false;
			} else {
				button.disabled = true;
			}
		});
	}

	#purchase(event) {
		if (event.target.tagName === 'BUTTON') {
			const description = event.target.closest('li').dataset.key;
			const item = this.getInventory(description);
			const amount = item.cost;
			if (amount <= this.#cash) {
				const newCost = this.purchaseBuilding(description);
				event.target.textContent = Utilities.FormatShortNumber(newCost);
				event.target.title = `Total cost: ${newCost}`;
				const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === description)[1];
				GameEvent.Emit(GameEvent.INVENTORY_ADD, { symbol, number: 1 });
				GameEvent.Emit(GameEvent.STAT_CASH, -amount);
			}
		}
	}
}