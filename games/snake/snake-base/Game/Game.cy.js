import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Game from "./Game.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";
import Prize from "../Prize/Prize.js";
import PrizeType from "../Prize/PrizeType.js";
import Vector from "../Vector/Base/Vector.js";

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

		describe('And when addSnake() is called', () => {
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

		describe('And when moveSnake() is called', () => {
			beforeEach(() => {
				const snake = new Snake({ position, direction, length: 1, id: 'snake-test' });
				const pitch = new Pitch({ dimensions });
				game.addSnake(snake);
				game.addPitch(pitch);
			});

			it('should move the snake', () => {
				game.moveSnake();
				const newPosition = position.clone().add(direction);
				expect(game.snakePosition.equals(newPosition)).to.be.true;
			});

			it('should move the snake with speed', () => {
				game.moveSnake(2);
				const newPosition = position.clone().add(direction).add(direction);
				expect(game.snakePosition.equals(newPosition)).to.be.true;
			});
		});

		describe('And when changeSnakeDirection() is called', () => {
			beforeEach(() => {
				const snake = new Snake({ position, direction, length: 1, id: 'snake-test' });
				game.addSnake(snake);
			});

			it('should change the direction', () => {
				const newDirection = MockVector.Up();
				game.changeSnakeDirection(newDirection);
				expect(game.snakeDirection.equals(newDirection)).to.be.true;
			});
		});

		describe('And when generatePrize() is called', () => {
			const snake = new Snake({ position, direction, length: 1, id: 'snake-test' });
			const pitch = new Pitch({ dimensions });

			it('should throw an error if no pitch is provided', () => {
				game.addSnake(snake);
				expect(() => game.generatePrize()).to.throw();
			});

			it('should throw an error if no snake is provided', () => {
				game.addPitch(pitch);
				expect(() => game.generatePrize()).to.throw();
			});

			it('should generate a prize', () => {
				game.addSnake(snake);
				game.addPitch(pitch);
				game.generatePrize();
				expect(game.prizeValue).to.equal(PrizeType.DEFAULT_VALUE);
				expect(game.prizeType).to.equal(PrizeType.DEFAULT_TYPE);
				expect(game.prizePosition).to.be.instanceof(Vector);
			});

		});

	});

	describe('And when I handle the events', () => {
		let game;

		beforeEach(() => {
			const startPosition = new MockVector(5,5);
			const startSpeed = 1;
			const startDirection = MockVector.Right();
			const snake = new Snake({ position: startPosition, direction: startDirection, speed: startSpeed, length: 4, id: 'snake-test' });
			const pitch = new Pitch({ dimensions: new MockVector(10, 10), id: 'pitch-test' });
			game = new Game({ id: 'game-test' });
			game.addPitch(pitch);
			game.addSnake(snake);
			game.generatePrize();
			cy.spy(game, 'emit').as('emit');
		});

		describe('And onGameOver fires', () => {
			it('should fire when GameEvent.SNAKE_COLLISION_WALL is called', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					GameEvent.Emit(GameEvent.SNAKE_COLLISION_WALL);
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.GAME_OVER);
			});
			
			it('should fire when GameEvent.SNAKE_COLLISION_SELF is called', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					GameEvent.Emit(GameEvent.SNAKE_COLLISION_SELF);
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.GAME_OVER);
			});
			
			it('should fire when GameEvent.GAME_EXIT is called', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					GameEvent.Emit(GameEvent.GAME_EXIT);
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.GAME_OVER);
			});
			
			it('should fire when GameEvent.GAME_RESET is called', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					GameEvent.Emit(GameEvent.GAME_RESET);
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.GAME_OVER);
			});
		});

		describe('And onSnakeCollisionWall fires', () => {
			it('should NOT fire the event!', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.moveSnake(); //6,5
					game.moveSnake(); //7,5
					game.moveSnake(); //8,5
				});
				cy.get('@emit').then((spy) => {
					expect(spy).not.to.have.been.calledWith(GameEvent.SNAKE_COLLISION_WALL);
				});
			});

			it('should fire the event when the snake hits the wall to the east', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.moveSnake(); //6,5
					game.moveSnake(); //7,5
					game.moveSnake(); //8,5
					game.moveSnake(); //9,5
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_WALL);
			});

			it('should fire the event when the snake hits the wall to the west', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.changeSnakeDirection(MockVector.Up());
					game.moveSnake(); //5,4
					game.changeSnakeDirection(MockVector.Left());
					game.moveSnake(); //4,4
					game.moveSnake(); //3,4
					game.moveSnake(); //2,4
					game.moveSnake(); //1,4
					game.moveSnake(); //0,4
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_WALL);
			});

			it('should fire the event when the snake hits the wall to the north', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.changeSnakeDirection(MockVector.Up());
					game.moveSnake(); // 5,4
					game.moveSnake(); // 5,3
					game.moveSnake(); // 5,2
					game.moveSnake(); // 5,1
					game.moveSnake(); // 5,0
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_WALL);
			});

			it('should fire the event when the snake hits the wall to the south', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.changeSnakeDirection(MockVector.Down());
					game.moveSnake(); // 5,6
					game.moveSnake(); // 5,7
					game.moveSnake(); // 5,8
					game.moveSnake(); // 5,9
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_WALL);
			});
		});

		describe('And onSnakeCollisionSelf fires', () => {
			it('should NOT fire the event!', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.moveSnake(); //6,5
				});
				cy.get('@emit').then((spy) => {
					expect(spy).not.to.have.been.calledWith(GameEvent.SNAKE_COLLISION_SELF);
				});
			});

			it('should fire the event when the snake hits itself', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.changeSnakeDirection(MockVector.Up());
					game.moveSnake(); //5,4
					game.changeSnakeDirection(MockVector.Left());
					game.moveSnake(); //4,4. Body should be at (3,5) (4,5) (5,5) (5,4)
					game.changeSnakeDirection(MockVector.Down());
					game.moveSnake(); //4,5 Should collide with body
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_SELF);
			});
		});

		describe('And onSnakeCollisionPrize fires', () => {
			let prizePosition;

			beforeEach(() => {
				prizePosition = game.prizePosition;
				console.log(prizePosition);
			});
			it('should fire the onSnakeCollisionPRize event', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					// move until you get to Y
					const difference = prizePosition.subtract(game.snakePosition);
					const multiplier = new MockVector(difference.x < 0 ? -1 : 1, difference.y < 0 ? -1 : 1);
					game.changeSnakeDirection(multiplier.y === -1 ? MockVector.Up() : MockVector.Down());
					for (let i = 0; i < Math.abs(difference.y); i++) {
						game.moveSnake();
					}
					game.changeSnakeDirection(multiplier.x === -1 ? MockVector.Left() : MockVector.Right());
					for (let i = 0; i < Math.abs(difference.x); i++) {
						game.moveSnake();
					}
					// should have hit the prize on the last move!
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_PRIZE);
			});
		});

		describe('And onSnakeMove fires', () => {
			it('should fire the onSnakeMove event', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.moveSnake();
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_MOVE);
			});
		});

		describe('And onSnakeDirectionChanged fires', () => {
			it('should fire the onSnakeDirectionChange event', () => {
				cy.get('@emit').then((spy) => spy.resetHistory());
				cy.then(() => {
					game.changeSnakeDirection(MockVector.Up());
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_DIRECTION_CHANGED);
			});
		});

		describe('And onInputChangeDirection fires', () => {});

		describe('And onGameExit fires', () => {
		});

		describe('And onGamePause fires', () => {
		});

		describe('And onGameResume fires', () => {
		});

		describe('And onGameReset fires', () => {
		});

		describe('And onGameStart fires', () => {
		});
	});
});