import Piece from "../../../src/classes/Piece/Piece.js";

describe('When I perform methods on a Piece', () => {
	it('should move to another position', () => {
		const piece = new Piece({ position: { x: 1, y: 1 } });
		piece.move({ x: 2, y: 2 });
		expect(piece.x).to.be.equal(2);
		expect(piece.y).to.be.equal(2);
	});
});