import Position2d from "../support/Position2d.js";
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
import StatusGameFinished from "../support/Status/StatusGameFinished.js";

export default class Table {
	static CONNECTION_TOLERANCE = 3;

	#image;
	#cut;
	#numPieces;
	#pieces;
	#rows;
	#columns;
	#pieceWidth;
	#pieceHeight;
	#piecesRemaining;
	#puzzleDimensions;


	#dimension;
	#numberOfPieces;
	#tolerance = Table.CONNECTION_TOLERANCE;

	#moveAllPieces = moveAllPieces;

	constructor(args = {}) {
		/*const { dimension, pieces, image, cut, numberOfPieces } = args;
		this.setDimensions(dimension || new Position2d({ x: 0, y: 0 }));
		this.setImage(image || null);
		this.setCut(cut || null);
		this.setNumberOfPieces(numberOfPieces || 0);
		this.#pieces = pieces || [];
		this.#piecesRemaining = 0;*/
		const { image, cut, numPieces } = args;
		this.#image = image || null;
		this.#cut = cut || null;
		this.#numPieces = numPieces || null;
		this.#pieceWidth = null;
		this.#pieceHeight = null;
		this.#columns = numPieces?.dimensions.x || null;
		this.#rows = numPieces?.dimensions.y || null;
		this.#pieces = [];
	}

	get cut() {
		return this.#cut;
	}

	get image() {
		return this.#image;
	}

	get numPieces() {
		return this.#numPieces;
	}

	get numberOfPieces() {
		return this.#numPieces?.pieces || 0;
	}

	get pieceHeight() {
		return this.#pieceHeight;
	}

	get pieceWidth() {
		return this.#pieceWidth;
	}

	get rows() {
		return this.#rows;
	}

	get columns() {
		return this.#columns;
	}

	get puzzleWidth() {
		return this.#puzzleDimensions.x;
	}

	get puzzleHeight() {
		return this.#puzzleDimensions.y;
	}

	/*get x() {
		return this.#dimension.x;
	}*/

