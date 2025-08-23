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
				const snake = new Snake({ id: 'snake-test' });
				game.addSnake(snake);
				expect(game.getSnakeId()).to.equal('snake-test');
			});
		});
	});

	/*describe('And when I work with the "detect" events', () => {
		it('should process the DETECT_WALL_COLLISION event', () => {

		});
	});*/

});