import Table from "../../src/classes/Table/Table.js";
import CutType from "../../src/classes/support/CutType.js";
import Piece from "../../src/classes/Piece/Piece.js";

describe('When I perform methods on a Table', () => {
	let table;

	beforeEach(() => {
		table = new Table();
	});

	it('should add a new piece', () => {
		const piece = table.addPiece({ position: { x: 1, y: 1 } });
		expect(piece).to.be.instanceOf(Piece);
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

	it('should cut the puzzle', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		expect(table.pieceCount).to.equal(24);
		expect(table.rows).to.equal(4);
		expect(table.columns).to.equal(6);
	});

	it('should shuffle the puzzle', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		table.shufflePuzzle();
		const piece = table.getPieceByIndex(0);
		expect(piece.x).not.to.equal(0);
		expect(piece.y).not.to.equal(0);
	});

	it('should get a piece based upon a valid index', () => {
		table.addPiece({ position: { x: 1, y: 1 } });
		const piece = table.getPieceByIndex(0);
		expect(piece).to.be.instanceOf(Piece);
	});

	it('should NOT get a piece based upon an invalid index', () => {
		table.addPiece({ position: { x: 1, y: 1 } });
		const piece = table.getPieceByIndex(1);
		expect(piece).to.be.undefined;
	});

	it('should get back a non-modified piece movement if the move was valid', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		const piece = table.getPieceByIndex(0);
		const movedPiece = table.movePiece(piece, { x: 100, y: 100 });
		expect(movedPiece.status).to.equal(Table.STATUS_NORMAL);
		expect(piece.x).to.equal(100);
	});

	it('should get back a modified piece placement if the move was invalid', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		const piece = table.getPieceByIndex(0);
		const movedPiece = table.movePiece(piece, { x: 1000, y: 1000 });
		expect(movedPiece.status).to.equal(Table.STATUS_MOVE_CHANGED);
		expect(movedPiece.position.x).to.equal(500);
		expect(movedPiece.position.y).to.equal(300);
	});
});