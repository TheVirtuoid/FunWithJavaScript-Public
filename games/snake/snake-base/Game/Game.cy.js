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

	});
	/*

	1. `#onGameOver()` - handles game over event.
    - sent by the following events:
2. `#onGameEventInitialized()` - handles game event initialized event.
3. `#onSnakeCollisionWall()` - handles snake collision with wall event.
4. `#onSnakeCollisionSelf()` - handles snake collision with self event.
5. `#onSnakeCollisionPrize(prize)` - handles snake collision with prize event.
   - `prize` (Prize) - the prize that was collided with.
6. `#onSnakeMove(newHead)` - handles snake move event.
   - `newHead` (Object) - the new head position of the snake.
7. `#onSnakeDirectionInvalid(direction)` - handles invalid snake direction event.
   - `direction` (String) - the invalid direction.
8. `#onSnakeDirectionChanged(newDirection)` - handles snake direction changed event.
   - `newDirection` (String) - the new direction of the snake.
9. `#onSnakeJumpInvalid(position)` - handles invalid snake jump event.
   - `position` (Object) - the position that was attempted to jump to.
10. `#onSnakeJumped(newHead)` - handles snake jumped event.
    - `newHead` (Object) - the new head position of the snake.
11. `#onSnakeReset()` - handles snake reset event.
12. `#onDetectWallCollision()` - handles detect wall collision event.
13. `#onDetectPrizeCollision()` - handles detect prize collision event.
14. `#onDetectSelfCollision()` - handles detect self collision event.
15. `#onInputMove(direction)` - handles input move event.
    - `direction` (String) - the direction to move.
16. `#onGameExit()` - handles when player manually stops the game.
17. `#onGamePause()` - handles when player pauses the game.
18. `#onGameResume()` - handles when player resumes the game.
19. `#onGameReset()` - handles when player resets the game.
20. `#onGameStart()` - handles when player starts the game.
	 */
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
					console.log('----------------------------------------------------------------------------------------------START');
					console.log('head start: ', game.snakePosition.toString(), ', direction: ', game.snakeDirection.toString());
					game.changeSnakeDirection(MockVector.Up());
					game.moveSnake(); //5,4
					console.log('----------------------after move');
					game.changeSnakeDirection(MockVector.Left());
					game.moveSnake(); //4,4. Body should be at (3,5) (4,5) (5,5) (5,4)
					console.log('----------------------after move');
					game.changeSnakeDirection(MockVector.Down());
					console.log('start with possible death');
					game.moveSnake(); //4,5 Should collide with body
					console.log('--------------------------------------------------------------------------------------------END');
				});
				cy.get('@emit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_SELF);
			});
		});

		describe('And onSnakeCollisionPrize fires', () => {
		});

		describe('And onSnakeMove fires', () => {
		});

		describe('And onSnakeDirectionInvalid fires', () => {
		});

		describe('And onSnakeDirectionChanged fires', () => {
		});

		describe('And onSnakeJumpInvalid fires', () => {
		});

		describe('And onSnakeJumped fires', () => {
		});

		describe('And onSnakeReset fires', () => {
		});

		describe('And onDetectWallCollision fires', () => {
		});

		describe('And onDetectPrizeCollision fires', () => {
		});

		describe('And onDetectSelfCollision fires', () => {
		});

		describe('And onInputMove fires', () => {
		});

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