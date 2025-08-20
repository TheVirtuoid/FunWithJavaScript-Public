export default class Head {
	#position;
	#direction;
	#ui;
	#vectorFactory;
	#game;

	constructor(args = {}) {
		const { position, direction, ui, vectorFactory, game } = args;

		if (!game) {
			throw new Error(`'game' property must be specified`);
		}
		if (!vectorFactory) {
			throw new Error(`'vectorFactory' property must be specified`);
		}

		this.#game = game;
		this.#vectorFactory = vectorFactory;
		this.#position = position || this.#vectorFactory.Zero();
		this.#direction = direction || this.#vectorFactory.Up();
		this.#ui = ui;
	}

	get position() {
		return this.#position;
	}

	get direction() {
		return this.#direction;
	}
}
