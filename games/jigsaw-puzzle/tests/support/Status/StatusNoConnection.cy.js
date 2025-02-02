import StatusNoConnection from "../../../src/classes/support/Status/StatusNoConnection.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";

describe('When working with the StatusNoConnection class', () => {
	it('should set the code to NO_CONNECTION', () => {
		const piece = new Piece();
		const status = new StatusNoConnection({ piece });
		expect(status.code).to.equal(Status.NO_CONNECTION);
		expect(status.data).to.be.null;
		expect(status.piece).to.equal(piece);
	});
});