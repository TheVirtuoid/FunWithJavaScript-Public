import GameEvent from "../../GameEvent/GameEvent.js";
import WorldData from "../../WorldData/WorldData.js";

export default class StatInventoryUI {
	#dom;

	constructor(dom) {
		this.#dom = dom;
		this.#dom.addEventListener('click', this.#processInventorySelect.bind(this));
	}

	update(statInventory) {
		[...statInventory.getInventory()].forEach(([item, count]) => {
			const existingDom = this.#dom.querySelector(`li[data-item="${item.description}"]`);
			if (existingDom) {
				if (count === 0) {
					existingDom.remove();
					GameEvent.Emit(GameEvent.INVENTORY_REMOVE_ACTIVE);
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
				this.#dom.appendChild(li);
			}
		});
	}

	#processInventorySelect(event) {
		const button = event.target.closest('button');
		if (button) {
			const key = button.closest('li').dataset.item;
			const type = WorldData.BUILDING_SYMBOLS.get(key);
			const canFlip = WorldData.BUILDING_CAN_FLIP.get(type);
			GameEvent.Emit(GameEvent.INVENTORY_REMOVE_ACTIVE);
			GameEvent.Emit(GameEvent.INVENTORY_SET_ACTIVE, { key, type, canFlip });
		}
	}
}