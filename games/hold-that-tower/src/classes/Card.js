import CardType from "../enums/CardType.js";
import CardUpgradeType from "../enums/CardUpgradeType.js";

export default class Card {
	#type;
	#upgradeAmount;
	#upgradeType;
	#description;
	#title;
	#ui;

	constructor(args = {}) {
		const { target, title, type, upgradeAmount, upgradeType, upgradeCalculation, description } = args;

		if (!CardType.TYPES.includes(type)) {
			throw new Error('Invalid card type');
		}
		if (typeof upgradeAmount !== 'number') {
			throw new Error('Upgrade amount must be specified');
		}
		if (!CardUpgradeType.TYPES.includes(upgradeType)) {
			throw new Error('Invalid upgrade type');
		}
		if (typeof upgradeCalculation !== 'function') {
			throw new Error('Upgrade calculation must be a function');
		}
		if (typeof description !== 'string' || !description) {
			throw new Error('Description must be a non-empty string');
		}

		this.#type = type;
		this.#upgradeAmount = upgradeAmount;
		this.#upgradeType = upgradeType;
		this.#upgradeCalculation = upgradeCalculation;
		this.#description = description;
		this.#title = title;
	}

	get type() {
		return this.#type;
	}

	get upgradeAmount() {
		return this.#upgradeAmount;
	}

	get upgradeType() {
		return this.#upgradeType;
	}

	get upgradeCalculation() {
		return this.#upgradeCalculation;
	}

	get description() {
		return this.#description;
	}

	get title() {
		return this.#title;
	}

}