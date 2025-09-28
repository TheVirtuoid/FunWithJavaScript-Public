import KeyboardLayout from "../KeyboardLayout/KeyboardLayout.js";
import Input from "../Input/Input.js";

export default class Keyboard {
	static DRIVER_BROWSER = Symbol('driver-browser');
	static DRIVER_NODE = Symbol('driver-node'); // NOT IMPLEMENTED

	#id;
	#layout;
	#driver;
	#input;

	constructor(args = {}) {
		const { input, id = window.crypto.randomUUID(), driver = Keyboard.DRIVER_BROWSER, layout } = args;
		if (!KeyboardLayout.IsType(layout)) {
			throw new Error(`'layout' argument is required and must be a KeyboardLayout.`);
		}
		if (!(input instanceof Input)) {
			throw new Error(`'input' argument is required and must be a Input.`);
		}
		this.#id = id;
		this.#layout = layout;
		this.#driver = driver;
		this.#input = input;
		if (this.driver === Keyboard.DRIVER_BROWSER) {
			document.addEventListener('keydown', this.#processKeystroke.bind(this));
		}
	}

	get id() {
		return this.#id;
	}

	get layout() {
		return this.#layout;
	}

	get driver() {
		return this.#driver;
	}

	#processKeystroke(event) {
		const { code } = event;
		const keyMapping = this.layout.get(code);
		if (keyMapping) {
			this.#input.onInput(keyMapping);
		}
	}
}