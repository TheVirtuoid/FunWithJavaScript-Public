import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import tableBuilder from "./tableBuilder.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	let x0y0, x1y0, x2y0, x3y0, x4y0, x5y0;
	let x0y1, x1y1, x2y1, x3y1, x4y1, x5y1;
	let x0y2, x1y2, x2y2, x3y2, x4y2, x5y2;
	let x0y3, x1y3, x2y3, x3y3, x4y3, x5y3;
	let numberOfPieces, pieceWidth, pieceHeight;

	beforeEach( () => {
		const { imageData, cutData, dimensions, numPieces32 } = tableBuilder();
		table = new Table({ image: imageData, cut: cutData, numPieces: numPieces32 });
		table.setPuzzleDimensions(dimensions);
		table.cutPuzzle();
		for(let row = 0; row < table.rows; row++ ) {
			for(let column = 0; column < table.columns; column++) {
				const piece = table.getPieceByOrdinal({ x: column, y: row });
				piece.setCheckingPoint({
					x: column * table.pieceWidth + table.pieceWidth / 2,
					y: row * table.pieceHeight + table.pieceHeight / 2,
					width: table.pieceWidth,
					height: table.pieceHeight
				});
			}
		}

		table.shufflePuzzle();
		x0y0 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 0 }));
		x1y0 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 0 }));
		x2y0 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 0 }));
		x3y0 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 0 }));
		x4y0 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 0 }));
		x5y0 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 0 }));
		x0y1 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 1 }));
		x1y1 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 1 }));
		x2y1 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 1 }));
		x3y1 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 1 }));
		x4y1 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 1 }));
		x5y1 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 1 }));
		x0y2 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 2 }));
		x1y2 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 2 }));
		x2y2 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 2 }));
		x3y2 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 2 }));
		x4y2 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 2 }));
		x5y2 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 2 }));
		x0y3 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 3 }));
		x1y3 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 3 }));
		x2y3 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 3 }));
		x3y3 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 3 }));
		x4y3 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 3 }));
		x5y3 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 3 }));
		numberOfPieces = table.numberOfPieces;
		pieceWidth = table.pieceWidth;
		pieceHeight = table.pieceHeight;
	});

	it('should not change when no movement', () => {
		const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		expect(status.piecesRemaining).to.equal(numberOfPieces);
	});

	it('should not change with movement', () => {
		let status = table.movePiece(x0y0, new Position2d({ x: -1000, y: 8000 }));
		expect(status.piecesRemaining).to.equal(numberOfPieces);
		status = table.movePiece(x0y0, new Position2d({ x: 1000, y: -8000 }));
		expect(status.piecesRemaining).to.equal(numberOfPieces);
	});

	it('should decrease by 1 when single -> single connection', () => {
		table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
		const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 100 + pieceHeight }));
		expect(status.piecesRemaining).to.equal(numberOfPieces - 1);
	});

	it('should decrease by 2 when single -> 2 singles', () => {
		table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
		table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
		const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
		expect(status.piecesRemaining).to.equal(numberOfPieces - 2);
	});

	it('should decrease by 3 when single -> 3 singles', () => {
		table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
		table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
		table.movePiece(x0y2, new Position2d({ x: 0, y: pieceHeight * 2 }));
		const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
		expect(status.piecesRemaining).to.equal(numberOfPieces - 3);
	});

	it('should decrease by 4 when single -> 4 singles', () => {
		table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
		table.movePiece(x2y1, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
		table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
		table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
		const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
		expect(status.piecesRemaining).to.equal(numberOfPieces - 4);
	});

	it('should decrease by 1 when single connects with a multi-piece', () => {
		table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		const { piecesRemaining } = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
		const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
		expect(status.piecesRemaining).to.equal(piecesRemaining - 1);
	});

	it('should decrease by 1 when multi-piece connects with a multi-piece', () => {
		table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		table.movePiece(x2y0, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
		const { piecesRemaining } = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: pieceHeight }));
		const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
		expect(status.piecesRemaining).to.equal(piecesRemaining - 1);
	});

	it('should decrease by 2 when there is a multi-piece / single piece / multi-piece combination', () => {
		let remainingPieces = numberOfPieces;
		// set of 2
		table.movePiece(x2y3, new Position2d({ x: pieceWidth * 2, y: pieceHeight * 3 }));
		const { piecesRemaining: status1 } = table.movePiece(x3y3, new Position2d({ x: pieceWidth * 3, y: pieceHeight * 3 }));
		remainingPieces -= 1;

		// set of 3
		table.movePiece(x1y1, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
		table.movePiece(x1y3, new Position2d({ x: pieceWidth * 4, y: pieceHeight * 3 }));
		const { piecesRemaining: status2 } = table.movePiece(x1y2, new Position2d({ x: pieceWidth * 4, y: pieceHeight * 2 }));
		remainingPieces -= 2;

		// single piece
		const beforeMove = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
		remainingPieces -= 0;

		// move the child to make the double connection!!!
		const status = table.movePiece(x1y3, new Position2d({ x: pieceWidth, y: pieceHeight * 3 }));
		expect(status.piecesRemaining).to.equal(remainingPieces - 2);
	});
});