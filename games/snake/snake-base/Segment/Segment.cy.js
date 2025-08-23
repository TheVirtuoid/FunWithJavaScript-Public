import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Segment from "./Segment.js";
import Game from "../Game/Game.js";

const game = new Game({ vectorFactory: MockVector });
const vectorFactory = game.vectorFactory;

describe('And when I work with the Segment class', () => {

	it('should create an instance of Segment with default properties', () => {
		const segment = new Segment();
		expect(segment.position.equals(MockVector.Zero())).to.be.true;
		expect(segment.direction.equals(MockVector.Up())).to.be.true;
		expect(segment.id).to.be.a('string');
	});

	it('should throw error if stated position is not a vector', () => {
		expect(() => new Segment({ position: 'bad' })).to.throw(`'position' property must be an instance of Vector`);
	});

	it('should throw error if stated direction is not a vector', () => {
		expect(() => new Segment({ direction: 'bad' })).to.throw(`'direction' property must be an instance of Vector`);
	});

	describe('And I work with the Public properties', () => {
		let position = new MockVector(1, 2);
		let direction = MockVector.Down();
		let id = 'test-segment';
		let segment;

		beforeEach(() => {
			segment = new Segment({ position, direction, id });
		});

		describe('And I work with "id"', () => {
			it('should return current id', () => {
				expect(segment.id).to.equal(id);
			});

			it('should throw error if attempt to change value', () => {
				expect(() => segment.id = 'new-id').to.throw();
			});
		});

		describe('And I work with "position"', () => {
			it('should return current position as Vector', () => {
				expect(segment.position.equals(position)).to.be.true;
			});

			it('should throw error if attempt to change value', () => {
				expect(() => segment.position = new MockVector()).to.throw();
			});
		});

		describe('And I work with "direction"', () => {
			it('should return current direction as Vector', () => {
				expect(segment.direction.equals(direction)).to.be.true;
			});

			it('should throw error if attempt to change value', () => {
				expect(() => segment.direction = new MockVector()).to.throw();
			});
		});
	});

	describe('And I work with the Public methods', () => {
		let position = new MockVector(1, 2);
		let direction = MockVector.Down();
		let segment;

		beforeEach(() => {
			segment = new Segment({position, direction});
		});

		describe('And when I work with the move() method', () => {
			it('should update the position based on the direction using default', () => {
				segment.move();
				const expectedPosition = position.add(direction);
				expect(segment.position.equals(expectedPosition)).to.be.true;
			});

			it('should update the position based on the direction using speed', () => {
				segment.move(2);
				const multiplier = position.fill(2);
				const adder = direction.multiply(multiplier);
				const expectedPosition = position.add(adder);
				expect(segment.position.equals(expectedPosition)).to.be.true;
			});
		});

		describe('And I use the changeDirection() method', () => {
			it('should throw an error if newDirection is not a Vector', () => {
				expect(() => segment.changeDirection('bad')).to.throw(`'newDirection' argument must be an instance of Vector`);
			});

			it('should set the new direction', () => {
				const newDirection = MockVector.Left();
				segment.changeDirection(newDirection);
				expect(segment.direction.equals(newDirection)).to.be.true;
			});
		});

	});
});