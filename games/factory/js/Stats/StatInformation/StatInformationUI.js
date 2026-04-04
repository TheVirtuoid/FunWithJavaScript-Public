import DistributionCenter from "../../DistributionCenter/DistributionCenter.js";
import Conveyor from "../../Conveyor/Conveyor.js";
import Utilities from "../../Utilities/Utilities.js";
import WorldData from "../../WorldData/WorldData.js";

export default class StatInformationUI {
	#dom;
	#statInformation;

	constructor(dom) {
		this.#dom = dom;
		this.#dom.addEventListener('click', this.#processUpgrade.bind(this));
	}

	start(statInformation) {
		this.#statInformation = statInformation;
	}

	#processUpgrade(event) {
		const button = event.target.closest('button');
		if (button) {
			const li = button.closest('li');
			const id = li.dataset.id;
			const building = this.#statInformation.building;
			if (building) {
				const baseData = WorldData.Base(building.type);
				const levelData = WorldData.Level(building.type, building.level);
				const upgradeType = button.dataset.type;
				if (upgradeType === 'speed') {
					this.#upgradeSpeed({ button, li, building, levelData, baseData });
				} else if (upgradeType === 'level') {
					this.#upgradeLevel({ button, li, building, levelData, baseData });
				} else if (upgradeType === 'purity') {
					this.#upgradePurity({ button, li, building, levelData, baseData });
				}
			}
		}
	}

	#getInformationSection(upgradeType) {
		const button = this.#dom.querySelector(`button[data-type="${upgradeType}"]`);
		if (button) {
			const li = button.closest('li');
			return { button, li };
		}
	}

	#upgradePurity(args) {
		const { button, li, building, levelData, baseData } = args;
		const newPurity = building.purity + (building.purity * .1);
		if (newPurity <= levelData.purity) {
			building.setPurity(newPurity);
			this.#renderPurity({ button, li, building, levelData, baseData });
		}
	}

	#renderPurity(args) {
		const { button, li, building, levelData, baseData } = args;
		const nextPurity = building.purity + (building.purity * .1);
		if (nextPurity > levelData.purity) {
			button.title = building.level === 5 ?  `You cannot upgrade purity anymore.` : `Advance to next level to upgrade purity.`;
			button.textContent = 'MAX';
			button.disabled = true;
		} else {
			building.upgrade.purity *= baseData.level;
			button.textContent = Utilities.FormatShortNumber(building.upgrade.purity);
			button.title = `Total cost: ${building.upgrade.purity}`;
			button.disabled = false;
		}
		const span = li.querySelector('span');
		span.textContent = `Purity: ${Utilities.FormatZeroToOne(building.purity)}`;
	}

	#upgradeSpeed(args) {
		const { button, li, building, levelData, baseData } = args;
		const newSpeed = Math.floor(building.speed - (building.speed * .1));
		if (newSpeed >= levelData.speed) {
			building.setSpeed(newSpeed);
			this.#renderSpeed({ button, li, building, levelData, baseData });
		}
	}

	#renderSpeed(args) {
		const { button, li, building, levelData, baseData } = args;
		const nextSpeed = Math.floor(building.speed - (building.speed * .1));
		if (nextSpeed < levelData.speed) {
			button.title = building.level === 5 ?  `You cannot upgrade speed anymore.` : `Advance to next level to upgrade speed.`;
			button.textContent = 'MAX';
			button.disabled = true;
		} else {
			building.upgrade.speed *= baseData.level;
			button.textContent = Utilities.FormatShortNumber(building.upgrade.speed);
			button.title = `Total cost: ${building.upgrade.speed}`;
			button.disabled = false;
		}
		const span = li.querySelector('span');
		span.textContent = `Speed: ${building.speed}`;
	}

	#upgradeLevel(args) {
		const { button, li, building, levelData, baseData } = args;
		if (building.level < 5) {
			building.incrementLevel();
			this.#renderLevel({ button, li, building, levelData, baseData });
		}
	}

	#renderLevel(args) {
		const { button, li, building, levelData, baseData } = args;
		if (building.level < 5) {
			const newCost = WorldData.Level(building.type, building.level).cost;
			button.textContent = Utilities.FormatShortNumber(newCost);
			button.title = `Total cost: ${newCost}`;
		} else {
			button.title = `You have reached the maximum level.`;
			button.textContent = 'MAX';
			button.disabled = true;
		}
		const span = li.querySelector('span');
		span.textContent = `Level: ${building.level}`;
		const newLevelData = WorldData.Level(building.type, building.level);
		let section = this.#getInformationSection('speed');
		if (section && building.speed) {
			this.#renderSpeed({ li: section.li, button: section.button, building, levelData: newLevelData, baseData });
		}
		section = this.#getInformationSection('purity');
		if (section) {
			this.#renderPurity({ li: section.li, button: section.button, building, levelData: newLevelData, baseData });
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
				if (building.speed !== Number.POSITIVE_INFINITY) {
					ul.appendChild(this.#buildInformationItem({ text: 'Speed', id: building.id, value: building.speed, buttonValue: building.upgrade.speed }));
				}
				ul.appendChild(this.#buildInformationItem({ text: 'Level', id: building.id, value: building.level, buttonValue: WorldData.Level(building.type, building.level).cost }));
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