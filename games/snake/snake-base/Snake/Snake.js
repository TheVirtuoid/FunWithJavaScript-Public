import Head from "../Head/Head.js";
import Vector from "../Vector/Base/Vector.js";
import Body from "../Body/Body.js";

export default class Snake {
	#id;
	#ui;
	#head;
	#body;

	constructor(args = {}) {
		const { position, direction, id = window.crypto.randomUUID() } = args;
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' property must be an instance of Vector`);
		}
		if (!(position instanceof Vector)) {
			throw new Error(`'position' property must be an instance of Vector`);
		}
		this.#id = id;
		this.#head = new Head({ position, direction });
		this.#body = new Body();
	}

	get id() {
		return this.#id;
	}

	get position() {
		return this.#head.position.clone();
	}

	get direction() {
		return this.#head.direction.clone();
	}

	get numberOfBodySegments() {
		return this.#body.numberOfSegments;
	}

	growBody(position, direction) {
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' argument must be an instance of Vector`);
		}
		this.#body.grow(position, direction);
	}

	getBodySegmentAt(index) {
		return this.#body.getSegmentAt(index);
	}

	move(speed = 1) {
		let position = this.#head.position;
		let newDirection = this.#head.direction;
		this.#head.move(speed);
		for (let i = 0; i < this.#body.numberOfSegments; i++) {
			const segment = this.#body.getSegmentAt(i);
			const previousSegmentDirection = segment.direction;
			segment.move(speed);
			segment.changeDirection(newDirection);
			newDirection = previousSegmentDirection;
		}
	}

	changeDirection(direction) {
		this.#head.changeDirection(direction);
	}
}