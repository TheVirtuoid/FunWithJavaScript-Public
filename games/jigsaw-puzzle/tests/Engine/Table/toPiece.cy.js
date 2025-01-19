import Table from "../../../src/classes/Table/Table.js";
import Piece from "../../../src/classes/Piece/Piece.js";

describe('When I send communications to a piece', () => {
	let table;
	let piece;

	beforeEach(() => {
		table = new Table();
		piece = table.addPiece({ position: { x: 1, y: 1 } });
	});

	it('should create a new piece', () => {
		expect(piece).to.be.instanceOf(Piece);
	});

	it('should move a piece', () => {
		piece.move({ x: 2, y: 2 });
		expect(piece.x).to.be.equal(2);
		expect(piece.y).to.be.equal(2);
	});
});
