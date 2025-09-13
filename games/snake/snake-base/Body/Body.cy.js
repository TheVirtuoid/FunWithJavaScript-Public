import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Body from "./Body.js";
import Segment from "../Segment/Segment.js";
import GameEvent from "../GameEvent/GameEvent.js";

describe('And when I work with the Body class', () => {

	it('should create an instance of Body with default properties', () => {
		const body = new Body();
		expect(body.length).to.equal(0);
		expect(body.id).to.be.a('string');
	});

	describe('And when I work with the Public properties', () => {
		const position = new MockVector(3, 3);
		const direction = MockVector.Down();
		const segments = [new Segment({ position, direction })];
		const id = 'test-body';
		let body;

		beforeEach(() => {
			body = new Body({ segments, id });
		});

		describe('And when I work with "id"', () => {
			it('should return current id', () => {
				expect(body.id).to.equal(id);
			});

			it('should throw error if attempt to change value', () => {
				expect(() => body.id = 'new-id').to.throw();
			});
		});

		describe('And when I work with "length"', () => {
			it('should return current number of segments', () => {
				expect(body.length).to.equal(1);
			});

			it('should throw error when trying to change the length', () => {
				expect(() => body.length = 5).to.throw();
			});
		});

		describe('And when I work with "segments"', () => {
			it('should return a copy of the segments array', () => {
				const segments = body.segments;
				expect(segments[0].equals(position)).to.be.true;
			});

			it('should throw error when trying to change the segments array', () => {
				expect(() => body.segments = []).to.throw();
			});
		});
	});

	describe('And when I work with the Public methods', () => {
		let segments = [new Segment({ position: new MockVector(2, 2), direction: MockVector.Left() })];
		const id = 'test-body';
		let body;

		beforeEach(() => {
			body = new Body({ segments, id });
		});

		describe('And when I use getSegmentAt()', () => {
			it('should return the segment at a given index', () => {
				const segment = body.getSegmentAt(0);
				expect(segment.id).to.equal(segments[0].id);
			})

			it('should return undefined if index is out of range', () => {
				expect(body.getSegmentAt(1)).to.be.undefined;
				expect(body.getSegmentAt(-1)).to.be.undefined;
			});
		});

		describe('And when I use grow', () => {
			const position = new MockVector(4, 4);
			const direction = MockVector.Up();

			it('should throw if position is not a Vector', () => {
				expect(() => body.grow({ direction, position: 'bad' })).to.throw();
			});

			it('should throw if direction is not a Vector', () => {
				expect(() => body.grow({ direction: 'bad', position })).to.throw();
			});

			it('should grow the segments', () => {
				body.grow({ position, direction });
				expect(body.length).to.equal(2);
				const newSegment = body.getSegmentAt(0);
				expect(newSegment.position.equals(position)).to.be.true;
				expect(newSegment.direction.equals(direction)).to.be.true;
			});
		});

		describe('And when I use collision', () => {
			const position = new MockVector(4, 4);
			const direction = MockVector.Up();

			it('should throw if position is not a Vector', () => {
				expect(() => body.collision('bad')).to.throw();
			});

			it('should return false if no collision', () => {
				body.grow({position, direction}); // let's grow one segment for fun
				const checkPosition = new MockVector(1, 1);
				expect(body.collision(checkPosition)).to.be.false;
			});

			it('should return true if no collision', () => {
				body.grow({position, direction}); // let's grow one segment for fun
				expect(body.collision(position)).to.be.true;
			});

			it('should NOT send the event if no collision', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				body.grow({position, direction}); // let's grow one segment for fun
				const checkPosition = new MockVector(1, 1);
				body.collision(checkPosition);
				cy.get('@gameEmit').should('not.have.been.calledWith', GameEvent.SNAKE_COLLISION_SELF);
			});

			it('should SHOULD send the event if collision', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				body.grow({position, direction}); // let's grow one segment for fun
				body.collision(position);
				cy.get('@gameEmit').should('have.been.calledWith', GameEvent.SNAKE_COLLISION_SELF);
			});
		});
	});

});