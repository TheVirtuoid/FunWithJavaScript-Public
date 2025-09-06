import Head from './Head.js';
import Vector from "../Vector/Base/Vector.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Game from "../Game/Game.js";
import {MockVector} from "../../tdd-utilities/tddUtilities.js";
import Pitch from "../Pitch/Pitch.js";

const game = new Game({ vectorFactory: MockVector });
const vectorFactory = game.vectorFactory;
game.addPitch(new Pitch({ dimensions: new MockVector(10, 10), id: 'pitch-test' }));
GameEvent.Setup(game);


describe('When I work with the Head class', () => {
	const position = new MockVector(5, 5);
	const direction = MockVector.Up();

	describe('And I work with the constructor', () => {
		it('should create an instance of Head with default properties', () => {
			const head = new Head();
			expect(head.position.equals(MockVector.Zero())).to.be.true;
			expect(head.direction.equals(MockVector.Up())).to.be.true;
		});
	});

	describe('And I work with the Public properties', () => {
		let position = new MockVector(1, 2);
		let direction = MockVector.Down();
		let head;

		beforeEach(() => {
			head = new Head({ position, direction });
		});

		describe('And I work with "position"', () => {
			it('should return current position as Vector', () => {
				expect(head.position.equals(position)).to.be.true;
			});

			it('should throw error if attempt to change value', () => {
				expect(() => head.position = new MockVector()).to.throw();
			});
		});

		describe('direction getter', () => {
			it('should return current direction as Vector', () => {
				expect(head.direction.equals(direction)).to.be.true;
			});

			it('should throw error if attempt to change value', () => {
				expect(() => head.direction = new MockVector()).to.throw();
			});
		});
	});

	describe('move() method', () => {
		let position = new MockVector(3, 3);
		let direction = MockVector.Down();
		let head;

		beforeEach(() => {
			head = new Head({ position, direction });
			GameEvent.Setup(game);
			cy.spy(GameEvent, 'Emit').as('gameEmit');
		});

		it('should throw error if speed is not a number', () => {
			expect(() => head.move('bad')).to.throw();
		});

		it('should move with default speed of 1', () => {
			head.move();
			expect(head.position.equals(new MockVector(3, 4))).to.be.true;
		});

		it('should move with specified speed', () => {
			head.move(2);
			expect(head.position.equals(new MockVector(3, 5))).to.be.true;
		});

		it('should trigger snake-move event', () => {
			head.move();
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.SNAKE_MOVE, head.position);
		});

	});


	describe('changeDirection() method', () => {
		let position = new MockVector(3, 3);
		let direction = MockVector.Down();
		let head;

		beforeEach(() => {
			head = new Head({ position, direction });
			cy.spy(GameEvent, 'Emit').as('gameEmit');
		});

		it('should throw error id newDirection is not a Vector', () => {
			expect(() => head.changeDirection(('bad'))).to.throw();
		});

		it('should change direction to valid new direction', () => {
			const newDirection = MockVector.Right();
			head.changeDirection(newDirection);
			expect(head.direction.equals(newDirection)).to.be.true;
		});

		it('should not allow direction opposite to current direction', () => {
			const oppositeDirection = direction.opposite();
			expect(() => head.changeDirection(oppositeDirection)).to.throw('Cannot change direction in the opposite direction');
		});

		it('should trigger snake-direction-changed event on valid change', () => {
			const newDirection = MockVector.Right();
			head.changeDirection(newDirection);
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.SNAKE_DIRECTION_CHANGED, head.direction);
		});

	});

	describe('jump() method', () => {
		let position = new MockVector(3, 3);
		let direction = MockVector.Down();
		let head;

		const newPosition = new MockVector(5, 5);
		const newDirection = MockVector.Right();

		beforeEach(() => {
			head = new Head({ position, direction });
			cy.spy(GameEvent, 'Emit').as('gameEmit');
		});

		it('should throw error if position is not a Vector', () => {
			expect(() => head.jump('bad', newDirection)).to.throw(`'position' argument must be an instance of Vector`);
		});

		it('should throw error if direction is not a Vector', () => {
			expect(() => head.jump(newPosition, 'bad')).to.throw(`'direction' argument must be an instance of Vector`);
		})

		it('should teleport to the specified position', () => {
			head.jump(newPosition, newDirection);
			expect(head.position.equals(newPosition)).to.be.true;
			expect(head.direction.equals(newDirection)).to.be.true;
		});

		it('should send out the event', () => {
			head.jump(newPosition, newDirection);
			cy.get('@gameEmit').should('have.been.calledWith', GameEvent.SNAKE_JUMPED, head.position, head.direction);
		});

	});

	describe('getProjectedPosition() method', () => {
		let position = new MockVector(3, 3);
		let direction = MockVector.Down();
		let head;

		beforeEach(() => {
			head = new Head({ position, direction });
			GameEvent.Setup(game);
			cy.spy(GameEvent, 'Emit').as('gameEmit');
		});

		it('should throw error if speed is not a number', () => {
			expect(() => head.getProjectedPosition('bad')).to.throw();
		});

		it('should get projected position with default speed of 1', () => {
			const newPosition = head.getProjectedPosition();
			expect(newPosition.equals(new MockVector(3, 4))).to.be.true;
		});

		it('should get projected position with specified speed', () => {
			const newPosition = head.getProjectedPosition(2);
			expect(newPosition.equals(new MockVector(3, 5))).to.be.true;
		});
	});
});