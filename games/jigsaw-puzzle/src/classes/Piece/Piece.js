import Position2d from "../support/Position2d.js";

export default class Piece {
	#position;
	#connections;
	#attached;

	constructor( args = {}) {
		this.#position = new Position2d(args.position) || new Position2d({ x: 0, y: 0 });
		this.#connections = [];
		this.#attached = [];
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get position() {
		return { x: this.x, y: this.y };
	}

	move(args = {}) {
		if (Position2d.valid(args)) {
			this.#position = new Position2d(args);
		}
	}
}