import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import Status from "../../src/classes/support/Status/Status.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	let x0y0, x1y0, x2y0, x0y1, x1y1, x2y1, x0y2, x1y2, x2y2;

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

	describe('When I want to check for directional connections', () => {
		it('should connect to a piece to the north', () => {
			table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 200 }));
			const { code, parent, numberOfPieces } = status;
			expect(code).to.equal(Status.CONNECTED);
			expect(parent).to.equal(x0y0);
			expect(x0y0.children.length).to.equal(1);
			expect(x0y0.children[0]).to.equal(x0y1);
			expect(x0y0.parent).to.be.null;
			expect(x0y1.children.length).to.equal(0);
			expect(x0y1.parent).to.equal(x0y0);
			expect(numberOfPieces).to.equal(23);
		});

		xit('should connect to a piece to the east', () => {
			table.movePiece(x1y0, new Position2d({ x: 200, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
			const { code, parent, numberOfPieces } = status;
			expect(code).to.equal(Status.CONNECTED);
			expect(parent).to.equal(x1y0);
			expect(x1y0.hasChild(x0y0)).to.be.true;
			expect(x1y0.parent).to.be.null;
			expect(x0y0.children.length).to.equal(0);
			expect(x0y0.parent).to.equal(x1y0);
			expect(numberOfPieces).to.equal(23);
		});

		xit('should connect to a piece to the south', () => {
			table.movePiece(x0y1, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y0, new Position2d({ x: 100, y: 0 }));
			const { code, parent, numberOfPieces } = status;
			expect(code).to.equal(Status.CONNECTED);
			expect(parent).to.equal(x0y1);
			expect(x0y1.hasChild(x0y0)).to.be.true;
			expect(x0y1.parent).to.be.null;
			expect(x0y0.children.length).to.equal(0);
			expect(x0y0.parent).to.equal(x0y1);
			expect(numberOfPieces).to.equal(23);
		});

		xit('should connect to a piece to the west', () => {
			table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
			const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
			const { code, parent, numberOfPieces } = status;
			expect(code).to.equal(Status.CONNECTED);
			expect(parent).to.equal(x0y0);
			expect(x0y0.hasChild(x0y0)).to.be.true;
			expect(x0y0.parent).to.be.null;
			expect(x1y0.children.length).to.equal(0);
			expect(x1y0.parent).to.equal(x0y0);
			expect(numberOfPieces).to.equal(23);
		});

		xit('should connect to pieces north and east', () => {
			table.movePiece(x0y0, new Position2d({x : 0, y: 0 }));
			table.movePiece(x1y1, new Position2d({ x: 100, y: 100 }));
			const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
			const { code, parent, numberOfPieces } = status;
			expect(code).to.equal(Status.CONNECTED);
			expect(parent).to.equal(x0y0);
			expect(x0y0.hasChild(x0y1)).to.be.true;
			expect(x0y0.hasChild(x1y1)).to.be.true;
			expect(x0y0.parent).to.be.null;
			expect(x0y1.children.length).to.equal(0);
			expect(x0y1.parent).to.equal(x0y0);
			expect(x0y2.children.length).to.equal(0);
			expect(x0y2.parent).to.equal(x0y0);
			expect(numberOfPieces).to.equal(22);
		});

		it('should connect to pieces north and south', () => {});

		it('should connect to pieces north and west', () => {});

		it('should connect to pieces east and south', () => {});

		it('should connect to pieces east and west', () => {});

		it('should connect to pieces south and west', () => {});

		it('should connect to pieces north, east, and south', () => {});

		it('should connect to pieces north, east, and west', () => {});

		it('should connect to pieces north, south, and west', () => {});

		it('should connect to pieces east, south, and west', () => {});

		it('should connect to pieces north, south, east, and west', () => {});
	});

	describe('When I drop a single piece', () => {
		describe('And I connect with a single piece', () => {});
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	describe('When I drop a child of a multi-piece', () => {
		describe('And I connect with a single piece', () => {});
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	describe('When I drop a parent of a multi-piece', () => {
		describe('And I connect with a single piece', () => {});
		describe('And I connect with a child of a multi-piece', () => {});
		describe('And I connect with a parent of a multi-piece', () => {});
	});

	xdescribe('And when I am moving a multi-piece to a single piece', () => {
		describe('And when I am moving the parent piece', () => {
			it('should only connect to the north', () => {
				table.movePiece(x0y1, new Position2d({ x: 0, y: 0 }));
				table.movePiece(x1y1, new Position2d({ x: 100, y: 0 }));
				table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
				const status = table.movePiece(x0y1, new Position2d({ x: 0, y: 100 }));
				expect(status.code).to.equal(Status.CONNECTED);
				console.log(status);
				expect(status.connections.length).to.equal(1);
				const connection = status.getConnection(0);
				expect(connection.child).to.equal(x0y1);
				expect(connection.parent).to.equal(x0y0);
				expect(x0y0.parent).to.be.null;
				expect(x0y0.children.length).to.equal(2);
				expect(x0y1.children.length).to.equal(0);
				expect(x0y1.parent).to.equal(x0y0);
				expect(x1y1.parent).to.equal(x0y0);
			});

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