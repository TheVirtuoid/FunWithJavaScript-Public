import Position2d from "../../src/classes/support/Position2d.js";

describe('When I work with the Position2d class', () => {
	it('should create a new Position2d with default x = 0, y = 0', () => {
		const position = new Position2d();
		expect(position).to.be.instanceOf(Position2d);
		expect(position.x).to.equal(0);
		expect(position.y).to.equal(0);
	});

	it('should return default for an invalid Position2d', () => {
		const position = new Position2d(null);
		expect(position).to.be.instanceOf(Position2d);
		expect(position.x).to.equal(0);
		expect(position.y).to.equal(0);
	});

	it('should create a new Position2d with x = 1, y = 2', () => {
		const position = new Position2d({ x: 1, y: 2 });
		expect(position.x).to.equal(1);
		expect(position.y).to.equal(2);
	});

	it('should return true for a valid Position2d', () => {
		expect(Position2d.valid({ x: 19, y: 22 })).to.be.true;
	});

	it('should return false for an invalid Position2d', () => {
		expect(Position2d.valid({ x: 19 })).to.be.false;
	});
});