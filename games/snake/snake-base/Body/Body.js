import Segment from './../Segment/Segment.js';
import Vector from "../Vector/Base/Vector.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class Body {
	#segments;
	#id;

	constructor(args = {}) {
		const { segments = [], id = window.crypto.randomUUID() } = args;
		this.#segments = segments.map(segment => segment);
		this.#id = id;
	}

	get length() {
		return this.#segments.length;
	}

	get id() {
		return this.#id;
	}

	get segments() {
		return this.#segments.map(segment => segment.position.clone());
	}

	getSegmentAt(index) {
		if (index < 0 || index >= this.#segments.length) {
			return undefined;
		}
		return this.#segments[index];
	}

	grow(args = {}) {
		const { position, direction } = args;
		const newSegment = new Segment({ position, direction });
		this.#segments.unshift(newSegment);
	}

	collision(position) {
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		const collided = this.#segments.some(segment => segment.position.equals(position));
		if (collided) {
			GameEvent.Emit(GameEvent.SNAKE_COLLISION_SELF);
		}
		return collided;
	}

}