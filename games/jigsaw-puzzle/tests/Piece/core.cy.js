import Piece from "../../src/classes/Piece/Piece.js";
import Table from "../../../../Utilities/Table.js";

describe('When I create a new Piece', () => {
	it('should have a position', () => {
		const piece = new Piece({ position: { x: 1, y: 1 }, ordinal: { x: 2, y: 2 }});
		expect(piece.x).to.be.equal(1);
		expect(piece.y).to.be.equal(1);
		expect(piece.ordinal.x).to.be.equal(2);
		expect(piece.ordinal.y).to.be.equal(2);
		expect(piece.id).to.equal('2-2');
	});
});
