import NumPiecesDb from "../../../src/classes/databases/NumPiecesDb/NumPiecesDb.js";
import {numPieces} from "../support.js";
import Position2d from "../../../src/classes/support/Position2d.js";

describe('When I use the Reset static method on numPiecesDb', () => {
	it('should reset the numPiecesDb to an empty state', () => {
		NumPiecesDb.reset();
		const numPiecesDb = new NumPiecesDb();
		const pieceNames = numPiecesDb.getNames();
		expect(pieceNames.length).to.equal(0);
	});

	it('should setup the Database with the correct typed parameters', () => {
		NumPiecesDb.reset(numPieces);
		const numPiecesDb = new NumPiecesDb();
		const id = numPieces[0].id;
		const pieceData = numPiecesDb.get(id);
		expect(typeof pieceData.name).to.equal('string');
		expect(typeof pieceData.pieces).to.equal('number');
		expect(pieceData.dimensions).to.be.instanceOf(Position2d);
		expect(typeof pieceData.id).to.equal('string');
	});
});