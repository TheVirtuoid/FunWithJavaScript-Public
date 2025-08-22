import Vector from "../Vector/Base/Vector.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class Pitch {
	#dimensions;
	#game;
	#ui;

	constructor(args = {}) {
		const { dimensions, game, ui } = args;
		if (!game) {
			throw new Error(`'game' property must be specified`);
		}
		if (!(dimensions instanceof vectorFactory)) {
			throw new Error(`'dimensions' property must be instance of VectorFactory`);
		}
		this.#game = game;
		this.#ui = ui;
		this.#dimensions = dimensions;
	}

	get dimensions() {
		return this.#dimensions.clone();
	}

	get #vectorFactory() {
		return this.#game.vectorFactory;
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
			this.#game.emit(GameEvent.SNAKE_COLLISION_WALL);
		}
		return collided;
	}
}