import Table from './../../../src/classes/Table/Table.js';
import CutType from "../../../src/classes/support/CutType.js";

describe('When I create a new Table', () => {
	let table;

	beforeEach( () => {
		table = new Table();
	});
	it('should create a table with no image', () => {
		expect(table.image).to.be.null;
	});
	it('should create a table with no pieces', () => {
		expect(table.pieceCount).to.be.equal(0);
	});
	it('should create a table with no dimensions', () => {
		expect(table.x).to.be.equal(0);
		expect(table.y).to.be.equal(0);
	});
	it('should create a table with no cut type', () => {
		expect(table.cut).to.be.equal(CutType.NONE);
	});
});
