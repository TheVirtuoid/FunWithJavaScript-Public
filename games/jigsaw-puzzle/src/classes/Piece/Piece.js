import Position2d from "../support/Position2d.js";

export default class Piece {
	#position;

	constructor( args = {}) {
		this.#position = new Position2d(args.position) || new Position2d({ x: 0, y: 0 });
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	move(args = {}) {
		if (Position2d.valid(args)) {
			this.#position = new Position2d(args);
		}
	}
}