	/*get y() {
		return this.#dimension.y;
	}*/

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
		this.#pieces = [];
		for (let i = 0; i < this.#rows; i++) {
			for (let j = 0; j < this.#columns; j++) {
				this.addPiece({
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

	movePiece(piece, position) {
		const dimension = this.#puzzleDimensions;
		let { x, y } = position;
		x = Math.max(0, Math.min(x, dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, dimension.y - this.#pieceHeight));
		const statusCode = x !== position.x || y !== position.y ? Status.MOVED : Status.NO_CHANGE;
		this.#moveAllPieces(piece, new Position2d({ x, y }));
		const connections = this.#checkAllConnections(piece);
		let noConnectionInstances = 0;
		connections.forEach((connection) => {
			if (connection instanceof StatusNoConnection) {
				noConnectionInstances++;
			} else {
				// we now have a STATUS_INITIAL_CONNECTION
				const { north, east, south, west } = connection;
				[north, east, south, west].forEach((connection) => {
					if (connection instanceof StatusConnected) {
						const { toPiece, fromPiece, adjustment } = connection;
						if (fromPiece.parent === null || (fromPiece.parent !== toPiece && fromPiece.parent !== toPiece.parent)) {
							fromPiece.moveRelative(new Position2d({x: adjustment.x * -1, y: adjustment.y * -1}));
							fromPiece.moveTo(toPiece);
							this.#piecesRemaining --;
						}
					}
				});
			}
		});
		if (noConnectionInstances === connections.length) {
			const piecesRemaining = this.#piecesRemaining;
			return statusCode === Status.MOVED
				? new StatusMoved({piece, newPosition: new Position2d({ x, y }), piecesRemaining })
				: new StatusNoChange({ piece, piecesRemaining });
		}
		if (this.#piecesRemaining === 1) {
			return new StatusGameFinished({ fromPiece: piece, piecesRemaining: this.#piecesRemaining });
		}
		return new StatusConnected({ fromPiece: piece, piecesRemaining: this.#piecesRemaining });
	}

	setPuzzleDimensions(args = {}) {
		if (Position2d.valid(args)) {
			this.#puzzleDimensions = new Position2d(args);
			const { x, y } = this.#puzzleDimensions;
			this.#pieceWidth = x / this.#columns;
			this.#pieceHeight = y / this.#rows;
		}
	}

	shufflePuzzle() {
		const dimension = this.#puzzleDimensions;
		this.#pieces.flat().forEach((piece) => {
			piece.move({
				x: Math.floor(Math.random() * (dimension.x - this.#pieceWidth)),
				y: Math.floor(Math.random() * (dimension.y - this.#pieceHeight))
			});
		});
		this.#piecesRemaining = this.numberOfPieces;
		return new Status({ code: Status.PUZZLE_READY, data: this.#piecesRemaining });
	}

	#checkAllConnections(piece, excludePiece = null) {
		const allConnections = [];
		const pieceConnection = this.#checkConnection(piece);
		allConnections.push(pieceConnection);
		if (piece.parent) {
			this.#checkAllConnections(piece.parent, piece).forEach((connection) => allConnections.push(connection));
		}
		piece.children.forEach((child) => {
			if (child !== excludePiece) {
				allConnections.push(this.#checkConnection(child));
			}
		});
		return allConnections;
	}

	#checkConnection(piece) {
		const { x, y } = piece.ordinal;
		const north = this.#checkPieceConnection(piece, { x, y: y - 1 }, 0, -1);
		const east = this.#checkPieceConnection(piece, { x: x + 1, y }, 1, 0);
		const south = this.#checkPieceConnection(piece, { x , y: y + 1 }, 0, 1);
		const west = this.#checkPieceConnection(piece, { x: x - 1, y }, -1, 0);
		if (north instanceof StatusConnected || east instanceof StatusConnected || south instanceof StatusConnected || west instanceof StatusConnected) {
			return new StatusInitialConnection({ piece, north, east, south, west });
		} else {
			return new StatusNoConnection({ piece });
		}
	}

	// checkX, checkY refers to if we take into account the pieceWidth or pieceHeight (1) or not (0)
	#checkPieceConnection(fromPiece, ordinal, checkX, checkY) {
		// check if ordinal is even valid
		const { x, y } = ordinal;
		if (x < 0 || x >= this.#columns || y < 0 || y >= this.#rows) {
			return new StatusNoConnection({ piece: fromPiece });
		}
		const toPiece = this.getPieceByOrdinal(ordinal);

		// check if the toPiece is a child of the fromPiece or vice versa
		const test = [];
		fromPiece.children.forEach((child) => test.push(`[${child.ordinal.x},${child.ordinal.y}]`));
		if (fromPiece.hasChild(toPiece) || toPiece.hasChild(fromPiece) || (fromPiece.parent === toPiece.parent && fromPiece.parent !== null)) {
			return new StatusNoConnection({ piece: fromPiece });
		}

		// at this point, it's a valid piece on the table. Let's check it!!
		let { x: fromPieceX, y: fromPieceY } = fromPiece;
		let { x: toPieceX, y: toPieceY } = toPiece;

		// adjust for puzzle width and/or height.
		fromPieceX += checkX * this.#pieceWidth;
		fromPieceY += checkY * this.#pieceHeight;

		const distanceX = fromPieceX - toPieceX;
		const distanceY = fromPieceY - toPieceY;

		if (Math.abs(distanceX) <= this.#tolerance && Math.abs(distanceY) <= this.#tolerance) {
			return new StatusConnected({ toPiece, fromPiece, adjustment: new Position2d({ x: distanceX, y: distanceY}) });
		}
		return new StatusNoConnection({ piece: fromPiece });
	}
}