export default class Game {
	#vectorFactory;
	#pitch;
	#snake;
	#ui;

	constructor(args = {}) {
		const { vectorFactory, ui } = args;

		if (!vectorFactory) {
			throw new Error(`'vectorFactory' property must be specified`);
		}

		this.#vectorFactory = vectorFactory;
		this.#ui = ui;
	}

	get vectorFactory() {
		return this.#vectorFactory;
	}

	emit(event, ...data) {
		if (typeof event !== 'string') {
			throw new Error(`'event' argument must be a string`);
		}
	}

}