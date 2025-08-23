import GameEvent from "../GameEvent/GameEvent.js";
import Pitch from "./Pitch.js";
import { MockVector } from "../../tdd-utilities/tddUtilities.js";

describe('And when I work with the Pitch class', () => {
	let dimensions = new MockVector(10, 10);
	let pitch;

	it('should throw an error if no dimension property is provided', () => {
		expect(() => new Pitch()).to.throw(`'dimensions' property must be instance of VectorFactory`);
	});

	describe('And I work with the Public properties', () => {
		beforeEach(() => {
			pitch = new Pitch({ dimensions });
		});

		it('should return the dimension of the pitch', () => {
			expect(pitch.dimensions.equals(dimensions)).to.be.true;
		});

		it('should throw an error if trying to set the dimension', () => {
			expect(() => pitch.dimensions = new MockVector(0,0)).to.throw();
		});

		it('should have a string for an id', () => {
			expect(pitch.id).to.be.a('string');
		});

		it('should have an is set', () => {
			let pitch = new Pitch({ dimensions, id: 'pitch-test' });
			expect(pitch.id).to.equal('pitch-test');
		});

		it('should throw error when trying to set the id', () => {
			expect(() => pitch.id = 'new-id').to.throw();
		})
	});

	describe('And I work with the Public methods', () => {
		beforeEach(() => {
			pitch = new Pitch({ dimensions });
		});

		describe('And I work with the collision method', () => {
			beforeEach(() => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
			});

			it('should throw an error if position argument is not a Vector', () => {
				expect(() => pitch.collision({})).to.throw(`'position' argument must be a vectorFactory instance`);
				cy.get('@gameEmit').should('not.have.been.called');
			});

			it('should throw an error if position is outside the pitch', () => {
				expect(() => pitch.collision(new MockVector(10, 0))).to.throw(`'position' argument is outside the pitch`);
				cy.get('@gameEmit').should('not.have.been.called');
				expect(() => pitch.collision(new MockVector(0, 10))).to.throw(`'position' argument is outside the pitch`);
				cy.get('@gameEmit').should('not.have.been.called');
				expect(() => pitch.collision(new MockVector(-1, 0))).to.throw(`'position' argument is outside the pitch`);
				cy.get('@gameEmit').should('not.have.been.called');
				expect(() => pitch.collision(new MockVector(0, -1))).to.throw(`'position' argument is outside the pitch`);
				cy.get('@gameEmit').should('not.have.been.called');
			});


			it('should not send event if collision() does not collide with position', () => {
				pitch.collision(new MockVector(1,1));
				cy.get('@gameEmit').should('not.have.been.called');
			});

			it('should send event if collision() does not collide with position', () => {
				pitch.collision(new MockVector(0,1));
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.SNAKE_COLLISION_WALL);
				pitch.collision(new MockVector(1,0));
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.SNAKE_COLLISION_WALL);
				pitch.collision(new MockVector(1,9));
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.SNAKE_COLLISION_WALL);
				pitch.collision(new MockVector(9,1));
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.SNAKE_COLLISION_WALL);
			});

		});

	});
});