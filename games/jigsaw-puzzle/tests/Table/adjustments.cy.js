import Table from "../../src/classes/Table/Table.js";
import Status from "../../src/classes/support/Status/Status.js";

describe('When I am moving a piece', () => {

	let table;
	let piece1, piece2;

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
		piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
	});

	it('should have NOT the dropped piece if the connection is exact', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200, y: 100 });
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(100);
	});

	it('should have adjusted the dropped piece if the connection is not exact (negative)', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200 - Table.CONNECTION_TOLERANCE, y: 100 - Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(100);
	});

	it('should have adjusted the dropped piece if the connection is not exact (positive)', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200 + Table.CONNECTION_TOLERANCE, y: 100 + Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(100);
	});
});
