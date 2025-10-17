export default class Input {
	#id;
	#driver;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), driver } = args;
		if (!(driver instanceof Input)) {}
	}

	onChangeDirection() {
		throw new Error('You must implement the method onChangeDirection.');
	}

	onChangeSpeed() {
		throw new Error('You must implement the method onChangeSpeed.');
	}

	onGamePaused() {
		throw new Error('You must implement the method onGamePaused.');
	}

	onGameEnded() {
		throw new Error('You must implement the method onGameEnded.');
	}

	onGameResumed() {
		throw new Error('You must implement the method onGameResumed.');
	}

	onInput() {
		throw new Error('You must implement the method onInput.');
	}
}