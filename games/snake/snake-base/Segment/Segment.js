import GameEvent from "../GameEvent/GameEvent.js";

export default class Segment {
	#position;
	#direction;
	#vectorFactory;
	#id;

	constructor(args = {}) {
		this.#vectorFactory = GameEvent.Game().vectorFactory;
		const {
			position = this.#vectorFactory.Zero(),
			direction = this.#vectorFactory.Up(),
			id = window.crypto.randomUUID() } = args;
		if (!(position instanceof this.#vectorFactory)) {
			throw new Error(`'position' property must be an instance of Vector`);
		}
		if (!(direction instanceof this.#vectorFactory)) {
			throw new Error(`'direction' property must be an instance of Vector`);
		}
		this.#position = position.clone();
		this.#direction = direction.clone();
		this.#id = id;
	}

	get position() {
		return this.#position.clone();
	}

	get direction() {
		return this.#direction.clone();
	}

	get id() {
		return this.#id;
	}

	move(speed = 1) {
		const adder = this.#direction.multiply(this.#direction.fill(speed));
		this.#position = this.#position.add(adder);
	}

	changeDirection(newDirection) {
		if (!(newDirection instanceof this.#vectorFactory)) {
			throw new Error(`'newDirection' argument must be an instance of Vector`);
		}
		this.#direction = newDirection;
	}
}