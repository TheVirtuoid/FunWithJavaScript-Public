import Status from "../../src/classes/support/Status/Status.js";
import Table from "../../src/classes/Table/Table.js";
import StatusMoved from "../../src/classes/support/Status/StatusMoved.js";
import StatusNoChange from "../../src/classes/support/Status/StatusNoChange.js";
import StatusConnected from "../../src/classes/support/Status/StatusConnected.js";
import StatusGameFinished from "../../src/classes/support/Status/StatusGameFinished.js";

describe('When I move a piece, and I want to test the status', () => {
	let table;

	beforeEach( () => {
		table = new Table();
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
	});

	it('should move a piece and return a status of NO_CHANGE', () => {
		const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
		const movedPiece = table.movePiece(piece, { x: 100, y: 100 });
		expect(movedPiece instanceof StatusNoChange).to.be.true;
	});

	it('should move a piece and return a status of MOVED', () => {
		const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
		const movedPiece = table.movePiece(piece, { x: 1000, y: 1000 });
		expect(movedPiece instanceof StatusMoved).to.be.true;
	});

	it('should move a piece and return a status of CONNECTED (exact fit)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		const status = table.movePiece(piece2, { x: 200, y: 100 });
		expect(status instanceof StatusConnected).to.be.true;
	});

	it('should move a piece and return a status of CONNECTED (inexact fit, negative)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		const status = table.movePiece(piece2, { x: 200 - Table.CONNECTION_TOLERANCE, y: 100 });
		expect(status instanceof StatusConnected).to.be.true;
	});

	it('should move a piece and return a status of CONNECTED (inexact fit, positive)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		const status = table.movePiece(piece2, { x: 200 + Table.CONNECTION_TOLERANCE, y: 100 });
		expect(status instanceof StatusConnected).to.be.true;
	});

	it('should move a piece and return a status of GAME_FINISHED', () => {
		table.setDimensions({ x: 200, y: 200 });
		table.setNumberOfPieces(4);
		table.cutPuzzle();
		table.shufflePuzzle();
		table.movePiece(table.getPieceByOrdinal({ x: 0, y: 0 }), { x: 0, y: 0 });
		table.movePiece(table.getPieceByOrdinal({ x: 1, y: 0 }), { x: 100, y: 0 });
		table.movePiece(table.getPieceByOrdinal({ x: 0, y: 1 }), { x: 0, y: 100 });
		const status = table.movePiece(table.getPieceByOrdinal({ x: 1, y: 1 }), { x: 100, y: 100 });
		expect(status instanceof StatusGameFinished).to.be.true;
	});
});