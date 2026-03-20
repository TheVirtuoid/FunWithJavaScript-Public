import Vector2d from "../../Vector/Vector2d/Vector2d.js";
import DistributionCenter from "../../DistributionCenter/DistributionCenter.js";
import Conveyor from "../../Conveyor/Conveyor.js";
import Utilities from "../../Utilities/Utilities.js";
import Extractor from "../../Extractor/Extractor.js";

export default class StatInformationUI {
	#dom;
	#statInformation;

	constructor(dom) {
		this.#dom = dom;
		this.#dom.addEventListener('click', this.#processUpgrade.bind(this));
	}

	#processUpgrade(event) {
		const button = event.target.closest('button');
		if (button) {
			const li = button.closest('li');
			const id = li.dataset.id;
			const building = this.#statInformation.building;
			if (building) {
				const baseData = Extractor.Base(building.type);
				const levelData = Extractor.Level(building.type, building.level);
				const upgradeType = button.dataset.type;
				console.log(building, baseData, levelData, upgradeType);
				if (upgradeType === 'speed') {
					const newSpeed = Math.floor(building.speed - (building.speed * .1));
					if (newSpeed >= levelData.speed) {
						building.setSpeed(newSpeed);
						building.upgrade.speed *= building.level;
						button.textContent = Utilities.FormatShortNumber(building.upgrade.speed);
						button.title = `Total cost: ${building.upgrade.speed}`;
						const span = li.querySelector('span');
						span.textContent = `Speed: ${building.speed}`;
					}
				}
			}
		}

	}

	update(statInformation) {
		const { position, building, deposit } = statInformation;
		this.clear();
		if (building) {
			this.#statInformation = statInformation;
			let p = document.createElement('p');
			p.textContent = `${position.toString()} - ${building.type.description}`;
			this.#dom.appendChild(p);
			if (!DistributionCenter.Has(building.type) && !Conveyor.Has(building.type)) {
				const ul = document.createElement('ul');
				ul.classList.add('information-stats');
				ul.appendChild(this.#buildInformationItem({ text: 'Speed', id: building.id, value: building.speed, buttonValue: building.upgrade.speed }));
				ul.appendChild(this.#buildInformationItem({ text: 'Level', id: building.id, value: building.level, buttonValue: Extractor.Level(building.type, building.level).cost }));
				ul.appendChild(this.#buildInformationItem({ text: 'Purity', id: building.id, value: building.purity, buttonValue: building.upgrade.purity }));
				this.#dom.appendChild(ul);
				return;
			}
		}
		if (deposit) {
			this.#statInformation = statInformation;
			let p = document.createElement('p');
			p.textContent = `${position.toString()} - ${deposit.type.description} deposit`;
			this.#dom.appendChild(p);
		}
	}

	clear() {
		this.#dom.replaceChildren();
		this.#statInformation = null;
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
		button.dataset.type = text.toLowerCase();
		button.textContent = Utilities.FormatShortNumber(buttonValue);
		button.title = `Total cost: ${buttonValue}`;
		li.appendChild(button);
		return li;
	}
}