import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Game from "./Game.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "../Pitch/Pitch.js";
import Snake from "../Snake/Snake.js";

describe('And when I work with the Game class', () => {
	let game;
	let vectorFactory = MockVector;

	beforeEach(() => {
		game = new Game({ vectorFactory });
	});

	it('should throw an error if no vectorFactory is provided', () => {
		expect(() => new Game()).to.throw(`'vectorFactory' property must be specified`);
	});

	it('should have a vectorFactory property', () => {
		expect(game.vectorFactory).to.equal(vectorFactory);
	});

	it('should have the gameEventInitialized', () => {
		expect(game.gameEventInitialized).to.be.true;
	});

	describe('And when I work with the Public methods', () => {
		describe('And when addPitch() is called', () => {
			it('should throw an error if no pitch is provided', () => {
				expect(() => game.addPitch()).to.throw(`'pitch' argument must be an instance of Pitch`);
			});

			it('should add a pitch to the game', () => {
				const pitch = new Pitch({ dimensions: new MockVector(10, 10), id: 'pitch-test' });
				game.addPitch(pitch);
				expect(game.getPitchId()).to.equal('pitch-test');
				expect(game.pitchDimensions.equals(new MockVector(10, 10))).to.be.true;
			});
		});

		describe('And when addPSnake() is called', () => {
			it('should throw an error if no snake is provided', () => {
				expect(() => game.addSnake()).to.throw(`'snake' argument must be an instance of Snake`);
			});

			it('should add a snake to the game', () => {
				const position = new MockVector(5, 5);
				const direction = MockVector.Right();
				const snake = new Snake({ position, direction, id: 'snake-test' });
				game.addSnake(snake);
				expect(game.getSnakeId()).to.equal('snake-test');
				expect(game.getSnakePosition().equals(position)).to.be.true;
				expect(game.getSnakeDirection().equals(direction)).to.be.true;
			});
		});
	});

	describe('And when I handle the input events', () => {
		const pitch = new Pitch({ dimensions: new MockVector(10, 10), id: 'pitch-test' });
		const game = new Game({ vectorFactory: MockVector });
		const startPosition = new MockVector(5,5);
		const startSpeed = 1;
		const startDirection = MockVector.Right();
		GameEvent.Setup(game);
		game.addPitch(pitch);

		beforeEach(() => {
			console.log('----before each----');
			const snake = new Snake({ position: startPosition, direction: startDirection, speed: startSpeed, id: 'snake-test' });
			game.addSnake(snake);
		});

		describe('And when I move the snake', () => {
			it('should move with current direction', () => {
				console.log('--start test');
				console.log(game.getSnakePosition());
				const newPosition = startPosition.add(startDirection.multiply(vectorFactory.Fill(startSpeed)));
				GameEvent.Emit(GameEvent.INPUT_MOVE);
				expect(game.getSnakePosition().position.equals(newPosition)).to.be.true;
			});

			xit('should move with new direction', () => {
				const newDirection = MockVector.Up();
				const newPosition = startPosition.add(newDirection.multiply(vectorFactory.Fill(startSpeed)));
				GameEvent.Emit(GameEvent.INPUT_MOVE, newDirection);
				expect(game.getSnakePosition().position.equals(newPosition)).to.be.true;
			});
			/*describe('And when I test for colliding with walls', () => {
				it('should collide with the right wall', () => {
					snake.move()
				});
			});
			describe('ANd when I test for colliding with self', () => {});
			describe('And when I test for colliding with prize', () => {});*/
		});

	});
});