import CardType from "../enums/CardType.js";
import CardUpgradeType from "../enums/CardUpgradeType.js";
import CardUi from "./Ui/Card.js";

export default class Card {
	#type;
	#title;
	#description;
	#upgradeAmount;
	#level;
	#ui;
	#position;
	#scene;

	constructor(args = {}) {
		const { scene, position, title, type, upgradeAmount, description, level } = args;

		this.#type = type;
		this.#upgradeAmount = upgradeAmount;
		this.#type = type;
		this.#description = description;
		this.#title = title;
		this.#level = level;
		this.#position = position;
		this.#scene = scene;
		this.#ui = new CardUi({ scene: this.#scene, position: this.#position, title: this.#title, description: this.#description, level, parent: this });
		this.#ui.create();
	}

	get type() {
		return this.#type;
	}

	get upgradeAmount() {
		return this.#upgradeAmount;
	}

	get description() {
		return this.#description;
	}

	get title() {
		return this.#title;
	}

	get level() {
		return this.#level;
	}

	get position() {
		return this.#position;
	}

	remove() {
		this.#ui.remove();
	}

}