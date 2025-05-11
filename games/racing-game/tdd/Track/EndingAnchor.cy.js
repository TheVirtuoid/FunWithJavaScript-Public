import Track from "../../src/classes/Track/Track.js";

describe('When I create a EndingAnchor piece of track', () => {
	it('should create the endinganchor piece', () => {
		const track = Track.CreateEndingAnchor({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.ENDING_ANCHOR);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		const id = 'end-anchor';
		beforeEach(() => {
			track = Track.CreateEndingAnchor({ id });
		});

		it('should have a length of 1', () => {
			expect(track.length).to.equal(1);
		});

		it('should have the id property', () => {
			expect(track.id).to.equal(id);
		});


	});
});
