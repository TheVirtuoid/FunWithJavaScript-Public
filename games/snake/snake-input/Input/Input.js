import Device from "../devices/Device/Device.js";

export default class Input {
	#id;
	#device;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID() } = args;
		this.#id = id;
		this.#device = null;
	}

	get id() {
		return this.#id;
	}

	get device() {
		return this.#device;
	}

	setDevice(device) {
		if (!(device instanceof Device)) {
			throw new Error('Device must be an instance of Device class.');
		}
		this.#device = device;
	}

	onInput() {
		throw new Error('You must implement the method onInput.');
	}

	#onChangeDirection() {
		throw new Error('You must implement the method onChangeDirection.');
	}

	#onChangeSpeed() {
		throw new Error('You must implement the method onChangeSpeed.');
	}

	#onGamePaused() {
		throw new Error('You must implement the method onGamePaused.');
	}

	#onGameEnded() {
		throw new Error('You must implement the method onGameEnded.');
	}

	#onGameResumed() {
		throw new Error('You must implement the method onGameResumed.');
	}

}