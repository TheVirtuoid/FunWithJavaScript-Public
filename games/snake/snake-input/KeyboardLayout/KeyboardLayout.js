let vector;

export default class KeyboardLayout {
	static UP = Symbol('up');
	static DOWN = Symbol('down');
	static LEFT = Symbol('left');
	static RIGHT = Symbol('right');
	static PAUSE = Symbol('pause');
	static RESUME = Symbol('resume');
	static EXIT = Symbol('exit');

	static get WASD () {
		return new Map([
				['KeyA', { action: KeyboardLayout.LEFT, direction: vector.Left() }],
				['KeyD', { action: KeyboardLayout.RIGHT, direction: vector.Right() }],
				['KeyS', { action: KeyboardLayout.DOWN, direction: vector.Down() }],
				['KeyW', { action: KeyboardLayout.UP, direction: vector.Up() }],
				['KeyP', { action: KeyboardLayout.PAUSE, direction: null }],
				['KeyR', { action: KeyboardLayout.RESUME, direction: null }],
				['Escape', { action: KeyboardLayout.EXIT, direction: null }]
			]);
	}

	static get ARROW () {
		return new Map([
			['ArrowLeft', { action: KeyboardLayout.LEFT, direction: vector.Left() }],
			['ArrowRight', { action: KeyboardLayout.RIGHT, direction: vector.Right() }],
			['ArrowDown', { action: KeyboardLayout.DOWN, direction: vector.Down() }],
			['ArrowUp', { action: KeyboardLayout.UP, direction: vector.Up() }],
			['KeyP', { action: KeyboardLayout.PAUSE, direction: null }],
			['KeyR', { action: KeyboardLayout.RESUME, direction: null }],
			['Escape', { action: KeyboardLayout.EXIT, direction: null }]
		]);
	}

	static Setup(vectorConstructor) {
		vector = vectorConstructor;
	}

	constructor() {
		throw new Error('KeyboardLayout is an abstract class and cannot be instantiated directly.');
	}
}