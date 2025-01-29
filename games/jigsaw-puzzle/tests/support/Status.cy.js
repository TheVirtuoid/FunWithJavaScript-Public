import Status from "../../src/classes/support/Status.js";
import Piece from "../../src/classes/Piece/Piece.js";

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

	it('should set a single connection', () => {
		const status = new Status({
			code: Status.CONNECTED,
			data: {
				connections: [ new Status() ],
				piecesRemaining: 10
			}
		});
		expect(status.connections).to.be.instanceOf(Array);
		expect(status.connections.length).to.equal(1);
		expect(status.piecesRemaining).to.equal(10);
	});

	it('should return a child/parent connection', () => {
		const child = new Piece();
		const parent = new Piece();
		const status = new Status({
			code: Status.CONNECTED,
			data: {
				connections: [ new Status({
					code: Status.CONNECTED,
					data: {
						child,
						distanceX: 100,
						distanceY: 200,
						parent
					}
				}) ],
				piecesRemaining: 10
			}
		});
		const data = status.getConnection(0);
		expect(data.child).to.equal(child);
		expect(data.distanceX).to.equal(100);
		expect(data.distanceY).to.equal(200);
		expect(data.parent).to.equal(parent);
	});

});