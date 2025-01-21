import Table from "../../src/classes/Table/Table.js";
import Position2d from "../../src/classes/support/Position2d.js";
import Status from "../../src/classes/support/Status.js";

describe('When I perform methods on a Game', () => {
	it('should create a new Table', () => {});
	it('should create a new UI', () => {});
});

describe('When I get certain return values from a Table', () => {
	let table;
	beforeEach(() => {
		table = new Table();
		table.setDimensions(new Position2d({ x: 600, y: 400 }));
		table.setNumberOfPieces(24);
		table.cutPuzzle();
	});

	it('should return back a PuzzleReady status when the puzzle is ready', () => {
		const status = table.shufflePuzzle();
		expect(status.code).to.equal(Status.PUZZLE_READY);
		expect(status.data).to.be.null;
	});

	it('should return a no change status once I move a piece', () => {
		const piece = table.getPieceByIndex(0);
		const status = table.movePiece(piece, { x: 0, y: 0 });
		expect(status.code).to.equal(Status.NO_CHANGE);
		expect(status.data).to.equal(piece);
	});

	it('should return a position change status if I illegally move a piece', () => {
		const piece = table.getPieceByIndex(0);
		const status = table.movePiece(piece, { x: -1, y: -1 });
		expect(status.code).to.equal(Status.MOVED);
		expect(status.data).to.equal(piece);
	});

	it('should return a connection status if there is connection between two piece', () => {
		const piece1 = table.getPieceByIndex(0);
		const piece2 = table.getPieceByIndex(1);
		table.movePiece(piece1, { x: 0, y: 0 });
		const status = table.movePiece(piece2, { x: 100, y: 0 });
		const { code, data } = status;
		expect(code).to.equal(Status.CONNECTED);
		const piece = data.piece;
		expect(piece).to.equal(piece1);
		expect(piece.children.length).to.equal(1);
		expect(piece.children[0]).to.equal(piece2);
	});

	it('should return a connection status if there is connection between a double piece and a single piece', () => {});

	it('should return a connection status if there is connection between two double pieces', () => {});

	it('should return a game finished status one there is only one piece left', () => {});

});