import Segment from './../Segment/Segment.js';
import Vector from "../Vector/Base/Vector.js";

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
		return this.#segments.some(segment => segment.position.equals(position));
	}

	projectedCollision(args = {}) {
		const { position, speed = 1 } = args;
		if (!(position instanceof Vector)) {
			throw new Error(`'position' argument must be an instance of Vector`);
		}
		return this.getProjectedPositions(speed).some(segmentPosition => segmentPosition.equals(position));
	}

	getProjectedPositions(speed = 1) {
		return this.#segments.map((segment) => segment.getProjectedPosition(speed));
	}

	move(speed = 1) {
		this.#segments.forEach((segment) => segment.move(speed));
	}

	shiftDirections(firstDirection) {
		if (!(firstDirection instanceof Vector)) {
			throw new Error(`'firstDirection' argument must be an instance of Vector`);
		}
		let newDirection = firstDirection.clone();
		this.#segments.forEach((segment) => {
			const oldDirection = segment.direction.clone();
			segment.changeDirection(newDirection);
			newDirection = oldDirection;
		});
	}

}