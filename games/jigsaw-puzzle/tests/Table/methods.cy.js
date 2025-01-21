import Table from "../../src/classes/Table/Table.js";
import CutType from "../../src/classes/support/CutType.js";
import Piece from "../../src/classes/Piece/Piece.js";
import Status from "../../src/classes/support/Status.js";

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

	it('should get a piece based upon a valid ordinal', () => {
		table.addPiece({ position: { x: 1, y: 1 }, ordinal: { x: 2, y: 2 } });
		const piece = table.getPieceByOrdinal({ x: 2, y: 2 });
		expect(piece).to.be.instanceOf(Piece);
	});

	it('should NOT get a piece based upon an invalid ordinal', () => {
		table.addPiece({ position: { x: 1, y: 1 }, ordinal: { x: 2, y: 2 } });
		const piece = table.getPieceByOrdinal({ x: 3, y: 3 });
		expect(piece).to.be.undefined;
	});

	it('should cut the puzzle', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		expect(table.rows).to.equal(4);
		expect(table.columns).to.equal(6);
	});

	it('should shuffle the puzzle', () => {
		table.setDimensions({ x: 600, y: 400 });
		table.setNumberOfPieces(24);
		table.cutPuzzle();
		const status = table.shufflePuzzle();
		expect(status.code).to.equal(Status.PUZZLE_READY);
		/*const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
		expect(piece.x).not.to.equal(0);
		expect(piece.y).not.to.equal(0);*/
	});

	describe('and when I move a piece', () => {

		beforeEach( () => {
			table.setDimensions({ x: 600, y: 400 });
			table.setNumberOfPieces(24);
			table.cutPuzzle();
			table.shufflePuzzle();
		});

		it('should get back a non-modified piece movement if the move was valid', () => {
			const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
			const movedPiece = table.movePiece(piece, { x: 100, y: 100 });
			const { code, data: originalPiece } = movedPiece;
			expect(code).to.equal(Status.NO_CHANGE);
			expect(originalPiece.x).to.equal(100);
			expect(originalPiece.y).to.equal(100);
		});

		it('should get back a modified piece placement if the move was invalid', () => {
			const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
			const movedPiece = table.movePiece(piece, { x: 1000, y: 1000 });
			const { code, data: changedPiece } = movedPiece;
			expect(code).to.equal(Status.MOVED);
			expect(changedPiece.x).to.equal(500);
			expect(changedPiece.y).to.equal(300);
		});

		it('should get back a Connected status - test for exact fit', () => {
			const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
			const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
			const statusMove1 = table.movePiece(piece1, { x: 100, y: 100 });
			expect(statusMove1.code).to.equal(Status.NO_CONNECTION);
			const statusMove2 = table.movePiece(piece2, { x: 200, y: 100 });
			const { code, data: pieces } = statusMove2;
			expect(code).to.equal(Status.CONNECTED);
			expect(pieces.parent).to.equal(piece1);
			expect(pieces.child).to.equal(piece2);
		});

		it('should get back a game finished status', () => {

		});
	});


});