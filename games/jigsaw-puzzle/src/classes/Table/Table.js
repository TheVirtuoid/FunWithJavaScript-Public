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
import StatusGameFinished from "../support/Status/StatusGameFinished.js";

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
		this.#numberOfPieces = this.#numPieces
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
		let { x, y } = position;
		x = Math.max(0, Math.min(x, this.#dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, this.#dimension.y - this.#pieceHeight));
		const statusCode = x !== position.x || y !== position.y ? Status.MOVED : Status.NO_CHANGE;
		this.#moveAllPieces(piece, new Position2d({ x, y }));
		const connections = this.#checkAllConnections(piece);
		/*console.log('ALL THE CONNECTIONS', connections);
		console.log(`                 length = ${connections.length}`);
		console.log(`                 type = ${connections[0]}, ${Array.isArray(connections[0])}`);*/

		let noConnectionInstances = 0;
		connections.forEach((connection) => {
			// console.log(connection, connection instanceof StatusNoConnection);
			if (connection instanceof StatusNoConnection) {
				noConnectionInstances++;
			} else {
				// we now have a STATUS_INITIAL_CONNECTION
				const { north, east, south, west } = connection;
				[north, east, south, west].forEach((connection) => {
					if (connection instanceof StatusConnected) {
						const { toPiece, fromPiece, adjustment } = connection;
						// console.log('---------checking the connection');
						// console.log(fromPiece.parent === null, fromPiece.parent !== toPiece, fromPiece.parent !== toPiece.parent);
						if (fromPiece.parent === null || (fromPiece.parent !== toPiece && fromPiece.parent !== toPiece.parent)) {
							fromPiece.moveRelative(new Position2d({x: adjustment.x * -1, y: adjustment.y * -1}));
							fromPiece.moveTo(toPiece);
							this.#piecesRemaining --;
						}
					}
				});
			}
		});
		// console.log('>>>>>>', noConnectionInstances, connections.length);
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

	setCut(cut) {
		this.#cut = cut || null;
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
		// console.log(`Checking connections for piece at positions [${piece.x}, ${piece.y}]`);
		const { x, y } = piece.ordinal;
		const north = this.#checkPieceConnection(piece, { x, y: y - 1 }, 0, -1);
		const east = this.#checkPieceConnection(piece, { x: x + 1, y }, 1, 0);
		const south = this.#checkPieceConnection(piece, { x , y: y + 1 }, 0, 1);
		const west = this.#checkPieceConnection(piece, { x: x - 1, y }, -1, 0);
		// console.log(north.code === Status.CONNECTED, east.code === Status.CONNECTED, south.code === Status.CONNECTED, west.code === Status.CONNECTED)
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
		// console.log(`      checking piece (${fromPiece.ordinal.x},${fromPiece.ordinal.y}) against piece (${toPiece.ordinal.x}, ${toPiece.ordinal.y}) with (${checkX}, ${checkY})`);
		// console.log(`          Initial: [${fromPiece.x},${fromPiece.y}], [${toPiece.x},${toPiece.y}]`);

		// check if the toPiece is a child of the fromPiece or vice versa
		// console.log('            Checking for Child Parent connections:');
		const test = [];
		fromPiece.children.forEach((child) => test.push(`[${child.ordinal.x},${child.ordinal.y}]`));
		// console.log(`                fromPiece: ${fromPiece.hasChild(toPiece)}, toPiece: ${toPiece.hasChild(fromPiece)}`);
		// console.log(`                fromPiece children: ${test.join(', ')}`);
		if (fromPiece.hasChild(toPiece) || toPiece.hasChild(fromPiece) || (fromPiece.parent === toPiece.parent && fromPiece.parent !== null)) {
			// console.log(`            ---> Child connection`);
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


		// const distanceX = Math.sqrt((x2 - x1) ** 2) - this.#pieceWidth * checkX;
		// const distanceY = Math.sqrt((y2 - y1) ** 2) - this.#pieceHeight * checkY;
		// console.log(`          Positions: [${fromPieceX}, ${fromPieceY}] - [${toPieceX}, ${toPieceY}] Distances: ${distanceX}, ${distanceY}`);
		if (Math.abs(distanceX) <= this.#tolerance && Math.abs(distanceY) <= this.#tolerance) {
			return new StatusConnected({ toPiece, fromPiece, adjustment: new Position2d({ x: distanceX, y: distanceY}) });
		}
		return new StatusNoConnection({ piece: fromPiece });
	}
}