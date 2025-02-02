import Table from "../../src/classes/Table/Table.js";
import Status from "../../src/classes/support/Status/Status.js";

describe('When I am moving a piece', () => {

	let table;

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
	});

	it('should have adjusted the dropped piece if the connection is not exact (negative)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200 - Table.CONNECTION_TOLERANCE, y: 100 - Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(100);
	});

	it('should have adjusted the dropped piece if the connection is not exact (positive)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200 + Table.CONNECTION_TOLERANCE, y: 100 + Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(100);
	});

	xit('should get a Connected status - test for inexact fit positive', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
		expect(statusMove1.code).to.equal(Status.NO_CHANGE);
		const statusMove2 = table.movePiece(piece2, { x: 200 + Table.CONNECTION_TOLERANCE, y: 100 });
		const { code, data } = statusMove2;
		const { piecesRemaining } = data;
		expect(code).to.equal(Status.CONNECTED);
		expect(piecesRemaining).to.equal(23);
	});

	xit('should get a Connected status - test for inexact miss negative', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
		expect(statusMove1.code).to.equal(Status.NO_CHANGE);
		const statusMove2 = table.movePiece(piece2, { x: 200 - Table.CONNECTION_TOLERANCE - 1, y: 100 });
		const { code, data } = statusMove2;
		const { piecesRemaining } = data;
		expect(code).to.equal(Status.NO_CHANGE);
		expect(piecesRemaining).to.equal(24);
	});

	xit('should get a Connected status - test for inexact miss positive', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
		expect(statusMove1.code).to.equal(Status.NO_CHANGE);
		const statusMove2 = table.movePiece(piece2, { x: 200 + Table.CONNECTION_TOLERANCE + 1, y: 100 });
		const { code, data } = statusMove2;
		const { piecesRemaining } = data;
		expect(code).to.equal(Status.NO_CHANGE);
		expect(piecesRemaining).to.equal(24);
	});

});
