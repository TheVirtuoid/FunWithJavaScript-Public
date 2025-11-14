export default class ActionButton {
	#id;
	#label;
	#action;
	#disabled;
	#hidden;
	#classList;

	constructor(args) {
		const { id = window.crypto.randomUUID(), label, action, disabled = false, hidden = false, classList = [] } = args;
		this.#id = id;
		try {
			this.setLabel(label);
			this.setAction(action);
			this.setHidden(hidden);
			this.setDisabled(disabled);
			this.setClassList(classList);
		} catch (error) {
			throw(error);
		}
	}
	get id() {
		return this.#id;
	}
	get label() {
		return this.#label;
	}
	get action() {
		return this.#action;
	}
	get disabled() {
		return this.#disabled;
	}
	get hidden() {
		return this.#hidden;
	}
	get classList() {
		return this.#classList;
	}

	setLabel(label) {
		if (typeof label !== 'string' || label === '') {
			throw new Error(`'label' argument must be a non-empty string`);
		}
		this.#label = label;
	}

	setHidden(hidden) {
		if (typeof hidden !== 'boolean') {
			throw new Error(`'hidden' argument must be a boolean`);
		}
		this.#hidden = hidden;
	}

	setDisabled(disabled) {
		if (typeof disabled !== 'boolean') {
			throw new Error(`'disabled' argument must be a boolean`);
		}
		this.#disabled = disabled;
	}

	setAction(action) {
		if (typeof action !== 'function') {
			throw new Error(`'action' argument must be a function`);
		}
		this.#action = action;
	}

	setClassList(classList) {
		if (!Array.isArray(classList)) {
			throw new Error(`'classList' argument must be an Array of Strings`);
		}
		this.#classList = classList;
	}
}