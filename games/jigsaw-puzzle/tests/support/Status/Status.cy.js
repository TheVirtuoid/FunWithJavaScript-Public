import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";

describe('When I work with the Status class', () => {
	it('should set the appropriate defaults', () => {
		const status = new Status();
		expect(status.code).to.equal(Status.NOOP);
		expect(status.data).to.be.null;
	});

	it('should set some data', () => {
		const status = new Status({ data: 1 });
		expect(status.data).to.equal(1);
	});
});

