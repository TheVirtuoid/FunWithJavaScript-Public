import Position2d from "../support/Position2d.js";
import CutType from "../support/CutType.js";
import Piece from "../Piece/Piece.js";
import Picture from "../support/Picture.js";
import Status from "../support/Status.js";

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
	#tolerance = 3;

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
		const { x, y } = piece.ordinal;
		if (!this.#pieces[y]) {
			this.#pieces[y] = [];
		}
		this.#pieces[y][x] = piece;
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
			const row = [];
			for (let j = 0; j < this.#columns; j++) {
				const piece = this.addPiece({
					position: {
						x: j * this.#pieceWidth,
						y: i * this.#pieceHeight
					},
					ordinal: { x: j, y: i }
				});
			}
		}
	}

	getPieceByOrdinal(args = {}) {
		const { x = -1, y = -1 } = args;
		let piece;
		try {
			piece = this.#pieces[y][x];
		} catch (err) {
			piece = undefined;
		}
		return piece;
	}
//
	movePiece(piece, position) {
		let { x, y } = position;
		let statusCode;
		let statusData = piece;

		x = Math.max(0, Math.min(x, this.#dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, this.#dimension.y - this.#pieceHeight));
		statusCode = x !== position.x || y !== position.y ? Status.MOVED : Status.NO_CHANGE;
		piece.move(new Position2d({ x, y }));
		this.#checkConnection(piece);
		return new Status({ code: statusCode, data: statusData });
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
		this.#pieces.flat().forEach((piece) => {
			piece.move({
				x: Math.floor(Math.random() * (this.#dimension.x - this.#pieceWidth)),
				y: Math.floor(Math.random() * (this.#dimension.y - this.#pieceHeight))
			});
		});
		return new Status({ code: Status.PUZZLE_READY, data: null });
	}

	#checkConnection(piece) {
		console.log(`Checking connections for piece at positions [${piece.x}, ${piece.y}]`);
		const { x, y } = piece.ordinal;
		const north = this.#checkPieceConnection(piece, { x, y: y - 1 }, 0, 1);
		const east = this.#checkPieceConnection(piece, { x: x + 1, y }, 1, 0);
		const south = this.#checkPieceConnection(piece, { x , y: y + 1 }, 0, 1);
		const west = this.#checkPieceConnection(piece, { x: x - 1, y }, 1, 0);
		/*console.log(north.code === Status.CONNECTED, east.code === Status.CONNECTED, south.code === Status.CONNECTED, west.code === Status.CONNECTED)
		console.log(north, east, south, west);*/
		if (north.code === Status.CONNECTED) {
			return north;
		}
		if (east.code === Status.CONNECTED) {
			return north;
		}
		if (south.code === Status.CONNECTED) {
			return north;
		}
		if (west.code === Status.CONNECTED) {
			return north;
		}
		return new Status({ code: Status.NO_CONNECTION, data: null });
	}

	// checkX, checkY refers to if we take into account the pieceWidth or pieceHeight (1) or not (0)
	#checkPieceConnection(piece, ordinal, checkX, checkY) {
		let code = Status.NO_CONNECTION;
		let data = null;
		const { x, y } = ordinal;
		if (x >= 0 && x < this.#columns && y >= 0 && y < this.#rows) {
			const piece2 = this.getPieceByOrdinal({ x, y });
			const { x: x1, y: y1 } = piece;
			const { x: x2, y: y2 } = piece2;
			// I should be using the distance formula here, but I can't get it to work correctly using the pieceWidth and pieceHeight offsets
			// so we'll do it the old fashioned, brute force way
			const distanceX  = Math.abs(x1 - x2 - this.#pieceWidth * checkX);
			const distanceY = Math.abs(y1 - y2 - this.#pieceHeight * checkY);
			// console.log(`   Positions: [${x1}, ${y1}] - [${x2}, ${y2}] (Ordinals: [${x}, ${y}]), Distances: ${distanceX}, ${distanceY}`);
			if (distanceX <= this.#tolerance && distanceY <= this.#tolerance) {
				code = Status.CONNECTED;
				data = { parent: piece, child: piece2 };
			}
		}
		return new Status({ code, data });
	}
}