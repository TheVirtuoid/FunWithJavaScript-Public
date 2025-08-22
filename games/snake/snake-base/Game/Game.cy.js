import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Game from "./Game.js";

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
		expect(game.vectorFactory).to.be.instanceOf(vectorFactory);
	});

	describe('And when I work with the Public methods', () => {
		describe('And when addSnake() is called', () => {
			it('should throw an error if no snake is provided', () => {
				expect(() => game.addSnake()).to.throw(`'snake' argument must be an instance of Snake`);
			});

			it('should add a snake to the game', () => {
				const snake = new Snake({ game, vectorFactory, id: 'snake-test' });
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