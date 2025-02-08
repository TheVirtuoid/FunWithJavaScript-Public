import Position2d from "../support/Position2d.js";
import CutType from "../support/CutType.js";
import Piece from "../Piece/Piece.js";
import Picture from "../support/Picture.js";
import Status from "../support/Status/Status.js";
import { moveAllPieces } from './move.js';
import StatusNoop from "../support/Status/StatusNoop.js";
import StatusNoConnection from "../support/Status/StatusNoConnection.js";
import StatusConnected from "../support/Status/StatusConnected.js";
import StatusMoved from "../support/Status/StatusMoved.js";
import StatusNoChange from "../support/Status/StatusNoChange.js";
import StatusInitialConnection from '../support/Status/StatusInitialConnection.js';

export default class Table {
	static CONNECTION_TOLERANCE = 3;

	#image;
	#cut;
	#dimension;
	#pieces;
	#numberOfPieces;
	#rows;
	#columns;
	#pieceWidth;
	#pieceHeight;
	#tolerance = Table.CONNECTION_TOLERANCE;
	#piecesRemaining;

	#moveAllPieces = moveAllPieces;

	constructor(args = {}) {
		const { dimension, pieces, image, cut, numberOfPieces } = args;
		this.setDimensions(dimension || new Position2d({ x: 0, y: 0 }));
		this.setImage(image || null);
		this.setCut(cut || CutType.NONE);
		this.setNumberOfPieces(numberOfPieces || 0);
		this.#pieces = pieces || [];
		this.#piecesRemaining = 0;
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

	#print(piece) {
		console.log(`Ord: ${piece.ordinal.x},${piece.ordinal.y}, Pos: ${piece.x},${piece.y}`);
	}

	movePiece(piece, position) {
		let { x, y } = position;
		let status;
		let statusObject;
		let toPiece;
		let fromPiece;
		let adjustment;
		let piecesRemaining;

		x = Math.max(0, Math.min(x, this.#dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, this.#dimension.y - this.#pieceHeight));
		const statusCode = x !== position.x || y !== position.y ? Status.MOVED : Status.NO_CHANGE;
		this.#moveAllPieces(piece, new Position2d({ x, y }));
		const connection = this.#checkConnection(piece);
		if (connection instanceof StatusNoConnection) {
			return statusCode === Status.MOVED
				? new StatusMoved({piece, newPosition: new Position2d({ x, y })})
				: new StatusNoChange({piece});
		}
		// we now have a STATUS_INITIAL_CONNECTION
		const { north, east, south, west } = connection;
		[north, east, south, west].forEach((connection) => {
			if (connection instanceof StatusConnected) {
				this.#piecesRemaining --;
				const { toPiece, fromPiece, adjustment } = connection;
				console.log('----------------------------------------------------------------');
				console.log(`Moving piece from [${fromPiece.ordinal.x}, ${fromPiece.ordinal.y}] to [${toPiece.ordinal.x}, ${toPiece.ordinal.y}]`);
				fromPiece.moveRelative(adjustment);
				fromPiece.moveTo(toPiece);
				console.log(`    Piece at [${fromPiece.ordinal.x}, ${fromPiece.ordinal.y}] is now a child of piece at [${toPiece.ordinal.x}, ${toPiece.ordinal.y}]`);
				console.log(`        toPiece parent: [${toPiece.parent?.ordinal.x}, ${toPiece.parent?.ordinal.y}]`);
				console.log(`        fromPiece parent: [${fromPiece.parent?.ordinal.x}, ${fromPiece.parent?.ordinal.y}]`);
			}
		});


		/*connection.data.forEach((status) => {
			const { toPiece, fromPiece, adjustment } = status;

			// SINGLE PIECE ...
			if (!fromPiece.hasParent() && !fromPiece.hasChildren()) {
				// to single piece
				if (!toPiece.hasParent() && !toPiece.hasChildren()) {
					fromPiece.moveRelative(adjustment);
					toPiece.addChild(fromPiece);
					this.#piecesRemaining --;
				}
			}
		});*/
		/*piecesRemaining = this.#piecesRemaining;
		statusData = { toPiece, fromPiece, piecesRemaining: this.#piecesRemaining };*/
		return new StatusConnected({ fromPiece: piece, piecesRemaining: this.#piecesRemaining });
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
		this.#piecesRemaining = this.numberOfPieces;
		return new Status({ code: Status.PUZZLE_READY, data: this.#piecesRemaining });
	}

	#checkConnection(piece) {
		// console.log(`Checking connections for piece at positions [${piece.x}, ${piece.y}]`);
		const { x, y } = piece.ordinal;
		const north = this.#checkPieceConnection(piece, { x, y: y - 1 }, 0, 1);
		const east = this.#checkPieceConnection(piece, { x: x + 1, y }, 1, 0);
		const south = this.#checkPieceConnection(piece, { x , y: y + 1 }, 0, 1);
		const west = this.#checkPieceConnection(piece, { x: x - 1, y }, 1, 0);
		console.log(north.code === Status.CONNECTED, east.code === Status.CONNECTED, south.code === Status.CONNECTED, west.code === Status.CONNECTED)
		if (north instanceof StatusConnected || east instanceof StatusConnected || south instanceof StatusConnected || west instanceof StatusConnected) {
			return new StatusInitialConnection({ piece, north, east, south, west });
		} else {
			return new StatusNoConnection({ piece });
		}
	}

	// checkX, checkY refers to if we take into account the pieceWidth or pieceHeight (1) or not (0)
	#checkPieceConnection(piece, ordinal, checkX, checkY) {
		// console.log(`      checking piece (${piece.ordinal.x},${piece.ordinal.y}) against piece (${ordinal.x}, ${ordinal.y}) with (${checkX}, ${checkY})`);
		if (piece.getChildByOrdinal(ordinal)) {
			return new StatusNoConnection({ piece });
		}
		const piece2 = this.getPieceByOrdinal(ordinal);
		if (piece.parent === piece2) {
			return new StatusNoConnection({ piece });
		}
		// at this point, we know the ordinal we're checking isn't a child of the piece nor the parent of the piece
		const { x, y } = ordinal;
		if (x < 0 || x >= this.#columns || y < 0 || y >= this.#rows) {
			return new StatusNoConnection({ piece });
		}
		// at this point, it's a valid piece on the table. Let's check it!!
		// console.log(`        looking at piece (${piece2.ordinal.x}, ${piece2.ordinal.y}) with position (${piece2.x}, ${piece2.y})`);
		const { x: x1, y: y1 } = piece;
		const { x: x2, y: y2 } = piece2;
		const distanceX = Math.sqrt((x2 - x1) ** 2) - this.#pieceWidth * checkX;
		const distanceY = Math.sqrt((y2 - y1) ** 2) - this.#pieceHeight * checkY;
		// console.log(`        Positions: [${x1}, ${y1}] - [${x2}, ${y2}] (Ordinals: [${x}, ${y}]), Distances: ${distanceX}, ${distanceY}`);
		if (Math.abs(distanceX) <= this.#tolerance && Math.abs(distanceY) <= this.#tolerance) {
			return new StatusConnected({ toPiece: piece2, fromPiece: piece, adjustment: new Position2d({ x: distanceX, y: distanceY}) });
		}
		return new StatusNoConnection({ piece });
	}

	/**
	 * CONNECTION ROUTINES
	 */
}