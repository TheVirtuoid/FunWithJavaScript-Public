import Position2d from "../support/Position2d.js";
import CutType from "../support/CutType.js";
import Piece from "../Piece/Piece.js";
import Picture from "../support/Picture.js";

export default class Table {
	#image;
	#cut;
	#dimension;
	#pieces;
	#numberOfPieces;

	constructor(args = {}) {
		const { dimension, pieces, image, cut, numberOfPieces } = args;
		this.setDimensions(dimension);
		this.setImage({ image });
		this.setCut({ cut });
		this.setNumberOfPieces({ numberOfPieces });
		this.#pieces = pieces || [];
	}

	get cut() {
		return this.#cut;
	}

	get image() {
		return this.#image.image;
	}

	get numberOfPieces() {
		return this.#numberOfPieces;
	}

	get pieceCount() {
		return this.#pieces.length;
	}

	get x() {
		return this.#dimension.x;
	}

	get y() {
		return this.#dimension.y;
	}

	addPiece(args = {}) {
		const piece = new Piece(args);
		this.#pieces.push(piece);
		return piece;
	}

	setCut(cut) {
		if (CutType.valid(cut)) {
			this.#cut = cut || CutType.NONE;
		}
	}

	setDimensions(args = {}) {
		if (Position2d.valid(args)) {
			this.#dimension = new Position2d(args);
		}
	}

	setImage(image) {
		this.#image = new Picture(image || null);
	}

	setNumberOfPieces(numberOfPieces) {
		this.#numberOfPieces = numberOfPieces || 0;
	}
}