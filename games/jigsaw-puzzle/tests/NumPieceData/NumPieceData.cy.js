import Position2d from "../../src/classes/support/Position2d.js";
import NumPieceData from "../../src/classes/NumPieceData/NumPieceData.js";

describe('WHen I work with the NumPieceData class', () => {
	it('should initialize an empty class', () => {
		const numPieceData = new NumPieceData();
		expect(numPieceData).to.have.property('name', null);
		expect(numPieceData).to.have.property('pieces', null);
		expect(numPieceData).to.have.property('dimensions', null);
		expect(numPieceData).to.have.property('id', null);
	});

	it('should initialize the claas based upon individual properties', () => {
		const numPieceData = new NumPieceData({ name: '8', pieces: 8, dimensions: { x: 4, y: 2 }, id: '8' });
		expect(numPieceData.name).to.equal('8');
		expect(numPieceData.pieces).to.equal(8);
		expect(numPieceData.dimensions).to.be.instanceOf(Position2d);
		expect(numPieceData.dimensions.x).to.equal(4);
		expect(numPieceData.dimensions.y).to.equal(2);
		expect(numPieceData.id).to.equal('8');
	});
});