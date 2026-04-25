import GameEvent from "../../../../snake-base/GameEvent/GameEvent.js";

let vector;
let gamepad;

export default class ControllerLayout {
	static LAYOUT_GAMEPAD = Symbol('layout-gamepad');

	static get GAMEPAD () {
		return gamepad;
	}

	static Get(type) {
		return gamepad;
	}

	static IsType(type) {
		return [ControllerLayout.LAYOUT_GAMEPAD].includes(type);
	}

	static Setup(vectorConstructor) {
		vector = vectorConstructor;

		gamepad = new Map([
			[71, { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Left() }],
			[42, { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Right() }],
			[14, { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Down() }],
			[100, { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Up() }],
			['B3', { action: GameEvent.DEVICE_GAME_PAUSE, direction: null }],
			['B1', { action: GameEvent.DEVICE_GAME_RESUME, direction: null }],
			['B0', { action: GameEvent.DEVICE_GAME_EXIT, direction: null }]
		]);
	}

	constructor() {
		throw new Error('ControllerLayout is an abstract class and cannot be instantiated directly.');
	}
}