import Track from "../../src/classes/Track/Track.js";
import V3 from "../../src/classes/V3/V3.js";

describe('When I create a StartingAnchor piece of track', () => {
	it('should create the startinganchor piece', () => {
		const track = Track.CreateStartingAnchor({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STARTING_ANCHOR);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		let startingPosition = new V3(1, 1, 1);
		let startingDirectionVector = new V3(1, 0, 0);
		const id = 'start-anchor';
		beforeEach(() => {
			track = Track.CreateStartingAnchor({ id, startingPosition, startingDirectionVector });
		});

		it('should have a Vector3 starting position', () => {
			expect(track.startingPosition.compareTo(startingPosition)).to.be.true;
		});

		it('should have a Vector3 starting direction vector', () => {
			expect(track.startingDirectionVector.compareTo(startingDirectionVector)).to.be.true;
		});

		it('should have an ending position that equals starting position', () => {
			expect(track.endingPosition.compareTo(startingPosition)).to.be.true;
		});

		it('should have an ending direction vector that equals starting direction vector', () => {
			console.log(track);
			expect(track.endingDirectionVector.compareTo(startingDirectionVector)).to.be.true;
		});

		it('should have a length of 1', () => {
			expect(track.length).to.equal(1);
		});

		it('should have the id property', () => {
			expect(track.id).to.equal(id);
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
