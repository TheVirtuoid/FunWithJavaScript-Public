import Status from "../../src/classes/support/Status.js";

describe('When I work with the Status class', () => {
	it('should set the appropriate defaults', () => {
		const status = new Status();
		expect(status.code).to.equal(Status.NOOP);
		expect(status.data).to.be.null;
	});

	it('should set the code to PUZZLE_READY', () => {
		const status = new Status({ code: Status.PUZZLE_READY });
		expect(status.code).to.equal(Status.PUZZLE_READY);
		expect(status.data).to.be.null;
	});

	it('should set the data to 1', () => {
		const status = new Status({ data: 1 });
		expect(status.code).to.equal(Status.NOOP);
		expect(status.data).to.equal(1);
	});

	it('should set both the code and the data', () => {
		const status = new Status({ code: Status.PUZZLE_READY, data: 1 });
		expect(status.code).to.equal(Status.PUZZLE_READY);
		expect(status.data).to.equal(1);
	});

});