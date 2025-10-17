import KeyboardLayout from "./KeyboardLayout/KeyboardLayout.js";
import Input from "../../Input/Input.js";
import Device from "../Device.js";

export default class Keyboard extends Device {
	static DRIVER_BROWSER = Symbol('driver-browser');
	static DRIVER_NODE = Symbol('driver-node'); // NOT IMPLEMENTED

	#layout;
	#driver;
	#input;

	constructor(args = {}) {
		super(args);
		const { driver = Keyboard.DRIVER_BROWSER, layout } = args;
		if (!KeyboardLayout.IsType(layout)) {
			throw new Error(`'layout' argument is required and must be a KeyboardLayout.`);
		}
		this.#layout = layout;
		this.#driver = driver;
		this.#input = null;
		if (this.driver === Keyboard.DRIVER_BROWSER) {
			document.addEventListener('keydown', this.#processKeystroke.bind(this));
		}
	}

	get layout() {
		return this.#layout;
	}

	get driver() {
		return this.#driver;
	}

	get input() {
		return this.#input;
	}

	setInput(input) {
		if (!(input instanceof Input)) {
			throw new Error(`'input' argument must be an instance of Input`);
		}
		this.#input = input;
	}

	#processKeystroke(event) {
		const { code } = event;
		const keyMapping = this.layout.get(code);
		if (keyMapping) {
			this.#input.onInput(keyMapping);
		}
	}
}