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
		expect(status.data).to.equal(24);
	});
});