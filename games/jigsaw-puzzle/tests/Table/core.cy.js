import Table from '../../src/classes/Table/Table.js';
import tableBuilder from "./tableBuilder.js";

describe('When I create a new Table', () => {
	it('should create a table with empty objects', () => {
		const table = new Table();
		expect(table.image).to.be.null;
		expect(table.numPieces).to.be.null;
		expect(table.cut).to.be.null;
		expect(table.numberOfPieces).to.equal(0);
		expect(table.pieceWidth).to.be.null;
		expect(table.pieceHeight).to.be.null;
		expect(table.rows).to.be.null;
		expect(table.columns).to.be.null;
	});

	it('should create a table with complete objects', () => {
		const { testNumPieces, imageData, numPiecesData, cutData, dimensions, pieceHeight, pieceWidth } = tableBuilder();
		const table = new Table({	image: imageData, cut: cutData, numPieces: numPiecesData	});
		table.setPuzzleDimensions(dimensions);
		expect(table.image).to.equal(imageData);
		expect(table.numPieces).to.equal(numPiecesData);
		expect(table.cut).to.equal(cutData);
		expect(table.numberOfPieces).to.equal(testNumPieces.pieces);
		expect(table.pieceWidth).to.equal(pieceWidth);
		expect(table.pieceHeight).to.equal(pieceHeight);
		expect(table.rows).to.equal(testNumPieces.dimensions.y);
		expect(table.columns).to.equal(testNumPieces.dimensions.x);
	});

});
