import Position2d from "../../src/classes/support/Position2d.js";
import {numPieces} from "../support.js";
import NumPiecesDb from "../../src/classes/NumPiecesDb/NumPiecesDb.js";
import NumPieceData from "../../src/classes/NumPieceData/NumPieceData.js";

describe('WHen I work with the NumPieceData class', () => {
	it('should initialize an empty class', () => {
		const numPieceData = new NumPieceData();
		expect(numPieceData).to.have.property('name', null);
		expect(numPieceData).to.have.property('pieces', null);
		expect(numPieceData).to.have.property('dimensions', null);
		expect(numPieceData).to.have.property('id', null);
	});

	it('should initialize the class based upon a pieceData object', () => {
		NumPiecesDb.reset(numPieces);
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.getPieceData(8);
		const numPieceData = new NumPieceData(pieceData);
		expect(numPieceData.name).to.equal(pieceData.name);
		expect(numPieceData.pieces).to.equal(pieceData.pieces);
		expect(numPieceData.dimensions).to.equal(pieceData.dimensions);
		expect(numPieceData.id).to.equal(pieceData.id);
	});

	it('should initialize the claas based upon individual properties', () => {
		const numPieceData = new NumPieceData({ name: '8', pieces: 8, dimensions: new Position2d(4, 2), id: '8' });
		expect(numPieceData.name).to.equal('8');
		expect(numPieceData.pieces).to.equal(8);
		expect(numPieceData.dimensions).to.be.instanceOf(Position2d);
		expect(numPieceData.id).to.equal('8');
	});
});