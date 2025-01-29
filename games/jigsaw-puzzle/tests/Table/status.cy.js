import Status from "../../src/classes/support/Status.js";
import Table from "../../src/classes/Table/Table.js";

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
		const { code, data } = movedPiece;
		const { piece: originalPiece, piecesRemaining } = data;
		expect(code).to.equal(Status.NO_CHANGE);
		expect(originalPiece.x).to.equal(100);
		expect(originalPiece.y).to.equal(100);
		expect(piecesRemaining).to.equal(24);
	});

	it('should move a piece and return a status of MOVED', () => {
		const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
		const movedPiece = table.movePiece(piece, { x: 1000, y: 1000 });
		const { code, data } = movedPiece;
		const { piece: changedPiece, piecesRemaining } = data;
		expect(code).to.equal(Status.MOVED);
		expect(changedPiece.x).to.equal(500);
		expect(changedPiece.y).to.equal(300);
		expect(piecesRemaining).to.equal(24);
	});

	it('should move a piece and return a status of CONNECTED (exact fit)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
		expect(statusMove1.code).to.equal(Status.NO_CHANGE);
		const statusMove2 = table.movePiece(piece2, { x: 200, y: 100 });
		const { code, data } = statusMove2;
		const { connections, piecesRemaining } = data;
		expect(code).to.equal(Status.CONNECTED);
		expect(connections.length).to.equal(1);
		const { parent, child } = connections[0].data;
		expect(parent).to.equal(piece1);
		expect(child).to.equal(piece2);
		expect(piecesRemaining).to.equal(23);
	});

	it('should move a piece and return a status of CONNECTED (inexact fit, negative)', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
		expect(statusMove1.code).to.equal(Status.NO_CHANGE);
		const statusMove2 = table.movePiece(piece2, { x: 200 - Table.CONNECTION_TOLERANCE, y: 100 });
		const { code, data } = statusMove2;
		const { piecesRemaining } = data;
		expect(code).to.equal(Status.CONNECTED);
		expect(piecesRemaining).to.equal(23);
	});

	it('should move a piece and return a status of CONNECTED (inexact fit, positive)', () => {
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

	it('should move a piece and return a status of GAME_FINISHED', () => {
		table.setDimensions({ x: 200, y: 200 });
		table.setNumberOfPieces(4);
		table.cutPuzzle();
		table.shufflePuzzle();
		table.movePiece(table.getPieceByOrdinal({ x: 0, y: 0 }), { x: 0, y: 0 });
		table.movePiece(table.getPieceByOrdinal({ x: 1, y: 0 }), { x: 100, y: 0 });
		table.movePiece(table.getPieceByOrdinal({ x: 0, y: 1 }), { x: 0, y: 100 });
		const status = table.movePiece(table.getPieceByOrdinal({ x: 1, y: 1 }), { x: 100, y: 100 });
		expect(status.code).to.equal(Status.GAME_FINISHED);

	});
});