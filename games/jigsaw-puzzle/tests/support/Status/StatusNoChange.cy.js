import StatusNoChange from "../../../src/classes/support/Status/StatusNoChange.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";

describe('When working with the StatusNoChange class', () => {
	it('should set the code to NO_CHANGE', () => {
		const piece = new Piece();
		const status = new StatusNoChange({ piece });
		expect(status.code).to.equal(Status.NO_CHANGE);
		expect(status.data).to.be.null;
		expect(status.piece).to.equal(piece);
	});
});