import NumPiecesDb from "../../src/classes/NumPiecesDb/NumPiecesDb.js";
import {cuts, numPieces} from "../support.js";
import Position2d from "../../src/classes/support/Position2d.js";
import CutDb from "../../src/classes/CutDb/CutDb.js";

describe('When I use the Reset static method on CutDb', () => {
	it('should reset the CutDb to an empty state', () => {
		CutDb.reset();
		const numPiecesDb = new CutDb();
		const cutNames = numPiecesDb.getCutNames();
		expect(cutNames.length).to.equal(0);
	});

	it('should setup the Database with the correct typed parameters', () => {
		CutDb.reset(cuts);
		const cutDb = new CutDb();
		const cutData = cutDb.getCut('Square');
		expect(typeof cutData.name).to.equal('string');
		expect(typeof cutData.description).to.equal('string');
		expect(typeof cutData.url).to.equal('string');
		expect(typeof cutData.id).to.equal('string');
	});
});