import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import Status from "../../src/classes/support/Status/Status.js";
import StatusConnected from "../../src/classes/support/Status/StatusConnected.js";
import StatusNoChange from "../../src/classes/support/Status/StatusNoChange.js";
import StatusMoved from "../../src/classes/support/Status/StatusMoved.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	let x0y0, x1y0, x2y0, x3y0, x4y0, x5y0;
	let x0y1, x1y1, x2y1, x3y1, x4y1, x5y1;
	let x0y2, x1y2, x2y2, x3y2, x4y2, x5y2;
	let x0y3, x1y3, x2y3, x3y3, x4y3, x5y3;

	/**
	 * Single piece
	 * 		single piece
	 * 			by itself
	 * 			+ single piece (s)
	 * 			+ child of multi-piece
	 * 			+ parent of multi-piece
	 * 		child of multi-piece
	 * 		parent of multi-piece
	 * 		multi-connect
	 * 			single piece
	 * 			child of multi-piece
	 * 			parent of multi-piece
	 *
	 * 	Multipiece - child
	 * 		single piece
	 * 		child of multi-piece
	 * 		parent of multi-piece
	 * 		multi-connect
	 * 			single piece
	 * 			child of multi-piece
	 * 			parent of multi-piece
	 *
	 * 	Multipiece - parent
	 * 		single piece
	 * 		child of multi-piece
	 * 		parent of multi-piece
	 * 		multi-connect
	 * 			single piece
	 * 			child of multi-piece
	 * 			parent of multi-piece
	 */

	/*const generate = () => {
		const table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
		const x0y0 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 0 }));
		const x1y0 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 0 }));
		const x2y0 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 0 }));
		const x0y1 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 1 }));
		const x1y1 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 1 }));
		const x2y1 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 1 }));
		const x0y2 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 2 }));
		const x1y2 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 2 }));
		const x2y2 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 2 }));
		return { table, x0y0, x1y0, x2y0, x0y1, x1y1, x2y1, x0y2, x1y2, x2y2 };
	}*/

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
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
	});

	it('should not make a connection with no movement', () => {
		// const { table, x0y0 } = generate();
		const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		expect(status instanceof StatusNoChange).to.be.true;
		expect(status.piece).to.equal(x0y0);
	});

	it('should not make a connection with movement', () => {
		// const { table, x0y0 } = generate();
		let status = table.movePiece(x0y0, new Position2d({ x: -1000, y: 8000 }));
		expect(status instanceof StatusMoved).to.be.true;
		expect(status.piece).to.equal(x0y0);
		expect(status.newPosition.x).to.equal(0);
		expect(status.newPosition.y).to.equal(300);
		status = table.movePiece(x0y0, new Position2d({ x: 1000, y: -8000 }));
		expect(status instanceof StatusMoved).to.be.true;
		expect(status.piece).to.equal(x0y0);
		expect(status.newPosition.x).to.equal(500);
		expect(status.newPosition.y).to.equal(0);
	});

	describe('When I want to check for directional connections', () => {
		it('should connect to a piece to the north', () => {
			// const { table, x0y0, x0y1 } = generate();
			table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 200 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(23);
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x0y1.parent).to.equal(x0y0);
		});

		it('should connect to a piece to the east', () => {
			// const { table, x0y0, x1y0 } = generate();
			table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x1y0.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x1y0);
		});

		it('should connect to a piece to the south', () => {
			// const { table, x0y0, x0y1 } = generate();
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x0y1);
		});

		it('should connect to a piece to the west', () => {
			// const { table, x0y0, x1y0 } = generate();
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces north and east', () => {
			// const { table, x0y0, x0y1, x1y1 } = generate();
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			// east should be the parent of both north and piece
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x1y1.hasChild(x0y0)).to.be.true;
			expect(x1y1.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x1y1);
			expect(x0y1.parent).to.equal(x1y1);
			expect(x0y0.hasChildren()).to.be.false;	// we test this since x0y0 would have been a parent of x0y1 at one point
		});

		it('should connect to pieces north and south', () => {
			// const { table, x0y0, x0y1, x0y2 } = generate();
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x0y2, new Position2d({ x: 0, y: 200 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x0y2.hasChild(x0y0)).to.be.true;
			expect(x0y2.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x0y2);
			expect(x0y1.parent).to.equal(x0y2);
		});

		it('should connect to pieces north and west', () => {
			// const { table, x1y0, x0y1, x1y1 } = generate();
			table.movePiece(x1y0, new Position2d({x : 100, y: 0 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces east and south', () => {
			// const { table, x0y0, x0y1, x1y0 } = generate();
			table.movePiece(x1y0, new Position2d({x : 100, y: 0 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x0y0.parent).to.equal(x0y1);
		});

		it('should connect to pieces east and west', () => {
			// const { table, x0y0, x2y0, x1y0 } = generate();
			table.movePiece(x2y0, new Position2d({x : 200, y: 0 }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x0y0.hasChild(x2y0)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
			expect(x2y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces south and west', () => {
			// const { table, x0y0, x1y0, x1y1 } = generate();
			table.movePiece(x1y1, new Position2d({x : 100, y: 100 }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(22);
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
			expect(x1y1.parent).to.equal(x0y0);
		});

		it('should connect to pieces north, east, and south', () => {
			// const { table, x0y0, x0y1, x1y1, x0y2 } = generate();
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			table.movePiece(x0y2, new Position2d({ x: 0, y: 200 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(21);
			expect(x0y2.hasChild(x0y0)).to.be.true;
			expect(x0y2.hasChild(x1y1)).to.be.true;
			expect(x0y2.hasChild(x0y1)).to.be.true;
			expect(x0y0.parent).to.equal(x0y2);
			expect(x1y1.parent).to.equal(x0y2);
			expect(x0y1.parent).to.equal(x0y2);
		});

		it('should connect to pieces north, east, and west', () => {
			// const { table, x1y0, x0y1, x1y1, x2y1 } = generate();
			table.movePiece(x1y0, new Position2d({x : 100, y: 0 }));
			table.movePiece(x2y1, new Position2d({ x: 200, y: 100 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(21);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x2y1)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x2y1.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces north, south, and west', () => {
			// const { table, x1y0, x0y1, x1y1, x1y2 } = generate();
			table.movePiece(x1y0, new Position2d({x : 100, y: 0 }));
			table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(21);
			expect(x0y1.hasChild(x1y0)).to.be.true;
			expect(x0y1.hasChild(x1y2)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x1y0.parent).to.equal(x0y1);
			expect(x1y2.parent).to.equal(x0y1);
			expect(x1y1.parent).to.equal(x0y1);
		});

		it('should connect to pieces east, south, and west', () => {
			// const { table, x0y0, x2y0, x1y1, x1y0 } = generate();
			table.movePiece(x2y0, new Position2d({x : 200, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(21);
			expect(x0y0.hasChild(x2y0)).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x2y0.parent).to.equal(x0y0);
			expect(x1y1.parent).to.equal(x0y0);
			expect(x1y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces north, south, east, and west', () => {
			// const { table, x1y0, x0y1, x1y1, x2y1, x1y2 } = generate();
			table.movePiece(x1y0, new Position2d({x : 100, y: 0 }));
			table.movePiece(x2y1, new Position2d({ x: 200, y: 100 }));
			table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(20);
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
			// const { table, x1y0, x0y0, x1y1 } = generate();
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const status = table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
		});
		it('should connect as a child when the target is a parent of a multi-piece', () => {
			// const { table, x1y0, x0y0, x0y1 } = generate();
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y0.hasChild(x0y1)).to.be.true;
		});
	});


	describe('When I work with multi-pieces', () => {
		describe('And I connect with a single piece', () => {
			it('should move the entire multi-piece as children of the target piece when moving child and child connects', () => {
				// const { table, x1y0, x0y0, x2y0 } = generate();
				table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				table.movePiece(x2y0, new Position2d({ x: 200, y: 100 }));
				table.movePiece(x1y0, new Position2d({ x: 100, y: 100 }));
				const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x0y0.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChild(x2y0)).to.be.true;
				expect(x2y0.hasChildren()).to.be.false;
			});
			it('should move the entire multi-piece as children of the target piece when moving change and parent connects', () => {
				// const { table, x1y0, x0y0, x2y0 } = generate();
				table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				table.movePiece(x1y0, new Position2d({ x: 100, y: 100 }));
				table.movePiece(x2y0, new Position2d({ x: 200, y: 100 }));
				const status = table.movePiece(x2y0, new Position2d({ x: 200, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x0y0.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChild(x2y0)).to.be.true;
				expect(x1y0.hasChildren()).to.be.false;
			});
		});

		describe('and I connect with a child of a multi-piece', () => {
			it('should move entire multi-piece to parent of target when moving a child', () => {
				table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
				table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
				table.movePiece(x0y3, new Position2d({ x: 300, y: 100 }));
				table.movePiece(x1y3, new Position2d({ x: 400, y: 100 }));
				const status = table.movePiece(x1y3, new Position2d({ x: 100, y: 300 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y3)).to.be.true;
				expect(x1y1.hasChild(x1y3)).to.be.true;
				expect(x0y3.hasChildren()).to.be.false;
			});
			it('should move entire multi-piece to parent of target when moving a parent', () => {
				table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
				table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
				table.movePiece(x0y3, new Position2d({ x: 300, y: 100 }));
				table.movePiece(x1y3, new Position2d({ x: 400, y: 100 }));
				const status = table.movePiece(x0y3, new Position2d({ x: 0, y: 300 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y3)).to.be.true;
				expect(x1y1.hasChild(x1y3)).to.be.true;
				expect(x0y3.hasChildren()).to.be.false;
			});
		});

		describe('and I connect with a parent of a multi-piece', () => {
			it('should move entire multi-piece to parent of target when moving a child', () => {
				table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
				table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
				table.movePiece(x0y0, new Position2d({ x: 300, y: 100 }));
				table.movePiece(x1y0, new Position2d({ x: 400, y: 100 }));
				const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
				expect(status instanceof StatusConnected).to.be.true;
				expect(x1y1.hasChild(x1y2)).to.be.true;
				expect(x1y1.hasChild(x0y0)).to.be.true;
				expect(x1y1.hasChild(x1y0)).to.be.true;
				expect(x0y0.hasChildren()).to.be.false;
			});
			it('should move entire multi-piece to parent of target when moving a parent', () => {
				table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
				table.movePiece(x1y2, new Position2d({ x: 100, y: 200 }));
				table.movePiece(x0y0, new Position2d({ x: 300, y: 100 }));
				table.movePiece(x1y0, new Position2d({ x: 400, y: 100 }));
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
			table.movePiece(x2y3, new Position2d({ x: 200, y: 300 }));
			table.movePiece(x3y3, new Position2d({ x: 300, y: 300 }));

			// set of 3
			table.movePiece(x1y1, new Position2d({ x: 400, y: 100 }));
			table.movePiece(x1y2, new Position2d({ x: 400, y: 200 }));
			table.movePiece(x1y3, new Position2d({ x: 400, y: 300 }));

			// single piece
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));

			// move the child to make the double connection!!!
			const status = table.movePiece(x1y3, new Position2d({ x: 100, y: 300 }));
			expect(status instanceof StatusConnected).to.be.true;
			expect(x0y1.hasChild(x2y3)).to.be.true;
			expect(x0y1.hasChild(x3y3)).to.be.true;
			expect(x0y1.hasChild(x1y1)).to.be.true;
			expect(x0y1.hasChild(x1y2)).to.be.true;
			expect(x0y1.hasChild(x1y3)).to.be.true;
			expect(x2y3.hasChildren()).to.be.false;
			expect(x1y1.hasChildren()).to.be.false;
		});
	});
});