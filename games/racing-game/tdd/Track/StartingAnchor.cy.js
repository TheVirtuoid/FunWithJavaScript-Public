import Track from "../../src/classes/Track/Track.js";

describe('When I create a StartingAnchor piece of track', () => {
	it('should create the startinganchor piece', () => {
		const track = Track.CreateStartingAnchor({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STARTING_ANCHOR);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		let startingPosition = { x: 0, y: 0, z: 0 };
		let startingDirectionVector = { x: 0, y: 0, z: 0 };
		beforeEach(() => {
			track = Track.CreateStartingAnchor({ startingPosition, startingDirectionVector });
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

		it('should have a length of 1', () => {
			expect(track.length).to.equal(1);
		});
	});

	describe('And when I attempt to change things', () => {
		it('should throw an error if startingPosition is not a Vector3', () => {
			expect(() => Track.CreateStartingAnchor({ startingPosition: 'bad' })).to.throw();
		});

		it('should throw an error if startingDirectionVector is not a Vector3', () => {
			expect(() => Track.CreateStartingAnchor({ startingDirectionVector: 'bad' })).to.throw();
		});
	});

});
