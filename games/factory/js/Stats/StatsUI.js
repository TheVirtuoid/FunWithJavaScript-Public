import Stats from "./Stats.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import DistributionCenter from "../DistributionCenter/DistributionCenter.js";
import Utilities from "../Utilities/Utilities.js";

export default class StatsUI extends Stats {

	#domCursorPosition;
	#domCash;
	#domInventory;
	#domInformation;
	#inventoryPlacement;
	#scene;

	constructor(scene) {
		super();
		this.#scene = scene;
	}

	create() {
		this.#domCursorPosition = document.getElementById('cursor-position');
		this.#domCash = document.getElementById('cash');
		this.#domInventory = document.getElementById('inventory');
		this.#domInformation = document.querySelector('.stats .stat.information');
		this.updateDom();
		this.updateInformation();
		document.getElementById('inventory').addEventListener('click', (event) => {
			const button = event.target.closest('button');
			if (button) {
				const key = button.closest('li').dataset.item;
				GameEvent.Emit(GameEvent.INVENTORY_REMOVE_ACTIVE);
				if (this.#inventoryPlacement) this.#inventoryPlacement.ghost.destroy();
				const ghost = this.#scene.add.image(0, 0, key);
				ghost.setAlpha(0.5);
				ghost.setDepth(100);
				GameEvent.Emit(GameEvent.INVENTORY_SET_ACTIVE, { key, ghost });
			}
		});
	}

	start() {
		super.start();
		this.updateDom();
	}

	setCursorPosition(position) {
		super.setCursorPosition(position);
		this.updateDom();
	}

	updateInformation(position, worldData) {
		this.#domInformation.replaceChildren();
		if (!(position instanceof Vector2d)) {
			return;
		}
		if (worldData?.building) {
			let p = document.createElement('p');
			p.textContent = `${position.toString()} - ${worldData.building.type.description}`;
			this.#domInformation.appendChild(p);
			if (!DistributionCenter.Has(worldData.building.type) && !Conveyor.Has(worldData.building.type)) {
				const ul = document.createElement('ul');
				const { building } = worldData;
				ul.classList.add('information-stats');
				ul.appendChild(this.#buildInformationItem({ text: 'Speed', id: building.id, value: building.speed, buttonValue: building.upgrade.speed }));
				ul.appendChild(this.#buildInformationItem({ text: 'Level', id: building.id, value: building.level, buttonValue: building.upgrade.level }));
				ul.appendChild(this.#buildInformationItem({ text: 'Purity', id: building.id, value: building.purity, buttonValue: building.upgrade.purity }));
				this.#domInformation.appendChild(ul);
				return;
			}
		}
		if (worldData?.deposit) {
			let p = document.createElement('p');
			p.textContent = `${position.toString()} - ${worldData.deposit.type.description} deposit`;
			this.#domInformation.appendChild(p);
		}
	}

	updateInventory(item, amount) {
		super.updateInventory(item, amount);
		const inventoryAmount = this.inventory.get(item);
		if (inventoryAmount === 0) {
			GameEvent.Emit(GameEvent.INVENTORY_REMOVE_ACTIVE);
		}
		this.updateDom();
	}

	updateCash(amount) {
		super.updateCash(amount);
		this.updateDom();
	}

	updateDom() {
		this.#domCursorPosition.textContent = this.started ? this.cursorPosition.toString() : 'n/a';
		this.#domCash.textContent = this.started ? this.cash : 'n/a';
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

		})
	}

	#buildInformationItem(item) {
		const { text, value, id, buttonValue } = item;
		const li = document.createElement('li');
		li.dataset.id = id;
		const span = document.createElement('span');
		span.textContent = `${text}: ${value}`;
		li.appendChild(span);
		const button = document.createElement('button');
		button.classList.add('tertiary', 'small', 'thin');
		button.textContent = Utilities.FormatShortNumber(buttonValue);
		button.title = `Total cost: ${buttonValue}`;
		li.appendChild(button);
		return li;
	}

	/*
						<li><img src="img/extractor-aetherite.png" alt="Extractor Aetherite"/><span>2</span></li>

	 */
}