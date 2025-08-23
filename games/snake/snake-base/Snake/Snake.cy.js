import {MockGame, MockVector} from "../../tdd-utilities/tddUtilities.js";
import Snake from "./Snake.js";

describe('And when I work with the Snake class', () => {
	const position = new MockVector(5,5);
	const direction = MockVector.Down();

	it('should throw error is position is not a vector', () => {
		expect(() => new Snake({ position: 'bad', direction })).to.throw(`'position' property must be an instance of Vector`);
	});

	it('should throw error is direction is not a vector', () => {
		expect(() => new Snake({ position, direction: 'bad' })).to.throw(`'direction' property must be an instance of Vector`);
	});

	it('should create an instance of Snake with default properties', () => {
		const snake = new Snake({ position, direction });
		expect(snake.id).to.be.a('string');
		expect(snake.position.equals(position)).to.be.true;
		expect(snake.direction.equals(direction)).to.be.true;
		expect(snake.numberOfBodySegments).to.equal(0);
	});

	describe('And when I work with the Public properties', () => {
		let snake;
		beforeEach(() => {
			snake = new Snake({ position, direction, id: 'snake-test' });
		});

		describe('and when I work with "id"', () => {
			it('should set the id', () => {
				expect(snake.id).to.equal('snake-test');
			});

			it('should throw exception if trying to change id', () => {
				expect(() => snake.id = 'new-id').to.throw();
			});

			it('should throw exception if trying to change position', () => {
				expect(() => snake.position = 'bad').to.throw();
			});

			it('should throw exception if trying to change direction', () => {
				expect(() => snake.direction = 'bad').to.throw();
			});
		});
	});

	describe('And when I work with the Public methods', () => {
		const position = new MockVector(5,5);
		const direction = MockVector.Right();
		const body0Position = new MockVector(4,5);
		const body1Position = new MockVector(3,5);
		const body2Position = new MockVector(3,4);
		const body3Position = new MockVector(3,3);
		const body0Direction = MockVector.Right();
		const body1Direction = MockVector.Right();
		const body2Direction = MockVector.Down();
		const body3Direction = MockVector.Down();
		let snake;

		describe('And when I grow a body segment', () => {
			const position = new MockVector(5,5);
			const direction = MockVector.Right();
			const bodyPosition = new MockVector(4,5);
			const bodyDirection = MockVector.Right();
			let snake;

			beforeEach(() => {
				snake = new Snake({ position, direction });
			});

			it('should throw error if position is not a vector', () => {
				expect(() => snake.growBody('bad', bodyDirection)).to.throw(`'position' argument must be an instance of Vector`);
			});

			it('should throw exception if direction is not a vector', () => {
				expect(() => snake.growBody(bodyPosition, 'bad')).to.throw(`'direction' argument must be an instance of Vector`);
			});

			it('should grow a body segment to the snake', () => {
				snake.growBody(bodyPosition, bodyDirection);
				expect(snake.numberOfBodySegments).to.equal(1);
				const segment = snake.getBodySegmentAt(0);
				expect(segment.position.equals(bodyPosition)).to.be.true;
				expect(segment.direction.equals(bodyDirection)).to.be.true;
			});
		});

		describe('And when I move the snake', () => {
			beforeEach(() => {
				snake = new Snake({ position, direction });
				snake.growBody(body3Position, body3Direction);
				snake.growBody(body2Position, body2Direction);
				snake.growBody(body1Position, body1Direction);
				snake.growBody(body0Position, body0Direction);
			});

			it('should move the distance of 1 (default)', () => {
				const multiplier = direction.fill(1);
				const newPosition = position.add(direction.multiply(multiplier));
				const newBody0Position = body0Position.add(body0Direction.multiply(multiplier));
				const newBody1Position = body1Position.add(body1Direction.multiply(multiplier));
				const newBody2Position = body2Position.add(body2Direction.multiply(multiplier));
				const newBody3Position = body3Position.add(body3Direction.multiply(multiplier));
				const newBody0Direction = direction.clone();
				const newBody1Direction = body0Direction.clone();
				const newBody2Direction = body1Direction.clone();
				const newBody3Direction = body2Direction.clone();
				snake.move();
				expect(snake.position.equals(newPosition)).to.be.true;
				let segment = snake.getBodySegmentAt(0);
				expect(segment.position.equals(newBody0Position)).to.be.true;
				expect(segment.direction.equals(newBody0Direction)).to.be.true;
				segment = snake.getBodySegmentAt(1);
				expect(segment.position.equals(newBody1Position)).to.be.true;
				expect(segment.direction.equals(newBody1Direction)).to.be.true;
				segment = snake.getBodySegmentAt(2);
				expect(segment.position.equals(newBody2Position)).to.be.true;
				expect(segment.direction.equals(newBody2Direction)).to.be.true;
				segment = snake.getBodySegmentAt(3);
				expect(segment.position.equals(newBody3Position)).to.be.true;
				expect(segment.direction.equals(newBody3Direction)).to.be.true;
			});

			it('should move the distance of 2 (default)', () => {
				const speed = 2;
				const multiplier = direction.fill(speed);
				const newPosition = position.add(direction.multiply(multiplier));
				const newBody0Position = body0Position.add(body0Direction.multiply(multiplier));
				const newBody1Position = body1Position.add(body1Direction.multiply(multiplier));
				const newBody2Position = body2Position.add(body2Direction.multiply(multiplier));
				const newBody3Position = body3Position.add(body3Direction.multiply(multiplier));
				const newBody0Direction = direction.clone();
				const newBody1Direction = body0Direction.clone();
				const newBody2Direction = body1Direction.clone();
				const newBody3Direction = body2Direction.clone();
				snake.move(speed);
				expect(snake.position.equals(newPosition)).to.be.true;
				let segment = snake.getBodySegmentAt(0);
				expect(segment.position.equals(newBody0Position)).to.be.true;
				expect(segment.direction.equals(newBody0Direction)).to.be.true;
				segment = snake.getBodySegmentAt(1);
				expect(segment.position.equals(newBody1Position)).to.be.true;
				expect(segment.direction.equals(newBody1Direction)).to.be.true;
				segment = snake.getBodySegmentAt(2);
				expect(segment.position.equals(newBody2Position)).to.be.true;
				expect(segment.direction.equals(newBody2Direction)).to.be.true;
				segment = snake.getBodySegmentAt(3);
				expect(segment.position.equals(newBody3Position)).to.be.true;
				expect(segment.direction.equals(newBody3Direction)).to.be.true;
			});
		});

		describe('And when I change the snake direction', () => {
			it('should throw error if new direction is not a vector', () => {
				snake = new Snake({ position, direction });
				expect(() => snake.changeDirection('bad')).to.throw(`'newDirection' argument must be an instance of Vector`);
			})

			it('should change directions', () => {
				const newDirection = MockVector.Up();
				snake = new Snake({ position, direction });
				snake.changeDirection(newDirection);
				expect(snake.direction.equals(newDirection)).to.be.true;
			})
		});
	});

});