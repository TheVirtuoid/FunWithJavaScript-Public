import Track from "../../src/classes/Track/Track.js";

describe('When I create a Anchor piece of track', () => {
	it('should create the anchor piece', () => {
		const track = Track.CreateAnchor({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.ANCHOR);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		let startingPosition = { x: 0, y: 0, z: 0 };
		let startingDirectionVector = { x: 0, y: 0, z: 0 };
		beforeEach(() => {
			track = Track.CreateAnchor({ startingPosition, startingDirectionVector });
		});

		it('should have a Vector3 starting position', () => {
			expect(track.startingPosition).to.equal(startingPosition);
		});

		it('should have a Vector3 starting direction vector', () => {
			expect(track.startingDirectionVector).to.equal(startingDirectionVector);
		});

		it('should have an ending position that equals starting position', () => {
			expect(track.endingPosition).to.equal(track.startingPosition);
		});

		it('should have an ending direction vector that equals starting direction vector', () => {
			expect(track.endingDirectionVector).to.equal(track.startingDirectionVector);
		});
	});

	describe('And when I pass bad data', () => {
		it('should throw an error if startingPosition is not a Vector3', () => {
			expect(() => Track.CreateAnchor({ startingPosition: 'bad' })).to.throw();
		});

		it('should throw an error if startingDirectionVector is not a Vector3', () => {
			expect(() => Track.CreateAnchor({ startingDirectionVector: 'bad' })).to.throw();
		});
	});

});
