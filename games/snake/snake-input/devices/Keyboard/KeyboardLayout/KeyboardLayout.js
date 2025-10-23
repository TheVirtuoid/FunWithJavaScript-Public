import GameEvent from "../../../../snake-base/GameEvent/GameEvent.js";

let vector;
let wasd;
let arrow;

export default class KeyboardLayout {
	static LAYOUT_WASD = Symbol('layout-wasd');
	static LAYOUT_ARROW = Symbol('layout-arrow');

	static get WASD () {
		return wasd;
	}

	static get ARROW () {
		return arrow;
	}

	static Get(type) {
		if (type === KeyboardLayout.LAYOUT_WASD) {
			return wasd;
		} else if (type === KeyboardLayout.LAYOUT_ARROW) {
			return arrow;
		} else {
			return undefined;
		}
	}

	static IsType(type) {
		return [KeyboardLayout.LAYOUT_WASD, KeyboardLayout.LAYOUT_ARROW].includes(type);
	}

	static Setup(vectorConstructor) {
		vector = vectorConstructor;

		wasd = new Map([
			['KeyA', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Left() }],
			['KeyD', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Right() }],
			['KeyS', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Down() }],
			['KeyW', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Up() }],
			['KeyP', { action: GameEvent.DEVICE_GAME_PAUSE, direction: null }],
			['KeyR', { action: GameEvent.DEVICE_GAME_RESUME, direction: null }],
			['Escape', { action: GameEvent.DEVICE_GAME_EXIT, direction: null }]
		]);

		arrow = new Map([
			['ArrowLeft', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Left() }],
			['ArrowRight', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Right() }],
			['ArrowDown', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Down() }],
			['ArrowUp', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: vector.Up() }],
			['KeyP', { action: GameEvent.DEVICE_GAME_PAUSE, direction: null }],
			['KeyR', { action: GameEvent.DEVICE_GAME_RESUME, direction: null }],
			['Escape', { action: GameEvent.DEVICE_GAME_EXIT, direction: null }]
		]);
	}

	constructor() {
		throw new Error('KeyboardLayout is an abstract class and cannot be instantiated directly.');
	}
}