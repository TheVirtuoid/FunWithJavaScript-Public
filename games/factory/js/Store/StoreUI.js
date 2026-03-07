import Store from "./Store.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Combinator from "../Combinator/Combinator.js";
import Purifier from "../Purifier/Purifier.js";
import Extractor from "../Extractor/Extractor.js";
import WorldData from "../WorldData/WorldData.js";
import GameEvent from "../GameEvent/GameEvent.js";

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
		this.#renderSection('conveyors', this.conveyors, Conveyor.TYPES);
		this.#renderSection('extractors', this.extractors, Extractor.TYPES);
		this.#renderSection('purifiers', this.purifiers, Purifier.TYPES);
		this.#renderSection('combinators', this.combinators, Combinator.TYPES);
	}

	#renderSection(section, items, database) {
		const ul = document.querySelector(`#store .subsection.${section} ul`);
		database.forEach((key) => {
			const item = items.get(key);
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
				button.dataset.id = key.description;
				button.textContent = item.cost;
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
			if (parseInt(button.textContent) <= this.#cash) {
				button.disabled = false;
			} else {
				button.disabled = true;
			}
		});
	}

	#purchase(event) {
		if (event.target.tagName === 'BUTTON') {
			const amount = parseInt(event.target.textContent);
			if (amount <= this.#cash) {
				const building = event.target.dataset.id;
				const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === building)[1];
				const newCost = this.purchaseBuilding(symbol);
				event.target.textContent = newCost;
				GameEvent.Emit(GameEvent.INVENTORY_ADD, { symbol, number: 1 });
				GameEvent.Emit(GameEvent.STAT_CASH, -amount);
				console.log(building, symbol);
			}
		}
	}
}