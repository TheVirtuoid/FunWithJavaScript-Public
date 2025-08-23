import { MockVector } from "../../tdd-utilities/tddUtilities.js";
import Body from "./Body.js";
import Segment from "../Segment/Segment.js";

describe('And when I work with the Body class', () => {

	it('should create an instance of Body with default properties', () => {
		const body = new Body();
		expect(body.numberOfSegments).to.equal(0);
		expect(body.id).to.be.a('string');
	});

	describe('And when I work with the Public properties', () => {
		let segments = [new Segment()];
		const id = 'test-body';
		let body;

		beforeEach(() => {
			body = new Body({ segments, id });
		});

		describe('And when I work with "id"', () => {
			it('should return current id', () => {
				expect(body.id).to.equal('test-body');
			});

			it('should throw error if attempt to change value', () => {
				expect(() => body.id = 'new-id').to.throw();
			});
		});

		describe('And when I work with "segments"', () => {
			it('should return current number of segments', () => {
				expect(body.numberOfSegments).to.equal(1);
			});

			it('should throw error when trying to change the numberOfSegments', () => {
				expect(() => body.numberOfSegments = 5).to.throw();
			});
		});
	});

	describe('And when I work with the Public methods', () => {
		let segments = [new Segment({ position: new MockVector(2, 2)})];
		const id = 'test-body';
		let body;

		beforeEach(() => {
			body = new Body({ segments, id });
		});

		it('should return the segment at a given index', () => {
			const segment = body.getSegmentAt(0);
			expect(segment.id).to.equal(segments[0].id);
		})

		it('should return undefined if index is out of range', () => {
			expect(body.getSegmentAt(1)).to.be.undefined;
			expect(body.getSegmentAt(-1)).to.be.undefined;
		});

		it('should grow the segments by adding a new segment at the beginning', () => {
			const newPosition = new MockVector(3, 3);
			const newDirection = MockVector.Up();
			body.grow(newPosition, newDirection);
			expect(body.numberOfSegments).to.equal(2);
			expect(body.getSegmentAt(0).position.equals(newPosition)).to.be.true;
			expect(body.getSegmentAt(1).id).to.equal(segments[0].id);
		});
	});

	/*describe('grow() method', () => {
		let segments = [new MockVector(1, 2), new MockVector(3, 4)];
		let body;

		beforeEach(() => {
			body = new Body({ segments });
		});

		it('should throw error if newSegment is not a Vector', () => {
			expect(() => body.grow('bad')).to.throw(`'newSegment' argument must be an instance of Vector`);
		});

		it('should add a new segment to the body', () => {
			const newSegment = new MockVector(5, 6);
			body.grow(newSegment);
			expect(body.segments).to.deep.equal([...segments, newSegment]);
		});
	});*/
});