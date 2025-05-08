import Track from "../../src/classes/Track/Track.js";

describe('When I create a FinishLine piece of track', () => {
	it('should create the finishLine piece', () => {
		const track = Track.CreateFinishLine({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.FINISHLINE);
		expect(track.length).to.be.equal(Track.FINISHLINE_LENGTH);
	});
});
