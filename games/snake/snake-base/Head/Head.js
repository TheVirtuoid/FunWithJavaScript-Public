import GameEvent from "../GameEvent/GameEvent.js";

export default class Head {
	#position;
	#direction;
	#ui;
	#game;

	constructor(args = {}) {
		const { position, direction, ui, game } = args;

		if (!game) {
			throw new Error(`'game' property must be specified`);
		}

		this.#game = game;
		this.#position = position || this.#game.vectorFactory.Zero();
		this.#direction = direction || this.#game.vectorFactory.Up();
		this.#ui = ui;
	}

	get position() {
		return this.#position;
	}

	get direction() {
		return this.#direction;
	}

	move(speed = 1) {
		if (typeof speed !== 'number') {
			throw new Error(`'speed' argument must be a number`);
		}
		const additiveVector = this.#direction.multiply(this.#direction.fill(speed));
		this.#position = this.#position.add(additiveVector);
		this.#game.emit(GameEvent.SNAKE_MOVE, this.#position);
	}
}
