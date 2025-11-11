import Head from "../Head/Head.js";
import Vector from "../Vector/Base/Vector.js";
import Body from "../Body/Body.js";
import GameEvent from "../GameEvent/GameEvent.js";

export default class Snake {
	#id;
	#ui;
	#head;
	#body;
	#speed;

	constructor(args = {}) {
		const { position, direction, speed = 1, id = window.crypto.randomUUID(), length = 0 } = args;
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' property must be an instance of Vector`);
		}
		if (!(position instanceof Vector)) {
			throw new Error(`'position' property must be an instance of Vector`);
		}
		this.#id = id;
		this.#speed = speed;
		this.#head = new Head({ position, direction });
		this.#body = new Body();
		if (length) {
			// determine the last position and work backwards, as we need the closest one at [0].
			let currentPosition = position.clone();
			const currentDirection = direction.clone().opposite();
			const speedVector = currentDirection.fill(this.#speed);
			const lengthVector = currentDirection.fill(length);
			const lastSegmentOffset = currentDirection.multiply(speedVector.multiply(lengthVector));
			currentPosition = currentPosition.add(lastSegmentOffset); // this is the position of the last segment
			const movement = direction.multiply(speedVector); // since we start at the end of the snake, we want to move forward in the direction towards the head
			for (let i = 0; i < length; i++) {
				this.#body.grow({ position: currentPosition.clone(), direction: direction.clone() });
				currentPosition = currentPosition.add(movement);
			}
		}
	}

	get id() {
		return this.#id;
	}

	get speed() {
		return this.#speed;
	}

	get position() {
		return this.#head.position.clone();
	}

	get direction() {
		return this.#head.direction.clone();
	}

	get length() {
		return this.#body.length;
	}

	get body() {
		return this.#body.segments;
	}

	grow(args = {}) {
		const { position, direction } = args;
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		if (!(direction instanceof Vector)) {
			throw new Error(`'direction' argument must be an instance of Vector`);
		}
		this.#body.grow({ position, direction });
	}

	getBodySegmentAt(index) {
		return this.#body.getSegmentAt(index);
	}

	move(speed = this.#speed) {
		this.#head.move(speed);
		this.#body.move(speed);
		this.#body.shiftDirections(this.#head.direction);
	}

	changeDirection(direction) {
		this.#head.changeDirection(direction);
	}

	setSpeed(speed) {
		if (isNaN(speed)) {
			throw new Error(`'speed' argument must be a number`);
		}
		if (speed > 0) {
			this.#speed = speed;
		}
	}

	getProjectedPosition(speed = this.#speed) {
		return this.#head.getProjectedPosition(speed);
	}

	collision(position) {
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		return this.#body.collision(position);
	}

	moveAndGrow(speed = this.#speed) {
		const { position, direction } = this.#head;
		this.#head.move(speed);
		this.#body.grow({ position, direction });
	}

}