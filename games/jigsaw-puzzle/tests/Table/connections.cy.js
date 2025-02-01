import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import Status from "../../src/classes/support/Status.js";

describe('When I attempt to connect pieces together', () => {
	let table;
	const X0Y0 = new Position2d({ x: 0, y: 0 });
	const X1Y0 = new Position2d({ x: 1, y: 0 });
	const X2Y0 = new Position2d({ x: 2, y: 0 });
	const X0Y1 = new Position2d({ x: 0, y: 1 });
	const X1Y1 = new Position2d({ x: 1, y: 1 });
	const X2Y1 = new Position2d({ x: 2, y: 1 });

	let x0y0, x1y0, x2y0, x0y1, x1y1, x2y1;

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
		x0y0 = table.getPieceByOrdinal(X0Y0);
		x1y0 = table.getPieceByOrdinal(X1Y0);
		x2y0 = table.getPieceByOrdinal(X2Y0);
		x0y1 = table.getPieceByOrdinal(X0Y1);
		x1y1 = table.getPieceByOrdinal(X1Y1);
		x2y1 = table.getPieceByOrdinal(X2Y1);
	});

	xit('should connect a piece to the north', () => {
		table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
		const status = table.movePiece(x0y1, new Position2d({ x: 100, y: 200 }));
		expect(status.code).to.equal(Status.CONNECTED);
		expect(status.connections.length).to.equal(1);
		const connection = status.getConnection(0);
		expect(connection.child).to.equal(x0y1);
		expect(connection.parent).to.equal(x0y0);
		expect(x0y0.children.length).to.equal(1);
		expect(x0y0.children[0]).to.equal(x0y1);
		expect(x0y0.parent).to.be.null;
		expect(x0y1.children.length).to.equal(0);
		expect(x0y1.parent).to.equal(x0y0);
	});

	/** we don't need to check for parent/children anymore since the previous test covers that */
	xit('should connect a piece to the east', () => {
		table.movePiece(x1y0, new Position2d({ x: 200, y: 100 }));
		const status = table.movePiece(x0y0, new Position2d({ x: 100, y: 100 }));
		expect(status.connections.length).to.equal(1);
		const connection = status.getConnection(0);
		expect(connection.child).to.equal(x0y0);
		expect(connection.parent).to.equal(x1y0);
	});

	xit('should connect a piece to the south', () => {
		table.movePiece(x0y1, new Position2d({ x: 100, y: 100 }));
		const status = table.movePiece(x0y0, new Position2d({ x: 100, y: 0 }));
		expect(status.connections.length).to.equal(1);
		const connection = status.getConnection(0);
		expect(connection.child).to.equal(x0y0);
		expect(connection.parent).to.equal(x0y1);
	});

	xit('should connect a piece to the west', () => {
		table.movePiece(x0y0, new Position2d({ x: 0, y: 0 }));
		const status = table.movePiece(x1y0, new Position2d({ x: 100, y: 0 }));
		expect(status.connections.length).to.equal(1);
		const connection = status.getConnection(0);
		expect(connection.child).to.equal(x1y0);
		expect(connection.parent).to.equal(x0y0);
	});

	describe('And when I am moving a multi-piece to a single piece', () => {
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

	describe('And when I am moving a multi-piece to a multi-piece', () => {
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

		describe('And when I am moving the child piece', () => {
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