import Table from './../../../src/classes/Table/Table.js';

describe('When I get communications from a piece', () => {
	let table;

	beforeEach(() => {
		table = new Table();
	});

	it('should receive notification that a piece has been created', () => {
		const beforeAdd = table.pieceCount;
		table.addPiece({ position: { x: 1, y: 1 } });
		expect(table.pieceCount).to.be.equal(beforeAdd + 1);
	});
});
