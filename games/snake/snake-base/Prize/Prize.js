import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";
import PrizeType from "./PrizeType.js";
import Vector from "../Vector/Base/Vector.js";

export default class Prize {
	#id;
	#type;
	#value;
	#pitch;
	#snake;
	#position;

	constructor(args = {}) {
		const { id = window.crypto.randomUUID(), type = PrizeType.DEFAULT_TYPE, value = PrizeType.DEFAULT_VALUE, pitch, snake } = args;
		if (!(pitch instanceof Pitch)) {
			throw new Error(`'pitch' argument must be an instance of Pitch`);
		}
		if (!(snake instanceof Snake)) {
			throw new Error(`'snake' argument must be an instance of Snake`);
		}
		if (!PrizeType.TYPES.includes(type)) {
			throw new Error(`'type' argument must be a valid PrizeType`);
		}
		this.#id = id;
		this.#type = type;
		this.#value = value;
		this.#pitch = pitch;
		this.#snake = snake;
		this.#setPosition();
	}

	static Random(args = {}) {
		const { pitch, snake } = args;
		const type = PrizeType.TYPES[Math.floor(Math.random() * PrizeType.TYPES.length)];
		const value = PrizeType.VALUES[type][Math.floor(Math.random() * PrizeType.VALUES[type].length)];
		return new Prize({ pitch, snake, type, value });
	}

	get id() {
		return this.#id;
	}

	get type() {
		return this.#type;
	}

	get value() {
		return this.#value;
	}

	get position() {
		return this.#position.clone();
	}

	collision(position) {
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		return position.equals(this.#position);
	}

	#setPosition() {
		let passed = false;
		let position = null;
		let stopGap = 500;		// do not try more than 100 times to find a position
		while (!passed && stopGap > 0) {
			passed = true;
			position = this.#pitch.dimensions.random(this.#pitch.dimensions);
			passed &= !this.#pitch.collision(position);
			passed &= !this.#snake.collision(position);
			stopGap--;
		}
		this.#position = !!passed ? position : null;
	}

}