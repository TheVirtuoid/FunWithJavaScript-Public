export default class ActionButtons {
	#id;
	#buttons;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID()} = args;
		this.#id = id;
		this.#buttons = new Map();
	}

	get id() {
		return this.#id;
	}

	addButton(args = {}) {
		const { type, label, action, disabled = false, hidden = false } = args;
		if (type === undefined) {
			throw new Error(`'type' argument is required`);
		}
		if (typeof label !== 'string' || label === '') {
			throw new Error(`'label' argument must be a non-empty string`);
		}
		if (typeof action !== 'function') {
			throw new Error(`'action' argument must be a function`);
		}
		this.#buttons.set(type, { label, action, disabled, hidden });
	}

	getButton(type) {
		const button = this.#buttons.get(type);
		let returnedButton = undefined;
		if (button) {
			returnedButton = { ...button };
			returnedButton.type = type;
		}
		return returnedButton;
	}

	removeButton(type) {
		this.#buttons.delete(type);
	}

	setButtonAction(type, action) {
		if (typeof action !== 'function') {
			throw new Error(`'action' argument must be a function`);
		}
		const button = this.#buttons.get(type);
		if (button) {
			button.action = action;
		}
	}

	setDisabled(type, disabled) {
		if (typeof disabled !== 'boolean') {
			throw new Error(`'disabled' argument must be a boolean`);
		}
		const button = this.#buttons.get(type);
		if (button) {
			button.disabled = disabled;
		}
	}

	setHidden(type, hidden) {
		if (typeof hidden !== 'boolean') {
			throw new Error(`'hidden' argument must be a boolean`);
		}
		const button = this.#buttons.get(type);
		if (button) {
			button.hidden = hidden;
		}
	}

	setClassList(type, classList) {
		if (!Array.isArray(classList)) {
			throw new Error(`'classList' argument must be an Array of Strings`);
		}
		const button = this.#buttons.get(type);
		if (button) {
			button.classList = classList;
		}
	}
}