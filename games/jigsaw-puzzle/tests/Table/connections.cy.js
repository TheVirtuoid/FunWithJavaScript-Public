import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import Status from "../../src/classes/support/Status/Status.js";
import StatusConnected from "../../src/classes/support/Status/StatusConnected.js";
import StatusNoChange from "../../src/classes/support/Status/StatusNoChange.js";
import StatusMoved from "../../src/classes/support/Status/StatusMoved.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	let x0y0, x1y0, x2y0, x0y1, x1y1, x2y1, x0y2, x1y2, x2y2;

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

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
		x0y0 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 0 }));
		x1y0 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 0 }));
		x2y0 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 0 }));
		x0y1 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 1 }));
		x1y1 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 1 }));
		x2y1 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 1 }));
		x0y2 = table.getPieceByOrdinal(new Position2d({ x: 0, y: 2 }));
		x1y2 = table.getPieceByOrdinal(new Position2d({ x: 1, y: 2 }));
		x2y2 = table.getPieceByOrdinal(new Position2d({ x: 2, y: 2 }));
	});

	it('should not make a connection with no movement', () => {
		const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		expect(status instanceof StatusNoChange).to.be.true;
		expect(status.piece).to.equal(x0y0);
	});

	it('should not make a connection with movement', () => {
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
			table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 200 }));
			expect(status).to.be.instanceof(StatusConnected);
			const { piecesRemaining } = status;
			expect(piecesRemaining).to.equal(23);
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x0y1.parent).to.equal(x0y0);
		});

		it('should connect to a piece to the east', () => {
			table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x1y0.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x1y0);
		});

		it('should connect to a piece to the south', () => {
			table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.equal(x0y1);
		});

		it('should connect to a piece to the west', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			expect(status).to.be.instanceof(StatusConnected);
			expect(x0y0.hasChild(x1y0)).to.be.true;
			expect(x1y0.parent).to.equal(x0y0);
		});

		it('should connect to pieces north and east', () => {
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

	xdescribe('When I drop a single piece', () => {
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	xdescribe('When I drop a child of a multi-piece', () => {
		describe('And I connect with a single piece', () => {});
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	xdescribe('When I drop a parent of a multi-piece', () => {
		describe('And I connect with a single piece', () => {});
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	xdescribe('And when I am moving a multi-piece to a single piece', () => {
		describe('And when I am moving the parent piece', () => {
			xit('should only connect to the north', () => {});

			it('should only connect to the east', () => {});
			it('should only connect to the south', () => {});
			it('should only connect to the west', () => {});
		});

		describe('And when I am moving the child piece', () => {
			it('should only connect to the north', () => {});
			it('should only connect to the east', () => {});
			it('should only connect to the south', () => {});
			it('should only connect to the west', () => {});
		});
	});

	xdescribe('And when I am moving a multi-piece to a multi-piece', () => {
		describe('And when I am moving the parent piece', () => {
			describe('And when it connects to a child piece', () => {
				it('should only connect to the north', () => {});
				it('should only connect to the east', () => {});
				it('should only connect to the south', () => {});
				it('should only connect to the west', () => {});
			});

			describe('And when it connects to a parent piece', () => {
				it('should only connect to the north', () => {});
				it('should only connect to the east', () => {});
				it('should only connect to the south', () => {});
				it('should only connect to the west', () => {});
			});
		});

		xdescribe('And when I am moving the child piece', () => {
			describe('And when it connects to a child piece', () => {
				it('should only connect to the north', () => {});
				it('should only connect to the east', () => {});
				it('should only connect to the south', () => {});
				it('should only connect to the west', () => {});
			});

			describe('And when it connects to a parent piece', () => {
				it('should only connect to the north', () => {});
				it('should only connect to the east', () => {});
				it('should only connect to the south', () => {});
				it('should only connect to the west', () => {});
			});
		});
	});


});