import V3 from "../../src/classes/V3/V3.js";

describe('When I work with the V3 Class', () => {
	it('should instantiate the class', () => {
		const v3 = new V3(0, 0, 0);
		expect(v3).to.be.instanceOf(V3);
	});

	it('should throw error if not enough arguments are passed', () => {
		expect(() => new V3(1)).to.throw('V3 constructor: x, y, and z must be numbers');
	});

	it('should throw error if not arguments are not numbers', () => {
		expect(() => new V3(1, 1, 'a')).to.throw('V3 constructor: x, y, and z must be numbers');
		expect(() => new V3(1, 'a', 1)).to.throw('V3 constructor: x, y, and z must be numbers');
		expect(() => new V3('a', 1, 1)).to.throw('V3 constructor: x, y, and z must be numbers');
	});

	it('should have x, y, and z properties', () => {
		const v3 = new V3(1, 2, 3);
		expect(v3.x).to.equal(1);
		expect(v3.y).to.equal(2);
		expect(v3.z).to.equal(3);
	});

	it('should not be able to set any of the properties', () => {
		const v3 = new V3(1, 1, 3);
		expect(() => v3.x = 2).to.throw;
		expect(() => v3.y = 2).to.throw;
		expect(() => v3.z = 2).to.throw;
	});

	describe('normalize()', () => {
		it('should return a vector with a magnitude of 1', () => {
			const vector = new V3(3, 4, 0);
			const normalized = vector.normalize();
			const magnitude = Math.sqrt(normalized.x ** 2 + normalized.y ** 2 + normalized.z ** 2);
			expect(magnitude).to.be.closeTo(1, 0.0001);
		});

		it('should throw an error when normalizing a zero vector', () => {
			const vector = new V3(0, 0, 0);
			expect(() => vector.normalize()).to.throw('Cannot normalize a zero vector');
		});
	});

	describe('scale()', () => {
		it('should return a vector with the correct magnitude', () => {
			const vector = new V3(1, 0, 0);
			const scaled = vector.scale(5);
			expect(scaled.x).to.equal(5);
			expect(scaled.y).to.equal(0);
			expect(scaled.z).to.equal(0);
		});

		it('should throw an error for negative lengths', () => {
			const vector = new V3(1, 1, 1);
			expect(() => vector.scale(-1)).to.throw('Length must be a positive number');
		});
	});

	describe('setDirectedPosition()', () => {
		it('should return the correct new position', () => {
			const vector = new V3(1, 1, 1);
			const startingPosition = new V3(0, 0, 0);
			const newPosition = vector.setDirectedPosition(startingPosition, 5);
			expect(newPosition.x).to.be.closeTo(2.8868, 0.0001); // 1/sqrt(3) * 5
			expect(newPosition.y).to.be.closeTo(2.8868, 0.0001);
			expect(newPosition.z).to.be.closeTo(2.8868, 0.0001);
		});
	});

	describe('clone()', () => {
		it('should clone', () => {
			const vector = new V3(1, 2, 3);
			const clone = vector.clone();
			expect(clone.compareTo(vector)).to.be.true;
		});
	});
});