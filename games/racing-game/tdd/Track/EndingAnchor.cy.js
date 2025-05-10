import Track from "../../src/classes/Track/Track.js";

describe('When I create a EndingAnchor piece of track', () => {
	it('should create the endinganchor piece', () => {
		const track = Track.CreateEndingAnchor({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.ENDING_ANCHOR);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		beforeEach(() => {
			track = Track.CreateEndingAnchor();
		});

		it('should have a length of 1', () => {
			expect(track.length).to.equal(1);
		});
	});
});
