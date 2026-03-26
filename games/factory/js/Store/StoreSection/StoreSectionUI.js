import Utilities from "../../Utilities/Utilities.js";
import GameEvent from "../../GameEvent/GameEvent.js";

export default class StoreSectionUI {
	#dom;
	#name;
	#inventoryList;
	#inventoryListItem;
	#cash;
	#storeSection;

	constructor(args = {}) {
		const { dom, name } = args;
		this.#dom = dom;
		this.#name = name;
		this.#inventoryListItem = new Map();
	}

	get name() {
		return this.#name;
	}

	setCash(cash) {
		this.#cash = cash;
	}

	build(name, storeSection) {
		this.#storeSection = storeSection;
		const div = document.createElement('div');
		div.classList.add('subsection');
		div.dataset.name = name;
		const h5 = document.createElement('h5');
		h5.textContent = `${name}s`;
		this.#inventoryList = document.createElement('ul');
		this.#storeSection.inventory.forEach((base, type) => {
			const li = document.createElement('li');
			this.#inventoryListItem.set(type, li);
			const img = document.createElement('img');
			img.src = `img/${type.description}.png`;
			img.alt = type.description;
			li.appendChild(img);
			const button = document.createElement('button');
			button.classList.add('primary', 'small', 'purchase');
			button.textContent = Utilities.FormatShortNumber(base.cost);
			button.title = `Total cost: ${base.cost}`;
			li.appendChild(button);
			this.#inventoryList.appendChild(li);
		});
		this.#inventoryList.addEventListener('click', this.#processPurchase.bind(this));
		div.appendChild(h5);
		div.appendChild(this.#inventoryList);
		this.#dom.appendChild(div);
	}

	setDisabled(limit) {
		this.#inventoryListItem.forEach((listItem, type) => {
			const button = listItem.querySelector('button');
			button.disabled = this.#storeSection.getInventoryItem(type).cost > limit;
		});
	}

	#processPurchase(event) {
		if (event.target.tagName !== 'BUTTON') return;
		const data = [...this.#inventoryListItem.entries()].find(([type, listItem]) => listItem === event.target.closest('li'));
		if (data.length) {
			const [type] = data;
			const { cost } = this.#storeSection.getInventoryItem(type);
			if (cost <= this.#cash) {
				const newCost = this.#storeSection.purchaseBuilding(type, cost);
				event.target.textContent = Utilities.FormatShortNumber(newCost);
				event.target.title = `Total cost: ${newCost}`;
			}
		}
	}
}