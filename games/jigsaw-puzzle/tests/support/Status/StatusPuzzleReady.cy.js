import StatusPuzzleReady from "../../../src/classes/support/Status/StatusPuzzleReady.js";
import Status from "../../../src/classes/support/Status/Status.js";

describe('When working with the StatusPuzzleReady class', () => {
	it('should set the code to PUZZLE_READY', () => {
		const status = new StatusPuzzleReady({piecesRemaining: 10});
		expect(status.code).to.equal(Status.PUZZLE_READY);
		expect(status.piecesRemaining).to.equal(10);
		expect(status.data).to.be.null;
	});

});