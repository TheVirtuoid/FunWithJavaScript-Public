import StatusConnected from "../../../src/classes/support/Status/StatusConnected.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";
import Position2d from "../../../src/classes/support/Position2d.js";

describe('When working with the StatusConnected class', () => {
	it('should set the code to CONNECTED', () => {
		const fromPiece = new Piece();
		const toPiece = new Piece();
		const adjustment = new Position2d({ x: 1, y: -1 });
		const status = new StatusConnected({ fromPiece, toPiece, adjustment, piecesRemaining: 10 });
		expect(status.code).to.equal(Status.CONNECTED);
		expect(status.data).to.be.null;
		expect(status.fromPiece).to.equal(fromPiece);
		expect(status.toPiece).to.equal(toPiece);
		expect(status.adjustment.x).to.equal(1);
		expect(status.adjustment.y).to.equal(-1);
		expect(status.piecesRemaining).to.equal(10);
	});
});