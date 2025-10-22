import Device from "../devices/Device/Device.js";
import Vector from "../../snake-base/Vector/Base/Vector.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";

export default class Input {
	#id;
	#deviceReference;
	#vectorReference;
	#device;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), deviceReference, vectorReference, deviceData = {} } = args;
		const isVector = vectorReference?.prototype instanceof Vector;
		if (!isVector) {
			throw new Error(`'vectorReference' argument is required and must be a Vector class`);
		}
		const isDevice = deviceReference?.prototype instanceof Device;
		if (!isDevice) {
			throw new Error(`'deviceReference' argument is required and must be a Device class`);
		}
		this.#id = id;
		this.#deviceReference = deviceReference;
		this.#vectorReference = vectorReference;

		this.#device = new this.#deviceReference({ input: this, vectorReference: this.#vectorReference, layout: deviceData.layout });
	}

	get id() {
		return this.#id;
	}

	dispose() {
		if (this.#device) {
			this.#device.dispose();
		}
	}

	onInput(eventData) {
		const { action, direction } = eventData;
		if (direction) {
			this.#onChangeDirection(direction);
		}
	}

	#onChangeDirection(direction) {
		GameEvent.Emit(GameEvent.INPUT_CHANGE_DIRECTION, { id: this.id, direction });
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