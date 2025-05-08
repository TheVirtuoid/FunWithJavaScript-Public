import Track from "../../src/classes/Track/Track.js";

describe('When I create a Straight piece of track', () => {
	it('should create the straight piece', () => {
		const track = Track.CreateStraight({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STRAIGHT);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		let endingPosition = { x: 0, y: 0, z: 0 };
		let endingDirectionVector = { x: 0, y: 0, z: 0 };
		let length = 10;
		let contour = {
			controlPoint1: { x: 0, y: 0, z: 0 },
			controlPoint2: { x: 0, y: 0, z: 0 }
		}
		beforeEach(() => {
			track = Track.CreateStraight({endingPosition, endingDirectionVector, length, contour});
		});

		it('should have a null starting position', () => {
			expect(track.startingPosition).to.be.null;
		});

		it('should have a null starting direction vector', () => {
			expect(track.startingDirectionVector).to.be.null;
		});

		it('should have a Vector3 ending position', () => {
			expect(track.endingPosition).to.equal(endingPosition);
		});

		it('should have a Vector3 ending direction vector', () => {
			expect(track.endingDirectionVector).to.equal(endingDirectionVector);
		});

		it('should have a length property', () => {
			expect(track.length).to.equal(length);
		});

		it('should have a contour property', () => {
			expect(track.contour).to.be.instanceOf(Object);
		});
	});

	describe('And when I instantiate the contour', () => {
		it('should allow for a null value', () => {
			const track = Track.CreateStraight({contour: null});
			expect(track.contour).to.be.null;
		});

		it('should allow for an object with controlPoint1, controlPoint2', () => {
			const controlPoint1 = { x: 0, y: 0, z: 0 };
			const controlPoint2 = { x: 0, y: 0, z: 0 };
			const track = Track.CreateStraight({
				contour: {
					controlPoint1,
					controlPoint2
				}
			});
			expect(track.contour).to.be.instanceOf(Object);
			expect('controlPoint1' in track.contour).to.be.true;
			expect('controlPoint2' in track.contour).to.be.true;
			expect(track.contour.controlPoint1).to.equal(controlPoint1);
			expect(track.contour.controlPoint2).to.equal(controlPoint2);
		});

		it('should throw an error if not null nor controlPoint1, controlPoint2', () => {
			expect(() => Track.CreateStraight({contour: {}})).to.throw();
		})
	});

	describe('And when I try to change the new properties', () => {
		let track;
		beforeEach(() => {
			track = Track.CreateStraight({});
		})

		it('should throw an error when trying to set the length', () => {
			expect(() => track.length = 20).to.throw();
		});

		it('should throw an error when trying to set the contour', () => {
			expect(() => track.contour = {controlPoint1: { x: 0, y: 0, z: 0 }, controlPoint2: { x: 0, y: 0, z: 0 }}).to.throw();
		});
	});


});
