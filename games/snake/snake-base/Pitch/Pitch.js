import GameEvent from "../GameEvent/GameEvent.js";
import Vector from "../Vector/Base/Vector.js";

export default class Pitch {
	#dimensions;
	#id;

	constructor(args = {}) {
		const { dimensions, ui, id = window.crypto.randomUUID() } = args;
		if (!(dimensions instanceof Vector)) {
			throw new Error(`'dimensions' property must be a Vector`);
		}
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
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be a Vector instance`);
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