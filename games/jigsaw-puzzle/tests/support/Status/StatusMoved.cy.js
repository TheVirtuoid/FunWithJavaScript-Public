import StatusMoved from "../../../src/classes/support/Status/StatusMoved.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";
import Position2d from "../../../src/classes/support/Position2d.js";

describe('When working with the StatusMoved class', () => {
	it('should set the code to NO_CONNECTION', () => {
		const piece = new Piece();
		const status = new StatusMoved({ piece, newPosition: new Position2d({x: 10, y: 10 }) });
		expect(status.code).to.equal(Status.MOVED);
		expect(status.data).to.be.null;
		expect(status.piece).to.equal(piece);
		expect(status.newPosition.x).to.equal(10);
		expect(status.newPosition.y).to.equal(10);
		expect(status.piecesRemaining).to.be.null;
	});
});