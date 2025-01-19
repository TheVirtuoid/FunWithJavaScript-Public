import Table from "../../../src/classes/Table/Table.js";
import CutType from "../../../src/classes/support/CutType.js";

describe('When I get communications from the Engine', () => {
	let table;

	beforeEach(() => {
		table = new Table();
	});

	it('should set the dimensions of the table', () => {
		table.setDimensions({ x: 3, y: 3 });
		expect(table.x).to.equal(3);
		expect(table.y).to.equal(3);
	});

	it('should receive an image', () => {
		table.setImage('image here');
		expect(table.image).to.equal('image here');
	});

	it('should receive the cut type', () => {
		table.setCut(CutType.SQUARE);
		expect(table.cut).to.equal(CutType.SQUARE);
	});

	it('should receive the number of pieces', () => {
		table.setNumberOfPieces(9);
		expect(table.numberOfPieces).to.equal(9);
	});

	it('should cut the puzzle', () => {});
	it('should shuffle the puzzle', () => {});
	it('should receive a piece move notification', () => {});
});