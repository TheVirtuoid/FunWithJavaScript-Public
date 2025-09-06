import {MockGame, MockVector} from "../../tdd-utilities/tddUtilities.js";
import Snake from "./Snake.js";

describe('And when I work with the Snake class', () => {
	const position = new MockVector(5,5);
	const direction = MockVector.Down();
	const speed = 2;
	const length = 3;
	const id = 'snake-test';

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
		expect(snake.length).to.equal(0);
		expect(snake.speed).to.equal(1);
	});

	describe('And when I work with the Public properties', () => {
		let snake;
		beforeEach(() => {
			snake = new Snake({ position, direction, speed, length, id });
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

		describe('And when I work with "body"', () => {
			it('should return the correct positions', () => {
				const body = snake.body;
				expect(body[0].equals(new MockVector(5, 5 - speed * 3))).to.be.true;
				expect(body[1].equals(new MockVector(5, 5 - speed * 2))).to.be.true;
				expect(body[2].equals(new MockVector(5, 5 - speed))).to.be.true;
			});
			it('should throw exception if trying to change body', () => {
				expect(() => snake.body = 'bad').to.throw();
			});
		});

		describe('and when I work with "speed"', () => {
			it('should set the speed', () => {
				expect(snake.speed).to.equal(speed);
			});

			it('should throw exception if trying to change speed', () => {
				expect(() => snake.speed = 5).to.throw();
			});
		});

		describe('and when I work with "length"', () => {
			it('should set the length', () => {
				expect(snake.length).to.equal(length);
			});

			it('should throw exception if trying to change length', () => {
				expect(() => snake.length = 5).to.throw();
			});

			it('should return three body segments in the opposite direction', () => {
				const oppositeDirection = direction.opposite();
				let testPosition = new MockVector(5, 5 - speed);
				let segment = snake.getBodySegmentAt(2);
				expect(segment.position.equals(testPosition)).to.be.true;
				expect(segment.direction.equals(oppositeDirection)).to.be.true;
				testPosition = new MockVector(5, 5 - speed * 2);
				segment = snake.getBodySegmentAt(1);
				expect(segment.position.equals(testPosition)).to.be.true;
				expect(segment.direction.equals(oppositeDirection)).to.be.true;
				testPosition = new MockVector(5, 5 - speed * 3);
				segment = snake.getBodySegmentAt(0);
				expect(segment.position.equals(testPosition)).to.be.true;
				expect(segment.direction.equals(oppositeDirection)).to.be.true;
			});

			it('should return undefined if index is out of range', () => {
				let segment = snake.getBodySegmentAt(-1);
				expect(segment).to.be.undefined;
				segment = snake.getBodySegmentAt(3);
				expect(segment).to.be.undefined;
			});


		});
	});

	describe('And when I work with the Public methods', () => {
		const position = new MockVector(5,5);
		const direction = MockVector.Right();
		const speed = 1;
		const body0Position = new MockVector(4,5);
		const body1Position = new MockVector(3,5);
		const body2Position = new MockVector(3,4);
		const body3Position = new MockVector(3,3);
		const body0Direction = MockVector.Right();
		const body1Direction = MockVector.Right();
		const body2Direction = MockVector.Down();
		const body3Direction = MockVector.Down();
		let snake;

		describe('and when I try to change the speed of the snake', () => {
			beforeEach(() => {
				snake = new Snake({ position, direction, speed });
			});

			it('should throw error if not a number', () => {
				expect(() => snake.setSpeed('bad')).to.throw();
			});

			it('should NOT change the speed if 0 or less', () => {
				snake.setSpeed(0);
				expect(snake.speed).to.equal(speed);
				snake.setSpeed(-1);
				expect(snake.speed).to.equal(speed);
			});

			it('should change the speed of the snake', () => {
				snake.setSpeed(2);
				expect(snake.speed).to.equal(2);
			});
		});

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
				expect(() => snake.grow({ position: 'bad', direction: bodyDirection })).to.throw(`'position' argument must be an instance of Vector`);
			});

			it('should throw exception if direction is not a vector', () => {
				expect(() => snake.grow({ position: bodyPosition, direction: 'bad' })).to.throw(`'direction' argument must be an instance of Vector`);
			});

			it('should grow a body segment to the snake', () => {
				snake.grow({ position: bodyPosition, direction: bodyDirection });
				expect(snake.length).to.equal(1);
				const segment = snake.getBodySegmentAt(0);
				expect(segment.position.equals(bodyPosition)).to.be.true;
				expect(segment.direction.equals(bodyDirection)).to.be.true;
			});
		});

		describe('And when I move the snake', () => {
			beforeEach(() => {
				snake = new Snake({ position, direction });
				snake.grow({ position: body3Position, direction: body3Direction });
				snake.grow({ position: body2Position, direction: body2Direction });
				snake.grow({ position: body1Position, direction: body1Direction });
				snake.grow({ position: body0Position, direction: body0Direction });
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

		describe('And when I perform getProjectedPosition()', () => {
			beforeEach(() => {
				snake = new Snake({ position, direction, speed });
			});

			it('should return the position as if a move() occurred', () => {
				const projectedPosition = snake.getProjectedPosition();
				const fill = direction.fill(speed);
				const expectedPosition = position.add(direction.multiply(fill));
				expect(projectedPosition.equals(expectedPosition)).to.be.true;
			});

			it('should throw error if speed is not a number', () => {
				expect(() => snake.getProjectedPosition('bad')).to.throw();
			});

			it('should return the projected position based on given speed', () => {
				const speed = 3;
				const multiplier = direction.fill(speed);
				const projectedPosition = snake.getProjectedPosition(speed);
				const expectedPosition = position.add(direction.multiply(multiplier));
				expect(projectedPosition.equals(expectedPosition)).to.be.true;
			});
		});
	});

});