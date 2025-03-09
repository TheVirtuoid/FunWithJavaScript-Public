import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import StatusConnected from "../../src/classes/support/Status/StatusConnected.js";
import StatusNoChange from "../../src/classes/support/Status/StatusNoChange.js";
import StatusMoved from "../../src/classes/support/Status/StatusMoved.js";
import StatusGameFinished from "../../src/classes/support/Status/StatusGameFinished.js";
import tableBuilder from "./tableBuilder.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	let x0y0, x1y0, x2y0, x3y0, x4y0, x5y0, x6y0, x7y0;
	let x0y1, x1y1, x2y1, x3y1, x4y1, x5y1, x6y1, x7y1;
	let x0y2, x1y2, x2y2, x3y2, x4y2, x5y2, x6y2, x7y2;
	let x0y3, x1y3, x2y3, x3y3, x4y3, x5y3, x6y3, x7y3;
	let pieceWidth, pieceHeight, rows, columns;

	beforeEach( () => {
		const { imageData, numPiecesData, cutData, dimensions, numPieces32 } = tableBuilder();
		table = new Table({ image: imageData, cut: cutData, numPieces: numPieces32 });
		table.setPuzzleDimensions(dimensions);
		table.cutPuzzle();
		table.shufflePuzzle();
		x0y0 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 0 }));
		x1y0 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 0 }));
		x2y0 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 0 }));
		x3y0 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 0 }));
		x4y0 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 0 }));
		x5y0 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 0 }));
		x6y0 = table.getPieceByOrdinal(new Position2d({ x: 6, y: 0 }));
		x7y0 = table.getPieceByOrdinal(new Position2d({ x: 7, y: 0 }));
		x0y1 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 1 }));
		x1y1 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 1 }));
		x2y1 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 1 }));
		x3y1 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 1 }));
		x4y1 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 1 }));
		x5y1 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 1 }));
		x6y1 = table.getPieceByOrdinal(new Position2d({ x: 6, y: 1 }));
		x7y1 = table.getPieceByOrdinal(new Position2d({ x: 7, y: 1 }));
		x0y2 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 2 }));
		x1y2 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 2 }));
		x2y2 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 2 }));
		x3y2 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 2 }));
		x4y2 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 2 }));
		x5y2 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 2 }));
		x6y2 = table.getPieceByOrdinal(new Position2d({ x: 6, y: 2 }));
		x7y2 = table.getPieceByOrdinal(new Position2d({ x: 7, y: 2 }));
		x0y3 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 3 }));
		x1y3 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 3 }));
		x2y3 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 3 }));
		x3y3 = table.getPieceByOrdinal(new Position2d({ x: 3, y: 3 }));
		x4y3 = table.getPieceByOrdinal(new Position2d({ x: 4, y: 3 }));
		x5y3 = table.getPieceByOrdinal(new Position2d({ x: 5, y: 3 }));
		x6y3 = table.getPieceByOrdinal(new Position2d({ x: 6, y: 3 }));
		x7y3 = table.getPieceByOrdinal(new Position2d({ x: 7, y: 3 }));
		pieceWidth = table.pieceWidth;
		pieceHeight = table.pieceHeight;
		rows = table.rows;
		columns = table.columns;
	});

	it('should not make a connection with no movement', () => {
		const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		expect(status instanceof StatusNoChange).to.be.true;
		expect(status.piece).to.equal(x0y0);
	});

	it('should not make a connection with movement', () => {
		const { pieceHeight, pieceWidth, columns, rows } = table;
		let status = table.movePiece(x0y0, new Position2d({ x: -1000, y: 8000 }));
		expect(status instanceof StatusMoved).to.be.true;
		expect(status.piece).to.equal(x0y0);
		expect(status.newPosition.x).to.equal(0);
		expect(status.newPosition.y).to.equal(pieceHeight * (rows - 1));
		status = table.movePiece(x0y0, new Position2d({ x: 1000, y: -8000 }));
		expect(status instanceof StatusMoved).to.be.true;
		expect(status.piece).to.equal(x0y0);
		expect(status.newPosition.x).to.equal(pieceWidth * (columns - 1));
		expect(status.newPosition.y).to.equal(0);
	});

	describe('When I want to check for directional connections', () => {
		it('should connect to a piece to the north', () => {
			table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 100 + pieceHeight  }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x0y1.parent).to.equal(x0y0);
		});

		it('should connect to a piece to the east', () => {
			table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 100 - pieceWidth, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x1y0.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x1y0);
		});

		it('should connect to a piece to the south', () => {
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 100 - pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x0y1);
		});

		it('should connect to a piece to the west', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 0 + pieceWidth, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces north and east', () => {
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x1y1.hasChild(x0y0)).to.be.true;
			expect(x1y1.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x1y1);
			expect(x0y1.parent).to.equal(x1y1);
			expect(x0y0.hasChildren()).to.be.false;	// we test this since x0y0 would have been a parent of x0y1 at one point
		});

		it('should connect to pieces north and south', () => {
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x0y2, new Position2d({ x: 0, y: pieceHeight * 2 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y2.hasChild(x0y0)).to.be.true;
			expect(x0y2.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x0y2);
			expect(x0y1.parent).to.equal(x0y2);
		});

		it('should connect to pieces north and west', () => {
			table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces east and south', () => {
			table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x0y0.parent).to.equal(x0y1);
		});

		it('should connect to pieces east and west', () => {
			table.movePiece(x2y0, new Position2d({x : pieceWidth * 2, y: 0 }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x2y0)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
			expect(x2y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces south and west', () => {
			table.movePiece(x1y1, new Position2d({x : pieceWidth, y: pieceHeight }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
			expect(x1y1.parent).to.equal(x0y0);
		});

		it('should connect to pieces north, east, and south', () => {
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			table.movePiece(x0y2, new Position2d({ x: 0, y: pieceHeight * 2 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y2.hasChild(x0y0)).to.be.true;
			expect(x0y2.hasChild(x1y1)).to.be.true;
			expect(x0y2.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x0y2);
			expect(x1y1.parent).to.equal(x0y2);
			expect(x0y1.parent).to.equal(x0y2);
		});

		it('should connect to pieces north, east, and west', () => {
			table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
			table.movePiece(x2y1, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x2y1)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x2y1.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces north, south, and west', () => {
			table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
			table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x1y2)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x1y2.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces east, south, and west', () => {
			table.movePiece(x2y0, new Position2d({x : pieceWidth * 2, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x2y0)).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x2y0.parent).to.equal(x0y0);
			expect(x1y1.parent).to.equal(x0y0);
			expect(x1y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces north, south, east, and west', () => {
			table.movePiece(x1y0, new Position2d({x : pieceWidth, y: 0 }));
			table.movePiece(x2y1, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
			table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x2y1)).to.be.true;
			expect(x0y1.hasChild(x1y2)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x2y1.parent).to.equal(x0y1);
			expect(x1y2.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});
	});

	describe('When I drop a single piece', () => {
		it('should connect as a child when the target is a child of a multi-piece', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
		});
		it('should connect as a child when the target is a parent of a multi-piece', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y0.hasChild(x0y1)).to.be.true;
		});
	});


	describe('When I work with multi-pieces', () => {
		describe('And I connect with a single piece', () => {
			it('should move the entire multi-piece as children of the target piece when moving child and child connects', () => {
				table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				table.movePiece(x2y0, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
				table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: pieceHeight }));
				const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x0y0.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChild(x2y0)).to.be.true;
				expect(x2y0.hasChildren()).to.be.false;
			});
			it('should move the entire multi-piece as children of the target piece when moving change and parent connects', () => {
				table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: pieceHeight }));
				table.movePiece(x2y0, new Position2d({ x: pieceWidth * 2, y: pieceHeight }));
				const status = table.movePiece(x2y0, new Position2d({ x: pieceWidth * 2, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x0y0.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChild(x2y0)).to.be.true;
				expect(x1y0.hasChildren()).to.be.false;
			});
		});

		describe('and I connect with a child of a multi-piece', () => {
			it('should move entire multi-piece to parent of target when moving a child', () => {
				table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
				table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
				table.movePiece(x0y3, new Position2d({ x: pieceWidth * 3, y: pieceHeight }));
				table.movePiece(x1y3, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
				const status = table.movePiece(x1y3, new Position2d({ x: pieceWidth, y: pieceHeight * 3 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y3)).to.be.true;
				expect(x1y1.hasChild(x1y3)).to.be.true;
				expect(x0y3.hasChildren()).to.be.false;
			});
			it('should move entire multi-piece to parent of target when moving a parent', () => {
				table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
				table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
				table.movePiece(x0y3, new Position2d({ x: pieceWidth * 3, y: pieceHeight }));
				table.movePiece(x1y3, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
				const status = table.movePiece(x0y3, new Position2d({ x: 0, y: pieceHeight * 3 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y3)).to.be.true;
				expect(x1y1.hasChild(x1y3)).to.be.true;
				expect(x0y3.hasChildren()).to.be.false;
			});
		});

		describe('and I connect with a parent of a multi-piece', () => {
			it('should move entire multi-piece to parent of target when moving a child', () => {
				table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
				table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
				table.movePiece(x0y0, new Position2d({ x: pieceWidth * 3, y: pieceHeight }));
				table.movePiece(x1y0, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
				const status = table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y0)).to.be.true;
				expect(x1y1.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChildren()).to.be.false;
			});
			it('should move entire multi-piece to parent of target when moving a parent', () => {
				table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));
				table.movePiece(x1y2, new Position2d({ x: pieceWidth, y: pieceHeight * 2 }));
				table.movePiece(x0y0, new Position2d({ x: pieceWidth * 3, y: pieceHeight }));
				table.movePiece(x1y0, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
				const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y0)).to.be.true;
				expect(x1y1.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChildren()).to.be.false;
			});
		});
	});

	describe('and when I have m multiple independent connections', () => {
		it('should make the correct connections', () => {
			// set of 2
			table.movePiece(x2y3, new Position2d({ x: pieceWidth * 2, y: pieceHeight * 3 }));
			table.movePiece(x3y3, new Position2d({ x: pieceWidth * 3, y: pieceHeight * 3 }));

			// set of 3
			table.movePiece(x1y1, new Position2d({ x: pieceWidth * 4, y: pieceHeight }));
			table.movePiece(x1y2, new Position2d({ x: pieceWidth * 4, y: pieceHeight * 2 }));
			table.movePiece(x1y3, new Position2d({ x: pieceWidth * 4, y: pieceHeight * 3 }));

			// single piece
			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));

			// move the child to make the double connection!!!
			const status = table.movePiece(x1y3, new Position2d({ x: pieceWidth, y: pieceHeight * 3 }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y1.hasChild(x2y3)).to.be.true;
			expect(x0y1.hasChild(x3y3)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x0y1.hasChild(x1y2)).to.be.true;
			expect(x0y1.hasChild(x1y3)).to.be.true;
			expect(x2y3.hasChildren()).to.be.false;
			expect(x1y1.hasChildren()).to.be.false;
		});

		it('should make the correct connection if piece connects to more than one piece in same family', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			table.movePiece(x1y0, new Position2d({ x: pieceWidth, y: 0 }));
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);

			table.movePiece(x0y1, new Position2d({ x: 0, y: pieceHeight }));
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
			expect(x0y1.parent).to.equal(x0y0);


			const status = table.movePiece(x1y1, new Position2d({ x: pieceWidth, y: pieceHeight }));

			expect(status instanceof StatusConnected).to.be.true;
			let children = '';
			x0y0.children.forEach((child) => children = children.concat(`[${child.ordinal.x},${child.ordinal.y}] `));
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x1y0.hasChildren()).to.be.false;
			expect(x0y1.hasChildren()).to.be.false;
			expect(x1y1.hasChildren()).to.be.false;
		});
	});
});