import GameEvent from "../GameEvent/GameEvent.js";
import Vector from "../Vector/Base/Vector.js";

export default class Head {
	#position;
	#direction;
	#ui;

	constructor(args = {}) {
		const { position, direction, ui } = args;
		if (!(position instanceof Vector)) {
			throw new Error(`'position' property must be an instance of Vector`);
		}
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' property must be an instance of Vector`);
		}
		this.#position = position;
		this.#direction = direction;
		this.#ui = ui;
	}

	get position() {
		return this.#position.clone();
	}

	get direction() {
		return this.#direction.clone();
	}

	move(speed = 1) {
		this.#position = this.getProjectedPosition(speed);
		GameEvent.Emit(GameEvent.SNAKE_MOVE, this.#position);
	}

	changeDirection(newDirection) {
		if (!(newDirection instanceof Vector)) {
			throw new Error(`'newDirection' argument must be an instance of Vector`);
		}
		if (this.#direction.opposite().equals(newDirection)) {
			throw new Error('Cannot change direction in the opposite direction');
		}
		this.#direction = newDirection.clone();
		GameEvent.Emit(GameEvent.SNAKE_DIRECTION_CHANGED, this.#direction);
	}

	jump(position, direction) {
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' argument must be an instance of Vector`);
		}
		this.#position = position.clone();
		this.#direction = direction.clone();
		GameEvent.Emit(GameEvent.SNAKE_JUMPED, this.#position, this.#direction);
	}

	getProjectedPosition(speed = 1) {
		if (typeof speed !== 'number') {
			throw new Error(`'speed' argument must be a number`);
		}
		const additiveVector = this.#direction.multiply(this.#direction.fill(speed));
		return this.#position.add(additiveVector);
	}
}
