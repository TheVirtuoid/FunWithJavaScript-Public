import Piece from "../../../src/classes/Piece/Piece.js";

describe('When I create a new Piece', () => {
	it('should have a position', () => {
		const piece = new Piece({ position: { x: 1, y: 1 } });
		expect(piece.x).to.be.equal(1);
		expect(piece.y).to.be.equal(1);
	});
});
