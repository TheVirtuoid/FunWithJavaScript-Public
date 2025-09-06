import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Game from "./Game.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";

describe('And when I work with the Game class', () => {
	const id = 'test-game';
	let game;

	beforeEach(() => {
		game = new Game({ id });
	});

	it('should have the gameEventInitialized', () => {
		const game = new Game();
		expect(game.gameEventInitialized).to.be.true;
		expect(game.id).to.be.a('string');
	});

	describe('And when I work with properties', () => {
		describe('And when I work with the id property', () => {
			it('should correctly set the id', () => {
				expect(game.id).to.equal(id);
			});

			it('should throw error if trying to set the id', () => {
				expect(() => game.id = 'bad').to.throw();
			});
		});

		describe('And when I work with the other read-only properties', () => {
			it('should have snakePosition as undefined', () => {
				expect(game.snakePosition).to.be.undefined;
			});
			it('should have snakeDirection as undefined', () => {
				expect(game.snakeDirection).to.be.undefined;
			});
			it('should have snakeBody as undefined', () => {
				expect(game.snakeBody).to.be.undefined;
			});
			it('should have pitchDimensions as undefined', () => {
				expect(game.pitchDimensions).to.be.undefined;
			});

			it('should throw error if trying to set snakePosition', () => {
				expect(() => game.snakePosition = new MockVector(1,1)).to.throw();
			});

			it('should throw error if trying to set snakeDirection', () => {
				expect(() => game.snakeDirection = new MockVector(1,1)).to.throw();
			});

			it('should throw error if trying to set snakeBody', () => {
				expect(() => game.snakeBody = [new MockVector(1,1)]).to.throw();
			});

			it('should throw error if trying to set pitchDimensions', () => {
				expect(() => game.pitchDimensions = new MockVector(1,1)).to.throw();
			});
		});
	});

	describe('And when I work with the Public methods', () => {
		const id = 'test-game';
		const position = new MockVector(5, 5);
		const dimensions = new MockVector(10, 10);
		const direction = MockVector.Right();
		const length = 2;
		let game;

		beforeEach(() => {
			game = new Game({ id });
		});

		describe('And when addPitch() is called', () => {
			it('should throw an error if no pitch is provided', () => {
				expect(() => game.addPitch()).to.throw(`'pitch' argument must be an instance of Pitch`);
			});

			it('should add a pitch to the game', () => {
				const pitch = new Pitch({ dimensions });
				game.addPitch(pitch);
				expect(game.pitchDimensions.equals(dimensions)).to.be.true;
			});
		});

		describe('And when addPSnake() is called', () => {
			it('should throw an error if no snake is provided', () => {
				expect(() => game.addSnake()).to.throw(`'snake' argument must be an instance of Snake`);
			});

			it('should add a snake to the game', () => {
				const snake = new Snake({ position, direction, length, id: 'snake-test' });
				game.addSnake(snake);
				expect(game.snakePosition.equals(position)).to.be.true;
				expect(game.snakeDirection.equals(direction)).to.be.true;
				expect(game.snakeBody.length).to.equal(length);
			});
		});
	});

	/*describe('And when I handle the input events', () => {
		const pitch = new Pitch({ dimensions: new MockVector(10, 10), id: 'pitch-test' });
		const game = new Game({ vectorFactory: MockVector });
		const startPosition = new MockVector(5,5);
		const startSpeed = 1;
		const startDirection = MockVector.Right();
		game.addPitch(pitch);

		beforeEach(() => {
			const snake = new Snake({ position: startPosition, direction: startDirection, speed: startSpeed, id: 'snake-test' });
			game.addSnake(snake);
		});

		describe('And when I move the snake', () => {
			it('should move with current direction', () => {
				const newPosition = startPosition.add(startDirection.multiply(vectorFactory.Fill(startSpeed)));
				game.emit(GameEvent.INPUT_MOVE);
				expect(game.getSnakePosition().equals(newPosition)).to.be.true;
			});

			it('should move with new direction', () => {
				const newDirection = MockVector.Up();
				const newPosition = startPosition.add(newDirection.multiply(vectorFactory.Fill(startSpeed)));
				game.emit(GameEvent.INPUT_MOVE, newDirection);
				expect(game.getSnakePosition().equals(newPosition)).to.be.true;
				expect(game.getSnakeDirection().equals(newDirection)).to.be.true;
			});

			describe('And when I test for colliding with walls', () => {
				it('should collide with the right wall', () => {
					game.emit(GameEvent.INPUT_MOVE);
					game.emit(GameEvent.INPUT_MOVE);
					game.emit(GameEvent.INPUT_MOVE); // moves to (8,5)
					cy.spy(GameEvent, 'Emit').as('collisionSpy');
					game.emit(GameEvent.INPUT_MOVE); // moves to (9,5) - collision
					cy.get('@collisionSpy').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_WALL);
				});
			});
			describe('ANd when I test for colliding with self', () => {});
			describe('And when I test for colliding with prize', () => {});
		});

	});*/
});