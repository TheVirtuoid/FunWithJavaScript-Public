import Vector from './Vector'

describe('When I work with Vector', () => {
	let vector;

	beforeEach(() => {
		vector = new Vector();
	});

	describe('And I work with the Static Methods', () => {
		it('should throw an exception calling Zero()', () => {
			expect(() => Vector.Zero()).to.throw('Static method not implemented');
		});

		it('should throw an exception calling Right()', () => {
			expect(() => Vector.Right()).to.throw('Static method not implemented');
		});

		it('should throw an exception calling Left()', () => {
			expect(() => Vector.Left()).to.throw('Static method not implemented');
		});

		it('should throw an exception calling Up()', () => {
			expect(() => Vector.Up()).to.throw('Static method not implemented');
		});

		it('should throw an exception calling Down()', () => {
			expect(() => Vector.Down()).to.throw('Static method not implemented');
		});
	});

	describe('And I work with the Public Methods', () => {
		it('should throw an exception when calling add()', () => {
			expect(() => vector.add(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling subtract()', () => {
			expect(() => vector.subtract(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling clone()', () => {
			expect(() => vector.clone()).to.throw('Method not implemented');
		});

		it('should throw an exception when calling multiply()', () => {
			expect(() => vector.multiply(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling equals()', () => {
			expect(() => vector.equals(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling toString()', () => {
			expect(() => vector.toString()).to.throw('Method not implemented');
		});

		it('should throw an exception when calling compare()', () => {
			expect(() => vector.compare(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling inBounds()', () => {
			expect(() => vector.inBounds(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling compareInside()', () => {
			expect(() => vector.isInside(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling compareBounds()', () => {
			expect(() => vector.isPerimeter(new Vector())).to.throw('Method not implemented');
		});

		it('should throw an exception when calling fill()', () => {
			expect(() => vector.fill(1)).to.throw('Method not implemented');
		});

		it('should throw an exception when calling opposite()', () => {
			expect(() => vector.opposite()).to.throw('Method not implemented');
		});
	});
});