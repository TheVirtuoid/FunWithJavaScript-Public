import Vector from "../Base/Vector.js";
import Vector2d from "./Vector2d.js";
import {Vector2} from "@babylonjs/core";

describe('When I work with the Vector2d class', () => {
	it('should derive from Vector', () => {
		const vector = new Vector2d(0, 0);
		expect(vector).to.be.instanceOf(Vector);
	});

	describe('And I work with the constructor', () => {
		it('should throw error if not two arguments', () => {
			expect(() => new Vector2d()).to.throw('Vector2d constructor requires two arguments: x and y');
			expect(() => new Vector2d(1)).to.throw('Vector2d constructor requires two arguments: x and y');
			expect(() => new Vector2d(1, 2, 3)).to.throw('Vector2d constructor requires two arguments: x and y');
		});

		it('should throw error if arguments are not numbers', () => {
			expect(() => new Vector2d(1, 'a')).to.throw('Both Vector2d arguments must be numeric');
			expect(() => new Vector2d('a', 1)).to.throw('Both Vector2d arguments must be numeric');
		});

		it('should create the vector', () => {
			const vector = new Vector2d(1, 2);
			expect(vector).to.be.instanceOf(Vector2d);
		});
	});

	describe('And I work with the properties', () => {
		let vector;
		beforeEach(() => {
			vector = new Vector2d(1, 2);
		});

		it('should throw error if trying to set x', () => {
			expect(() => vector.x = 3).to.throw();
		});

		it('should throw error if trying to set y', () => {
			expect(() => vector.y = 3).to.throw();
		});

		it('should return x and y as numbers', () => {
			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(2);
		});
	});

	describe('And I work with the static methods', () => {
		it('should return (0,0) for Zero()', () => {
			const vector = Vector2d.Zero();
			expect(vector.x).to.equal(0);
			expect(vector.y).to.equal(0);
		});

		it('should return (1,0) for Right()', () => {
			const vector = Vector2d.Right();
			expect(vector.x).to.equal(1);
			expect(vector.y).to.equal(0);
		});

		it('should return (-1,0) for Left()', () => {
			const vector = Vector2d.Left();
			expect(vector.x).to.equal(-1);
			expect(vector.y).to.equal(0);
		});

		it('should return (0,-1) for Up()', () => {
			const vector = Vector2d.Up();
			expect(vector.x).to.equal(0);
			expect(vector.y).to.equal(-1);
		});

		it('should return (0,1) for Down()', () => {
			const vector = Vector2d.Down();
			expect(vector.x).to.equal(0);
			expect(vector.y).to.equal(1);
		});

		it('should return (n,n) for Fill(n)', () => {
			const vector = Vector2d.Fill(3);
			expect(vector.x).to.equal(3);
			expect(vector.y).to.equal(3);
		});
	});

	describe('And I work with the public methods', () => {
		let baseVector;
		beforeEach(() => {
			baseVector = new Vector2d(1, 1);
		});

		describe('And I call add()', () => {
			it('should throw error if argument no vector2d', () => {
				expect(() => baseVector.add('bad')).to.throw('Argument must be an instance of Vector2d');
			});

			it('should add (1,2) and get (2,3)', () => {
				const vector = baseVector.add(new Vector2d(1, 2));
				expect(vector.x).to.equal(2);
				expect(vector.y).to.equal(3);
			});

			it('should add (1,-2) and get (2,-1)', () => {
				const vector = baseVector.add(new Vector2d(1, -2));
				expect(vector.x).to.equal(2);
				expect(vector.y).to.equal(-1);
			});

			it('should add (-1,2) and get (0,3)', () => {
				const vector = baseVector.add(new Vector2d(-1, 2));
				expect(vector.x).to.equal(0);
				expect(vector.y).to.equal(3);
			});

			it('should add (-1,-2) and get (0,-1)', () => {
				const vector = baseVector.add(new Vector2d(-1, -2));
				expect(vector.x).to.equal(0);
				expect(vector.y).to.equal(-1);
			});
		});

		describe('And I call multiply()', () => {
			it('should throw error if argument no vector2d', () => {
				expect(() => baseVector.multiply('bad')).to.throw('Argument must be an instance of Vector2d');
			});

			it('should multiply (1,2) and get (1,2)', () => {
				const vector = baseVector.multiply(new Vector2d(1, 2));
				expect(vector.x).to.equal(1);
				expect(vector.y).to.equal(2);
			});

			it('should multiply (1,-2) and get (1,-2)', () => {
				const vector = baseVector.multiply(new Vector2d(1, -2));
				expect(vector.x).to.equal(1);
				expect(vector.y).to.equal(-2);
			});

			it('should multiply (-1,2) and get (-1,2)', () => {
				const vector = baseVector.multiply(new Vector2d(-1, 2));
				expect(vector.x).to.equal(-1);
				expect(vector.y).to.equal(2);
			});

			it('should multiply (-1,-2) and get (-1,-2)', () => {
				const vector = baseVector.multiply(new Vector2d(-1, -2));
				expect(vector.x).to.equal(-1);
				expect(vector.y).to.equal(-2);
			});
		});

		describe('And I call subtract()', () => {
			it('should throw error if argument no vector2d', () => {
				expect(() => baseVector.subtract('bad')).to.throw('Argument must be an instance of Vector2d');
			});

			it('should subtract (1,2) and get (0,-1)', () => {
				const vector = baseVector.subtract(new Vector2d(1, 2));
				expect(vector.x).to.equal(0);
				expect(vector.y).to.equal(-1);
			});

			it('should subtract (1,-2) and get (0,3)', () => {
				const vector = baseVector.subtract(new Vector2d(1, -2));
				expect(vector.x).to.equal(0);
				expect(vector.y).to.equal(3);
			});

			it('should subtract (-1,2) and get (2,-1)', () => {
				const vector = baseVector.subtract(new Vector2d(-1, 2));
				expect(vector.x).to.equal(2);
				expect(vector.y).to.equal(-1);
			});

			it('should subtract (-1,-2) and get (2,3)', () => {
				const vector = baseVector.subtract(new Vector2d(-1, -2));
				expect(vector.x).to.equal(2);
				expect(vector.y).to.equal(3);
			});
		});

		describe('And I call equals()', () => {
			it('should throw error if argument no vector2d', () => {
				expect(() => baseVector.equals('bad')).to.throw('Argument must be an instance of Vector2d');
			});

			it('should return true for equal vectors', () => {
				expect(baseVector.equals(new Vector2d(1, 1))).to.be.true;
			});

			it('should return false for different vectors', () => {
				expect(baseVector.equals(new Vector2d(2, 1))).to.be.false;
				expect(baseVector.equals(new Vector2d(1, 2))).to.be.false;
				expect(baseVector.equals(new Vector2d(2, 2))).to.be.false;
			});
		});

		describe('And when I call compareTo', () => {
			beforeEach(() => {
				baseVector = new Vector2d(5, 5);
			});

			it('should return -1, 0 when x1 < x2 and y1 = y2', () => {
				const vector = new Vector2d(6, 5);
				expect(baseVector.compareTo(vector).equals(new Vector2d(-1, 0))).to.be.true;
			});

			it('should return 0, 1 when x1 = x2 and y1 > y2', () => {
				const vector = new Vector2d(5, 4);
				expect(baseVector.compareTo(vector).equals(new Vector2d(0, 1))).to.be.true;
			});

			it('should return 1, -1 when x1 > x2 and y1 < y2', () => {
				const vector = new Vector2d(4, 6);
				expect(baseVector.compareTo(vector).equals(new Vector2d(1, -1))).to.be.true;
			});
		});

		describe('And when I call inBounds', () => {
			beforeEach(() => {
				baseVector = new Vector2d(5, 5);
			});

			it('should return false if number < 0', () => {
				let vector = new Vector2d(-1, 3);
				expect(baseVector.inBounds(vector)).to.be.false;
				vector = new Vector2d(3, -1);
				expect(baseVector.inBounds(vector)).to.be.false;
			});

			it('should return false if number >= upperbound', () => {
				let vector = new Vector2d(5, 3);
				expect(baseVector.inBounds(vector)).to.be.false;
				vector = new Vector2d(3, 5);
				expect(baseVector.inBounds(vector)).to.be.false;
			});

			it('should return true for other instances', () => {
				let vector = new Vector2d(0, 0);
				expect(baseVector.inBounds(vector)).to.be.true;
				vector = new Vector2d(4, 4);
				expect(baseVector.inBounds(vector)).to.be.true;
			});
		});

		describe('And when I call isInside', () => {
			beforeEach(() => {
				baseVector = new Vector2d(5, 5);
			});

			it('should return false if number <= 0', () => {
				let vector = new Vector2d(0, 3);
				expect(baseVector.isInside(vector)).to.be.false;
				vector = new Vector2d(3, 0);
				expect(baseVector.isInside(vector)).to.be.false;
			});

			it('should return false if number >= upperbound - 1', () => {
				let vector = new Vector2d(4, 3);
				expect(baseVector.isInside(vector)).to.be.false;
				vector = new Vector2d(3, 4);
				expect(baseVector.isInside(vector)).to.be.false;
			});

			it('should return true for other instances', () => {
				let vector = new Vector2d(1, 1);
				expect(baseVector.isInside(vector)).to.be.true;
				vector = new Vector2d(3, 3);
				expect(baseVector.isInside(vector)).to.be.true;
			});
		});

		describe('And when I call isPerimeter', () => {
			beforeEach(() => {
				baseVector = new Vector2d(5, 5);
			});

			it('should return false if number != 0', () => {
				let vector = new Vector2d(1, 3);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(3, 1);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(-1, 3);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(3, -1);
				expect(baseVector.isPerimeter(vector)).to.be.false;
			});

			it('should return false if number !== upperbound - 1', () => {
				let vector = new Vector2d(5, 3);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(3, 5);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(3, 3);
				expect(baseVector.isPerimeter(vector)).to.be.false;
				vector = new Vector2d(3, 3);
				expect(baseVector.isPerimeter(vector)).to.be.false;
			});

			it('should return true for anything on perimeter', () => {
				let vector = new Vector2d(0, 3);
				expect(baseVector.isPerimeter(vector)).to.be.true;
				vector = new Vector2d(3, 0);
				expect(baseVector.isPerimeter(vector)).to.be.true;
				vector = new Vector2d(4, 3);
				expect(baseVector.isPerimeter(vector)).to.be.true;
				vector = new Vector2d(3, 4);
				expect(baseVector.isPerimeter(vector)).to.be.true;
			});
		});

		describe('And when I call fill', () => {
			it('should fill a vector with the number', () => {
				const vector = baseVector.fill(3);
				expect(vector.equals(new Vector2d(3, 3))).to.be.true;
			});
		});

		describe('And I call the methods with no arguments', () => {
			it('should clone the vector', () => {
				const vector = baseVector.clone();
				expect(vector).not.to.be.equal(baseVector);
				expect(vector.equals(baseVector)).to.be.true;
			});

			it('should output the vector as a string', () => {
				const outputVector = baseVector.toString();
				expect(outputVector).to.equal('(1,1)');
			});
		});

		describe('And when I call opposite', () => {
			it('should return an opposite', () => {
				const vector = baseVector.opposite();
				expect(vector.equals(new Vector2d(baseVector.x * -1, baseVector.x * -1))).to.be.true;
			});
		});

	});
});
