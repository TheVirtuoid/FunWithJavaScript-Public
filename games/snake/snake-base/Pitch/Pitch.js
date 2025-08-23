import GameEvent from "../GameEvent/GameEvent.js";

export default class Pitch {
	#dimensions;
	#ui;
	#vectorFactory;
	#id;

	constructor(args = {}) {
		const { dimensions, ui, id = window.crypto.randomUUID() } = args;
		this.#vectorFactory = GameEvent.Game()?.vectorFactory;
		if (!(dimensions instanceof this.#vectorFactory)) {
			throw new Error(`'dimensions' property must be instance of VectorFactory`);
		}
		this.#ui = ui;
		this.#id = id;
		this.#dimensions = dimensions;
	}

	get dimensions() {
		return this.#dimensions.clone();
	}

	get id() {
		return this.#id;
	}

	collision(position) {
		if (!(position instanceof this.#vectorFactory)) {
			throw new Error(`'position' argument must be a vectorFactory instance`);
		}
		if (!this.#dimensions.inBounds(position)) {
			throw new Error(`'position' argument is outside the pitch`);
		}
		const collided = this.#dimensions.isPerimeter(position);
		if (collided) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_WALL);
		}
		return collided;
	}
}