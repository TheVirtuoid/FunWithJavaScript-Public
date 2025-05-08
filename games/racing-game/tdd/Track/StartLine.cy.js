import Track from "../../src/classes/Track/Track.js";
import {Vector3} from "@babylonjs/core";

describe('When I create a StartLine piece of track', () => {
	it('should create the startLine piece', () => {
		const track = Track.CreateStartLine({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.STARTLINE);
		expect(track.length).to.be.equal(Track.STARTLINE_LENGTH);
	});
});
