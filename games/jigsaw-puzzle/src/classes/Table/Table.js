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
	#rows;
	#columns;
	#pieceWidth;
	#pieceHeight;

	static STATUS_NORMAL = Symbol();
	static STATUS_MOVE_CHANGED = Symbol();

	constructor(args = {}) {
		const { dimension, pieces, image, cut, numberOfPieces } = args;
		this.setDimensions(dimension || new Position2d({ x: 0, y: 0 }));
		this.setImage(image || null);
		this.setCut(cut || CutType.NONE);
		this.setNumberOfPieces(numberOfPieces || 0);
		this.#pieces = pieces || [];
	}

	get columns() {
		return this.#columns;
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

	get rows() {
		return this.#rows;
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

	cutPuzzle() {
		const { x, y } = this.#dimension;
		const { numberOfPieces } = this;
		// determine the closest factors of the number of pieces
		this.#rows = Math.floor(Math.sqrt(numberOfPieces));
		this.#columns = numberOfPieces / this.#rows;
		while (this.#columns % 1 !== 0) {
			this.#rows--;
			this.#columns = numberOfPieces / this.#rows;
		}
		this.#pieceWidth = x / this.#columns;
		this.#pieceHeight = y / this.#rows;
		this.#pieces = [];
		for (let i = 0; i < this.#rows; i++) {
			for (let j = 0; j < this.#columns; j++) {
				this.addPiece({
					position: {
						x: j * this.#pieceWidth,
						y: i * this.#pieceHeight
					}
				});
			}
		}
	}

	getPieceByIndex(index) {
		return this.#pieces[index];
	}

	movePiece(piece, position) {
		let { x, y } = position;
		x = Math.max(0, Math.min(x, this.#dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, this.#dimension.y - this.#pieceHeight));
		let status = x !== position.x || y !== position.y ? Table.STATUS_MOVE_CHANGED : Table.STATUS_NORMAL;
		piece.move(new Position2d({ x, y }));
		return { status, position: piece.position };
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

	shufflePuzzle() {
		this.#pieces.forEach((piece) => {
			piece.move({
				x: Math.floor(Math.random() * (this.#dimension.x - this.#pieceWidth)),
				y: Math.floor(Math.random() * (this.#dimension.y - this.#pieceHeight))
			});
		});
		this.#pieces = this.#pieces.sort(() => Math.random() - 0.5);
	}
}