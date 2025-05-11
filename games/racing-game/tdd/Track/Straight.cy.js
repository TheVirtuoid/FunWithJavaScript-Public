import Track from "../../src/classes/Track/Track.js";
import V3 from "../../src/classes/V3/V3.js";

describe('When I create a Straight piece of track', () => {
	const id = 'straight-track';
	const length = 10;

	it('should create the straight piece', () => {
		const track = Track.CreateStraight({ id, length });
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STRAIGHT);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		beforeEach(() => {
			track = Track.CreateStraight({ id, length });
		});

		it('should throw error if length is not specified', () => {
			expect(() => Track.CreateStraight({ id })).to.throw();
		});

		it('should have a length property', () => {
			expect(track.length).to.equal(length);
		});

		it('should have a null contour property', () => {
			expect(track.contour).to.be.null;
		});

		it('should have the id property', () => {
			expect(track.id).to.equal(id);
		});

	});

	describe('And when I instantiate the contour', () => {
		it('should allow for an object with controlPoint1, controlPoint2', () => {
			const controlPoint1 = new V3(0, 0, 0);
			const controlPoint2 = new V3(1, 1, 1);
			const track = Track.CreateStraight({
				id,
				length,
				contour: {
					controlPoint1,
					controlPoint2
				}
			});
			expect(track.contour).to.be.instanceOf(Object);
			expect('controlPoint1' in track.contour).to.be.true;
			expect('controlPoint2' in track.contour).to.be.true;
			expect(track.contour.controlPoint1.compareTo(controlPoint1)).to.be.true;
			expect(track.contour.controlPoint2.compareTo(controlPoint2)).to.be.true;
		});

		it('should throw an error if not null nor controlPoint1, controlPoint2 and not null', () => {
			expect(() => Track.CreateStraight({id, length, contour: {} })).to.throw();
		})
	});

	describe('And when I try to change the new properties', () => {
		let track;
		beforeEach(() => {
			track = Track.CreateStraight({ id, length });
		})

		it('should throw an error when trying to set the length', () => {
			expect(() => track.length = 20).to.throw();
		});

		it('should throw an error when trying to set the contour', () => {
			expect(() => track.contour = {
				controlPoint1: new V3(2, 2, 2),
				controlPoint2: new V3(3, 3, 3)
			}).to.throw()
		});
	});


});
