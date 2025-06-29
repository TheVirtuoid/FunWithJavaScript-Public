import Position from "../src/classes/Position.js";

describe('When I work with the Position class', () => {
	let position;

	beforeEach(() => {
		position = new Position(10, 20);
	});

	describe('Initial properties', () => {
		it('should have the correct x-coordinate', () => {
			expect(position.x).to.equal(10);
		});

		it('should have the correct y-coordinate', () => {
			expect(position.y).to.equal(20);
		});
	});

	describe('And when I work with the coordinates', () => {
		it('should change the x-coordinate', () => {
			position.x = 30;
			expect(position.x).to.equal(30);
		});
		it('should change the y-coordinate', () => {
			position.y = 40;
			expect(position.y).to.equal(40);
		});
	});

	describe('clone method', () => {
		it('should return a new Position object with the same coordinates', () => {
			const clonedPosition = position.clone();
			expect(clonedPosition).to.not.equal(position);
			expect(clonedPosition.x).to.equal(position.x);
			expect(clonedPosition.y).to.equal(position.y);
		});
	});

});
