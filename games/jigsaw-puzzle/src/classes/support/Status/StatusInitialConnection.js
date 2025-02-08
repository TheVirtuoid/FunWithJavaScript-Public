import Status from "./Status.js";

export default class StatusConnected extends Status {
	#north;
	#south;
	#east;
	#west;
	#piece;

	constructor(args = {}) {
		args.code = Status.INITIAL_CONNECTION;
		super(args);
		const { piece, north = null, east = null, south = null, west = null } = args;
		this.#north = north;
		this.#east = east;
		this.#south = south;
		this.#west = west;
		this.#piece = piece;
	}

	get north() {
		return this.#north;
	}

	get south() {
		return this.#south;
	}

	get east() {
		return this.#east;
	}

	get west() {
		return this.#west;
	}

	get piece() {
		return this.#piece;
	}

}