let vector;
let wasd;
let arrow;

export default class KeyboardLayout {
	static UP = Symbol('up');
	static DOWN = Symbol('down');
	static LEFT = Symbol('left');
	static RIGHT = Symbol('right');
	static PAUSE = Symbol('pause');
	static RESUME = Symbol('resume');
	static EXIT = Symbol('exit');

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
			['KeyA', { action: KeyboardLayout.LEFT, direction: vector.Left() }],
			['KeyD', { action: KeyboardLayout.RIGHT, direction: vector.Right() }],
			['KeyS', { action: KeyboardLayout.DOWN, direction: vector.Down() }],
			['KeyW', { action: KeyboardLayout.UP, direction: vector.Up() }],
			['KeyP', { action: KeyboardLayout.PAUSE, direction: null }],
			['KeyR', { action: KeyboardLayout.RESUME, direction: null }],
			['Escape', { action: KeyboardLayout.EXIT, direction: null }]
		]);

		arrow = new Map([
			['ArrowLeft', { action: KeyboardLayout.LEFT, direction: vector.Left() }],
			['ArrowRight', { action: KeyboardLayout.RIGHT, direction: vector.Right() }],
			['ArrowDown', { action: KeyboardLayout.DOWN, direction: vector.Down() }],
			['ArrowUp', { action: KeyboardLayout.UP, direction: vector.Up() }],
			['KeyP', { action: KeyboardLayout.PAUSE, direction: null }],
			['KeyR', { action: KeyboardLayout.RESUME, direction: null }],
			['Escape', { action: KeyboardLayout.EXIT, direction: null }]
		]);
	}

	constructor() {
		throw new Error('KeyboardLayout is an abstract class and cannot be instantiated directly.');
	}
}