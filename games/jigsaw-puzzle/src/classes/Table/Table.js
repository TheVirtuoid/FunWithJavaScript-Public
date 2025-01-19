import Position2d from "../support/Position2d.js";
import CutType from "../support/CutType.js";
import Piece from "../Piece/Piece.js";

export default class Table {
	#image;
	#cut;
	#dimension;
	#pieces;

	constructor(args = {}) {
		const { dimension, pieces, image, cut } = args;
		this.#dimension = new Position2d(dimension) || new Position2d({ x: 0, y: 0 });
		this.#image = image || null;
		this.#cut = cut || CutType.NONE;
		this.#pieces = pieces || [];
	}

	get cut() {
		return this.#cut;
	}

	get x() {
		return this.#dimension.x;
	}

	get y() {
		return this.#dimension.y;
	}

	get image() {
		return this.#image;
	}

	get pieceCount() {
		return this.#pieces.length;
	}

	addPiece(args = {}) {
		const piece = new Piece(args);
		this.#pieces.push(piece);
		return piece;
	}
}