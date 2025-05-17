import V3 from "../../src/classes/V3/V3.js";
import Track from "../../src/classes/Track/Track.js";

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

	describe('And when I work with the methods', () => {
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

		it('should return the correct new position', () => {
			const vector = new V3(1, 1, 1);
			const startingPosition = new V3(0, 0, 0);
			const newPosition = vector.setDirectedPosition(startingPosition, 5);
			expect(newPosition.x).to.be.closeTo(2.8868, 0.0001); // 1/sqrt(3) * 5
			expect(newPosition.y).to.be.closeTo(2.8868, 0.0001);
			expect(newPosition.z).to.be.closeTo(2.8868, 0.0001);
		});

		it('should correctly compare two vectors', () => {
			const vector1 = new V3(1, 2, 3);
			const vector2 = new V3(1, 2, 3);
			const vector3 = new V3(4, 5, 6);
			expect(vector1.compareTo(vector2)).to.be.true;
			expect(vector1.compareTo(vector3)).to.be.false;
		});

		it('should set the right coordinates', () => {
			const vector = new V3(1, 2, 3);
			const test = [1, 2, 3];
			const result = vector.coordinates();
			expect(result).to.deep.equal(test);
		})

		it('should clone', () => {
			const vector = new V3(1, 2, 3);
			const clone = vector.clone();
			expect(clone.compareTo(vector)).to.be.true;
		});

		describe('And I work with perpendicular()', () => {
			it('should return a perpendicular vector on x-axis', () => {
				const vector = new V3(1, 0, 2);
				const perpendicular = vector.perpendicular(V3.PERPENDICULAR_NEGATIVE);
				expect(perpendicular.x).to.equal(-2);
				expect(perpendicular.y).to.equal(0);
				expect(perpendicular.z).to.equal(1);
			});

			it('should return a perpendicular vector on z-axis', () => {
				const vector = new V3(2, 0, 1);
				const perpendicular = vector.perpendicular(V3.PERPENDICULAR_POSITIVE);
				expect(perpendicular.x).to.equal(1);
				expect(perpendicular.y).to.equal(0);
				expect(perpendicular.z).to.equal(-2);
			});

			it('should throw error if trying to perpendicular on a zero vector', () => {
				const vector = new V3(0, 0, 0);
				expect( () => vector.perpendicular(V3.PERPENDICULAR_POSITIVE)).to.throw();
			});

			it('should throw error if thar argument is invalid', () => {
				const vector = new V3(0, 0, 1);
				expect( () => vector.perpendicular('baddie')).to.throw();
			});

		});
	});

	describe('And when I work with curving vectors', () => {
		it('should throw an error if the curve is not a number', () => {
			const vector = new V3(1, 0, 0);
			expect(() => vector.getDirectionVectorFromDegrees('a', V3.DIRECTION_POSITIVE)).to.throw('V3.getDirectionVectorFromDegrees: curve must be a number');
		});
		it('should throw error is direction if not V3.DIRECTION_POSITIVE or V3.DIRECTION_NEGATIVE', () => {
			const vector = new V3(1, 0, 0);
			expect(() => vector.getDirectionVectorFromDegrees(90, 'a')).to.throw('V3.getDirectionVectorFromDegrees: direction must be V3.DIRECTION_POSITIVE or V3.DIRECTION_NEGATIVE');
		});

		// POSITIVE directions are clockwise
		// NEGATIVE directions are counter-clockwise
		describe('And when I work with 90 degree curves', () => {
			describe('And when I work with positive curves', () => {
				it('should correctly calculate from an X-Positive direction', () => {
					const vector = new V3(1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(1, 0.0001);
				});
				it('should correctly calculate from an X-Negative direction', () => {
					const vector = new V3(-1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(-1, 0.0001);
				});
				it('should correctly calculate from an Z-Positive direction', () => {
					const vector = new V3(0, 0, 1);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(-1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an Z-Negative direction', () => {
					const vector = new V3(0, 0, -1);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
			});

			describe('And when I work with negative curves', () => {
				it('should correctly calculate from an X-Positive direction', () => {
					const vector = new V3(1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(-1, 0.0001);
				});
				it('should correctly calculate from an X-Negative direction', () => {
					const vector = new V3(-1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(1, 0.0001);
				});
				it('should correctly calculate from an Z-Positive direction', () => {
					const vector = new V3(0, 0, 1);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an Z-Negative direction', () => {
					const vector = new V3(0, 0, -1);
					const direction = vector.getDirectionVectorFromDegrees(90, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(-1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
			});
		});

		describe('And when I work with 180 degree curves', () => {
			describe('And when I work with positive curves', () => {
				it('should correctly calculate from an X-Positive direction', () => {
					const vector = new V3(1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(-1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an X-Negative direction', () => {
					const vector = new V3(-1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an Z-Positive direction', () => {
					const vector = new V3(0, 0, 1);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(-1, 0.0001);
				});
				it('should correctly calculate from an Z-Negative direction', () => {
					const vector = new V3(0, 0, -1);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_POSITIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(1, 0.0001);
				});
			});

			describe('And when I work with negative curves', () => {
				it('should correctly calculate from an X-Positive direction', () => {
					const vector = new V3(1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(-1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an X-Negative direction', () => {
					const vector = new V3(-1, 0, 0);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(1, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(0, 0.0001);
				});
				it('should correctly calculate from an Z-Positive direction', () => {
					const vector = new V3(0, 0, 1);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(-1, 0.0001);
				});
				it('should correctly calculate from an Z-Negative direction', () => {
					const vector = new V3(0, 0, -1);
					const direction = vector.getDirectionVectorFromDegrees(180, V3.DIRECTION_NEGATIVE);
					expect(direction.x).to.be.closeTo(0, 0.0001);
					expect(direction.y).to.be.closeTo(0, 0.0001);
					expect(direction.z).to.be.closeTo(1, 0.0001);
				});
			});
		});
	});
});