import StatusNoop from "../../../src/classes/support/Status/StatusNoop.js";
import Status from "../../../src/classes/support/Status/Status.js";

describe('When working with the StatusNoop class', () => {
	it('should set the code to NOOP', () => {
		const status = new StatusNoop();
		expect(status.code).to.equal(Status.NOOP);
		expect(status.data).to.be.null;
	});
});