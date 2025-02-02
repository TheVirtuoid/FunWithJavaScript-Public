import Position2d from "../support/Position2d.js";
import CutType from "../support/CutType.js";
import Piece from "../Piece/Piece.js";
import Picture from "../support/Picture.js";
import Status from "../support/Status/Status.js";
import { moveAllPieces } from './move.js';

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
		let statusCode;
		let statusData = { piece, piecesRemaining: this.#piecesRemaining };

		x = Math.max(0, Math.min(x, this.#dimension.x - this.#pieceWidth));
		y = Math.max(0, Math.min(y, this.#dimension.y - this.#pieceHeight));
		statusCode = x !== position.x || y !== position.y ? Status.MOVED : Status.NO_CHANGE;
		// move not only the piece, but all the children or the parent

		// this.#print(piece);
		this.#moveAllPieces(piece, new Position2d({ x, y }));
		// this.#print(piece);
		// console.log('--------------------------------------------------------------------------');
		// piece.move(new Position2d({ x, y }));
		const connection = this.#checkConnection(piece);
		if (connection.code === Status.CONNECTED) {
			console.log(`        CONNECTION!!!! Length = ${connection.data.length}`);
			const movedChildren = new Set();
			connection.data.forEach((status) => {
				const { parent, distanceX, distanceY, piecesRemaining } = status;



				// TODO: what happens when a multi-piece is moved to another single piece?
				/** Each multi-piece becomes the child of the single piece */
				const multiPiece = !!piece.parent || !!piece.children.length;
				console.log(`            Piece parent: ${piece.parent}, children: ${piece.children?.length}, multipiece? ${multiPiece}`);
				// console.log(multiPiece, piece.parent, piece.children.length, `(${piece.ordinal.x},${piece.ordinal.y})`);
				// TODO: what happens when a multi-piece is moved ao another multi-piece?
				const { parent, child, distanceX, distanceY } = connectionData.data;
				console.log(`            P: ${parent}, C: ${child}, DX: ${distanceX}, DY: ${distanceY}`);
				if (!movedChildren.has(child)) {
					child.move(new Position2d({ x: child.x - distanceX, y: child.y - distanceY }));
					this.#piecesRemaining -= 1;
					parent.addChild(child);
					movedChildren.add(child);
				}
			});
			statusCode = this.#piecesRemaining === 1 ? Status.GAME_FINISHED : Status.CONNECTED;
			statusData = { connections: connection.data, piecesRemaining: this.#piecesRemaining };
		}
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
		// console.log(north, east, south, west);
		const connections = [];
		if (north.code === Status.CONNECTED) {
			// console.log('North is connected');
			connections.push(north);
		}
		if (east.code === Status.CONNECTED) {
			// console.log('East is connected');
			connections.push(east);
		}
		if (south.code === Status.CONNECTED) {
			// console.log('South is connected');
			connections.push(south);
		}
		if (west.code === Status.CONNECTED) {
			// console.log('West is connected');
			connections.push(west);
		}
		const code = connections.length ? Status.CONNECTED : Status.NO_CONNECTION;
		return new Status({ code, data: connections });
	}

	// checkX, checkY refers to if we take into account the pieceWidth or pieceHeight (1) or not (0)
	#checkPieceConnection(piece, ordinal, checkX, checkY) {
		console.log(`      checking piece (${piece.ordinal.x},${piece.ordinal.y}) against piece (${ordinal.x}, ${ordinal.y}) with (${checkX}, ${checkY})`);
		let code = Status.NO_CONNECTION;
		let parent = null;
		let distanceX = null;
		let distanceY = null;
		if (piece.getChildByOrdinal(ordinal)) {
			return new Status({ code });
		}
		if (piece.parent) {
			console.log('             checking a parent');
			const { x, y } = piece.parent.ordinal;
			// console.log(`           checkPieceConnection: ordinals: parent = ${x}, ${y}, checking = ${ordinal.x}, ${ordinal.y}`);
			if (x === ordinal.x && y === ordinal.y) {
				return new Status({ code: Status.NOOP });
			}
		}

		const { x, y } = ordinal;
		if (x >= 0 && x < this.#columns && y >= 0 && y < this.#rows) {
			const piece2 = this.getPieceByOrdinal({ x, y });
			console.log(`        looking at piece (${piece2.ordinal.x}, ${piece2.ordinal.y}) with position (${piece2.x}, ${piece2.y})`);
			const { x: x1, y: y1 } = piece;
			const { x: x2, y: y2 } = piece2;
			distanceX = Math.sqrt((x2 - x1) ** 2) - this.#pieceWidth * checkX;
			distanceY = Math.sqrt((y2 - y1) ** 2) - this.#pieceHeight * checkY;
			console.log(`        Positions: [${x1}, ${y1}] - [${x2}, ${y2}] (Ordinals: [${x}, ${y}]), Distances: ${distanceX}, ${distanceY}`);
			if (Math.abs(distanceX) <= this.#tolerance && Math.abs(distanceY) <= this.#tolerance) {
				code = Status.CONNECTED;
				parent = piece2;
			}
		}
		return new Status({ code, parent, distanceX, distanceY });
	}

	/**
	 * CONNECTION ROUTINES
	 */
}