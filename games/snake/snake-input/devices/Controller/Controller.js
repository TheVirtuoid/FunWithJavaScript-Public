import ControllerLayout from "./ControllerLayout/ControllerLayout.js";
import Device from "../Device/Device.js";
import Vector from "../../../snake-base/Vector/Base/Vector.js";


export default class Controller extends Device {
	/*static DRIVER_BROWSER = Symbol('driver-browser');
	static DRIVER_NODE = Symbol('driver-node'); // NOT IMPLEMENTED*/

	#layout;
	#input;
	#processControllerBinding;
	#processConnectedBinding;
	#controllerConnected;

	constructor(args = {}) {
		super(args);
		const { layout, input, vectorReference } = args;
		if (!(vectorReference?.prototype instanceof Vector)) {
			throw new Error(`'vectorReference' argument is required and must be a Vector reference`);
		}
		ControllerLayout.Setup(vectorReference);
		if (!ControllerLayout.IsType(layout)) {
			throw new Error(`'layout' argument is required and must be a ControllerLayout.`);
		}
		if (!(input.onInput)) {
			throw new Error(`'Input' argument is required and must be an Input instance.`);
		}
		this.#layout = layout;
		this.#input = input;
		this.#controllerConnected = null;
		// this.#processControllerBinding = this.#processController.bind(this);
		this.#processConnectedBinding = this.#processControllerConnected.bind(this);
		window.addEventListener('gamepadconnected', this.#processConnectedBinding);
	}

	get layout() {
		return this.#layout;
	}

	get input() {
		return this.#input;
	}

	get controllerConnected() {
		return this.#controllerConnected;
	}

	dispose() {
		document.removeEventListener('gamepadconnected', this.#processConnectedBinding);
	}

	#processControllerConnected(event) {
		this.#controllerConnected = event.gamepad.index;
	}

	update() {
		if (this.#controllerConnected !== null) {
			const controllerLayout = ControllerLayout.Get(this.layout);
			const gamepad = navigator.getGamepads()[this.controllerConnected];
			[...controllerLayout.entries()].forEach(([key, value]) => {
				const { action, direction } = value
				if (typeof(key) === 'string') {
					const button = gamepad.buttons[parseInt(key.substring(1))];
					if (button.pressed) {
						this.#input?.onInput({ action, direction });
					}
				} else {
					const dPad = Math.floor(Math.abs(gamepad.axes[9] * 100));
					if (dPad === key) {
						this.#input?.onInput({ action, direction });
					}
				}
			})
		}
	}

	/*#processController(event) {
		const { code } = event;
		const keyLayout = KeyboardLayout.Get(this.layout);
		const keyMapping = keyLayout.get(code);
		if (keyMapping) {
			this.#input?.onInput(keyMapping);
		}
	}*/
}