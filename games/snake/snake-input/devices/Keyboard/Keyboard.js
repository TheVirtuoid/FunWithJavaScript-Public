import KeyboardLayout from "./KeyboardLayout/KeyboardLayout.js";
import Input from "../../Input/Input.js";
import Device from "../Device/Device.js";
import Vector from "../../../snake-base/Vector/Base/Vector.js";


export default class Keyboard extends Device {
	static DRIVER_BROWSER = Symbol('driver-browser');
	static DRIVER_NODE = Symbol('driver-node'); // NOT IMPLEMENTED

	#layout;
	#driver;
	#input;
	#processKeystrokeBinding;

	constructor(args = {}) {
		super(args);
		const { driver = Keyboard.DRIVER_BROWSER, layout, input, vectorReference } = args;
		if (!(vectorReference?.prototype instanceof Vector)) {
			throw new Error(`'vectorReference' argument is required and must be a Vector reference`);
		}
		KeyboardLayout.Setup(vectorReference);
		if (!KeyboardLayout.IsType(layout)) {
			throw new Error(`'layout' argument is required and must be a KeyboardLayout.`);
		}
		if (!(input.onInput)) {
			throw new Error(`'Input' argument is required and must be an Input instance.`);
		}
		this.#layout = layout;
		this.#driver = driver;
		this.#input = input;
		this.#processKeystrokeBinding = this.#processKeystroke.bind(this);
		if (this.driver === Keyboard.DRIVER_BROWSER) {
			document.addEventListener('keydown', this.#processKeystrokeBinding);
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

	dispose() {
		document.removeEventListener('keydown', this.#processKeystrokeBinding);
	}

	#processKeystroke(event) {
		const { code } = event;
		const keyLayout = KeyboardLayout.Get(this.layout);
		const keyMapping = keyLayout.get(code);
		if (keyMapping) {
			this.#input?.onInput(keyMapping);
		}
	}
}