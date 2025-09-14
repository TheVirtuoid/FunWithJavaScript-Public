import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Body from "./Body.js";
import Segment from "../Segment/Segment.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Snake from "../Snake/Snake.js";

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

			/*it('should NOT send the event if no collision', () => {
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
			});*/
		});

		describe('And when I use projectedCollision', () => {
			const position = new MockVector(4, 4);
			const direction = MockVector.Up();
			let body;
			const segments = [
				new Segment({ position: new MockVector(5, 5), direction }),
				new Segment({ position: new MockVector(5, 6), direction }),
				new Segment({ position: new MockVector(5, 7), direction }),
			]

			beforeEach(() => {
				body = new Body({ segments });
			});

			it('should throw if position is not a Vector', () => {
				expect(() => body.projectedCollision({ position: 'bad' })).to.throw();
			});

			it('should return false if no collision', () => {
				const checkPosition = new MockVector(1, 1);
				expect(body.projectedCollision({ position: checkPosition, speed: 1 })).to.be.false;
			});

			it('should return true if collision', () => {
				const checkPosition = new MockVector(5, 4); // move up should give us this
				expect(body.projectedCollision({ position: checkPosition, speed: 1 })).to.be.true;
			});
		});

		describe('And when I move the body', () => {
			beforeEach(() => {
				body = new Body({ id });
				body.grow({ position: new MockVector(2,2), direction: MockVector.Left() });
				body.grow({ position: new MockVector(3,2), direction: MockVector.Left() });
				body.grow({ position: new MockVector(4,2), direction: MockVector.Left() });
			});

			it('should move the distance of 1 (default)', () => {
				body.move(); // (1,2) (2,2) (3,2)
				const newPositions = body.segments;
				expect(newPositions[2].equals(new MockVector(1,2))).to.be.true;
				expect(newPositions[1].equals(new MockVector(2,2))).to.be.true;
				expect(newPositions[0].equals(new MockVector(3,2))).to.be.true;
			});

			it('should move the distance of 2 (default)', () => {
				body.move(2); // (0,2) (1,2) (2,2)
				const newPositions = body.segments;
				expect(newPositions[2].equals(new MockVector(0,2))).to.be.true;
				expect(newPositions[1].equals(new MockVector(1,2))).to.be.true;
				expect(newPositions[0].equals(new MockVector(2,2))).to.be.true;
			});
		});

		describe('And when I get the projected positions of the body', () => {
			beforeEach(() => {
				body = new Body({ id });
				body.grow({ position: new MockVector(2,2), direction: MockVector.Left() });
				body.grow({ position: new MockVector(3,2), direction: MockVector.Left() });
				body.grow({ position: new MockVector(4,2), direction: MockVector.Left() });
			});

			it('should project as if the speed was 1', () => {
				const newPositions = body.getProjectedPositions(); // (1,2) (2,2) (3,2)
				expect(newPositions[2].equals(new MockVector(1,2))).to.be.true;
				expect(newPositions[1].equals(new MockVector(2,2))).to.be.true;
				expect(newPositions[0].equals(new MockVector(3,2))).to.be.true;
			});

			it('should move the distance of 2 (default)', () => {
				const newPositions = body.getProjectedPositions(2); // (0,2) (1,2) (2,2)
				expect(newPositions[2].equals(new MockVector(0,2))).to.be.true;
				expect(newPositions[1].equals(new MockVector(1,2))).to.be.true;
				expect(newPositions[0].equals(new MockVector(2,2))).to.be.true;
			});
		});

		describe('And when I shift directions', () => {
			beforeEach(() => {
				body = new Body({ id });
				body.grow({ position: new MockVector(2,2), direction: MockVector.Up() });
				body.grow({ position: new MockVector(3,2), direction: MockVector.Right() });
				body.grow({ position: new MockVector(4,2), direction: MockVector.Down() });
			});

			it('should throw error id firstDirection is not a vector', () => {
				expect(() => body.shiftDirections('bad')).to.throw();
			});

			it('should shift the directions', () => {
				body.shiftDirections(MockVector.Left());
				expect(body.getSegmentAt(0).direction.equals(MockVector.Left())).to.be.true;
				expect(body.getSegmentAt(	1).direction.equals(MockVector.Down())).to.be.true;
				expect(body.getSegmentAt(2).direction.equals(MockVector.Right())).to.be.true;
			});
		});


	});

});