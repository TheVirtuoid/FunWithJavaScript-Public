import Track from "../../src/classes/Track/Track.js";

describe('When I create a StartLine piece of track', () => {
	it('should create the startLine piece', () => {
		const id = 'start-line';
		const track = Track.CreateStartLine({ id });
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STARTLINE);
		expect(track.length).to.be.equal(Track.STARTLINE_LENGTH);
		expect(track.id).to.equal(id);
	});
});
