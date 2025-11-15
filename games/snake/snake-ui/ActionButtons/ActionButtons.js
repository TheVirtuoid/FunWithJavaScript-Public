import ActionButton from "../ActionButton/ActionButton.js";

export default class ActionButtons {
	#id;
	#buttons;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID()} = args;
		this.#id = id;
		this.#buttons = new Set();
	}

	get id() {
		return this.#id;
	}

	addButton(button) {
		if (!(button instanceof ActionButton)) {
			throw new Error(`'button' argument must be an instance of ActionButton`);
		}
		this.#buttons.add(button);
	}

	removeButton(button) {
		if (!(button instanceof ActionButton)) {
			throw new Error(`'button' argument must be an instance of ActionButton`);
		}
		this.#buttons.delete(button);
	}

	getButtons() {
		return [...this.#buttons.values()];
	}

}