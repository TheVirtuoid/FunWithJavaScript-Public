import GameEvent from "../GameEvent/GameEvent.js";

export default class Head {
	#position;
	#direction;
	#ui;
	#vectorFactory;
	#pitchDimensions;

	constructor(args = {}) {
		const { position, direction, ui } = args;
		this.#vectorFactory = GameEvent.Game().vectorFactory;
		this.#pitchDimensions = GameEvent.Game().pitchDimensions;
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

	move(speed = 1) {
		if (typeof speed !== 'number') {
			throw new Error(`'speed' argument must be a number`);
		}
		const additiveVector = this.#direction.multiply(this.#direction.fill(speed));
		this.#position = this.#position.add(additiveVector);
		GameEvent.Emit(GameEvent.SNAKE_MOVE, this.#position);
	}

	changeDirection(newDirection) {
		if (!(newDirection instanceof this.#vectorFactory)) {
			throw new Error(`'newDirection' argument must be an instance of Vector`);
		}
		if (this.#direction.opposite().equals(newDirection)) {
			throw new Error('Cannot change direction in the opposite direction');
		}
		this.#direction = newDirection.clone();
		GameEvent.Emit(GameEvent.SNAKE_DIRECTION_CHANGED, this.#direction);
	}

	jump(position, direction) {
		if (!(position instanceof this.#vectorFactory)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		if (!(direction instanceof this.#vectorFactory)) {
			throw new Error(`'direction' argument must be an instance of Vector`);
		}
		this.#position = position.clone();
		this.#direction = direction.clone();
		GameEvent.Emit(GameEvent.SNAKE_JUMPED, this.#position, this.#direction);
	}
}
