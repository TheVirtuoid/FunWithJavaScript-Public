import DistributionCenter from "../../DistributionCenter/DistributionCenter.js";
import Conveyor from "../../Conveyor/Conveyor.js";
import Utilities from "../../Utilities/Utilities.js";
import WorldData from "../../WorldData/WorldData.js";
import GameEvent from "../../GameEvent/GameEvent.js";
import Combinator from "../../Combinator/Combinator.js";

export default class StatInformationUI {
	#dom;
	#statInformation;
	#availableCash;

	constructor(dom) {
		this.#dom = dom;
		this.#availableCash = 0;
		this.#dom.addEventListener('click', this.#processUpgrade.bind(this));
	}

	start(statInformation) {
		this.#statInformation = statInformation;
	}

	removeBuilding() {
		this.clear();
	}

	#processUpgrade(event) {
		const button = event.target.closest('button');
		if (button) {
			const li = button.closest('li');
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
				} else if (upgradeType === 'clearInventory') {
					this.#clearCombinatorInventory();
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
			GameEvent.Emit(GameEvent.STAT_CASH, -building.upgrade.purity);
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
			button.disabled = building.upgrade.purity > this.#availableCash;
		}
		const span = li.querySelector('span');
		span.textContent = `Purity: ${Utilities.FormatZeroToOne(building.purity)}`;
	}

	#upgradeSpeed(args) {
		const { button, li, building, levelData, baseData } = args;
		const newSpeed = Math.floor(building.speed - (building.speed * .1));
		if (newSpeed >= levelData.speed) {
			building.setSpeed(newSpeed);
			GameEvent.Emit(GameEvent.STAT_CASH, -building.upgrade.speed);
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
			button.disabled = building.upgrade.speed > this.#availableCash;
		}
		const span = li.querySelector('span');
		span.textContent = `Speed: ${building.speed}`;
	}

	#upgradeLevel(args) {
		const { button, li, building, levelData, baseData } = args;
		if (building.level < 5) {
			const oldCost = WorldData.Level(building.type, building.level).cost;
			GameEvent.Emit(GameEvent.STAT_CASH, -oldCost);
			building.incrementLevel();
			this.#renderLevel({ button, li, building, levelData, baseData });
		}
	}

	#renderLevel(args) {
		const { button, li, building, baseData } = args;
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
			const levelData = WorldData.Level(building.type, building.level);
			let p = document.createElement('p');
			p.textContent = `${position.toString()} - ${building.type.description}`;
			this.#dom.appendChild(p);
			if (!DistributionCenter.Has(building.type) && !Conveyor.Has(building.type)) {
				const ul = document.createElement('ul');
				const buildingUpgradeSpeed = levelData.speed > building.speed - (building.speed * .1) ? Number.NEGATIVE_INFINITY : building.upgrade.speed;
				const buildingUpgradePurity = levelData.purity < building.purity - (building.purity * .1) ? Number.NEGATIVE_INFINITY : building.upgrade.purity;
				console.log(buildingUpgradePurity, levelData.purity, building.purity, building.upgrade.purity);
				ul.classList.add('information-stats');
				if (building.speed !== Number.POSITIVE_INFINITY) {
					ul.appendChild(this.#buildInformationItem({ text: 'Speed', id: building.id, value: building.speed, buttonValue: buildingUpgradeSpeed, format: 'number', level: building.level }));
				}
				ul.appendChild(this.#buildInformationItem({ text: 'Level', id: building.id, value: building.level, buttonValue: WorldData.Level(building.type, building.level).cost, format: 'number', level: building.level }));
				ul.appendChild(this.#buildInformationItem({ text: 'Purity', id: building.id, value: building.purity, buttonValue: buildingUpgradePurity, format: 'zeroToOne', level: building.level }));
				this.#dom.appendChild(ul);
				if (Combinator.Has(building.type)) {
					p = document.createElement('p');
					let span = document.createElement('span');
					span.dataset.id = 'inventoryFullPercentage';
					const inventoryFullPercentage = Math.min(building.inventoryFullPercentage * 100, 100);
					span.textContent = `Inventory: ${Utilities.FormatShortNumber(inventoryFullPercentage)}%`;
					p.appendChild(span);
					const button = document.createElement('button');
					button.classList.add('tertiary', 'small', 'thin');
					button.textContent = 'Clear Inventory';
					button.dataset.type = 'clearInventory';
					p.appendChild(button);
					this.#dom.appendChild(p);
				}
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

	#clearCombinatorInventory() {
		if (this.#statInformation) {
			const { building } = this.#statInformation;
			if (Combinator.Has(building.type)) {
				building.clearInventory();
				this.updateCombinatorInformation();
			}
		}
	}

	#buildInformationItem(item) {
		const { text, value, id, buttonValue, format, level } = item;
		const li = document.createElement('li');
		li.dataset.id = id;
		const span = document.createElement('span');
		let formattedNumber;
		if (format === 'number') {
			formattedNumber = Utilities.FormatShortNumber(value);
		} else if (format === 'zeroToOne') {
			formattedNumber = Utilities.FormatZeroToOne(value);
		}
		span.textContent = `${text}: ${formattedNumber}`;
		li.appendChild(span);
		const button = document.createElement('button');
		button.classList.add('tertiary', 'small', 'thin');
		button.dataset.type = text.toLowerCase();
		if (buttonValue === Number.NEGATIVE_INFINITY) {
			button.disabled = true;
			button.textContent = 'MAX';
			button.title = level === 5 ? 'You cannot upgrade anymore' : 'You must upgrade your Level first';
		} else {
			button.textContent = buttonValue === Number.NEGATIVE_INFINITY ? 'MAX' : Utilities.FormatShortNumber(buttonValue);
			button.title = level === 5 ? 'You cannot upgrade anymore' : `Total cost: ${buttonValue}`;
			button.disabled = buttonValue === Number.NEGATIVE_INFINITY ? true : buttonValue > this.#availableCash;
		}
		li.appendChild(button);
		return li;
	}

	updateCombinatorInformation() {
		if (this.#statInformation) {
			const { building } = this.#statInformation;
			if (building && Combinator.Has(building.type)) {
				this.#dom.querySelector('span[data-id="inventoryFullPercentage"]').textContent = `Inventory: ${Utilities.FormatShortNumber(building.inventoryFullPercentage * 100)}%`;
			}
		}
	}

	updateAvailability(cashAvailable) {
		this.#availableCash = cashAvailable;
		if (this.#statInformation) {
			const { building } = this.#statInformation;
			if (building && !Conveyor.Has(building.type)) {
				let section = this.#getInformationSection('speed');
				section.button.disabled = building.upgrade.speed > cashAvailable;
				section = this.#getInformationSection('level');
				const levelData = WorldData.Level(building.type, building.level);
				section.button.disabled = levelData.cost > cashAvailable;
				section = this.#getInformationSection('purity');
				section.button.disabled = building.upgrade.purity > cashAvailable;
			}
		}
	}
}