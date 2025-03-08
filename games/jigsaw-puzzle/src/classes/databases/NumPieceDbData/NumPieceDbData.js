import Position2d from "../../support/Position2d.js";

export default class NumPieceDbData {
	#name;
	#pieces;
	#dimensions;
	#id;

	constructor(args = {}) {
		const { name, pieces, dimensions, id } = args;
		this.#name = name || null;
		this.#pieces = pieces || null;
		this.#dimensions = dimensions ? new Position2d(dimensions) : null;
		this.#id = id || null;
	};

	get name() {
		return this.#name;
	}

	get pieces() {
		return this.#pieces;
	}

	get dimensions() {
		return this.#dimensions;
	}

	get id() {
		return this.#id;
	}

}
