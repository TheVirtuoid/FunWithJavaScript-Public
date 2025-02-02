import StatusGameFinished from "../../../src/classes/support/Status/StatusGameFinished.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";
import Position2d from "../../../src/classes/support/Position2d.js";

describe('When working with the StatusGameFinished class', () => {
	it('should set the code to GAME_FINISHED', () => {
		const fromPiece = new Piece();
		const toPiece = new Piece();
		const adjustment = new Position2d({ x: 1, y: -1 });
		const status = new StatusGameFinished({ fromPiece, toPiece, adjustment, piecesRemaining: 1 });
		expect(status.code).to.equal(Status.GAME_FINISHED);
		expect(status.data).to.be.null;
		expect(status.fromPiece).to.equal(fromPiece);
		expect(status.toPiece).to.equal(toPiece);
		expect(status.adjustment.x).to.equal(1);
		expect(status.adjustment.y).to.equal(-1);
		expect(status.piecesRemaining).to.equal(1);
	});
});