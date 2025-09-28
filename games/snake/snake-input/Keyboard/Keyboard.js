import KeyboardLayout from "../KeyboardLayout/KeyboardLayout.js";

export default class Keyboard {
	static DRIVER_BROWSER = Symbol('driver-browser');
	static DRIVER_NODE = Symbol('driver-node'); // NOT IMPLEMENTED

	#id;
	#layout;
	#driver;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), driver = Keyboard.DRIVER_BROWSER, layout } = args;
		if (!KeyboardLayout.IsType(layout)) {
			throw new Error(`'layout' argument is required and must be a KeyboardLayout.`);
		}
		this.#id = id;
		this.#layout = layout;
		this.#driver = driver;
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
		const { key } = event;
		console.log(key);
	}
}