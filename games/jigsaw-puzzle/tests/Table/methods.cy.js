import Table from "../../src/classes/Table/Table.js";
import Piece from "../../src/classes/Piece/Piece.js";
import Status from "../../src/classes/support/Status/Status.js";
import CutDb from "../../src/classes/databases/CutDb/CutDb.js";

import { cuts } from '../databases/support.js';
import tableBuilder from "./tableBuilder.js";

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
		table.setPuzzleDimensions({ x: 3, y: 3 });
		expect(table.puzzleWidth).to.equal(3);
		expect(table.puzzleHeight).to.equal(3);
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
		const { imageData, numPiecesData, cutData, dimensions, rows, columns } = tableBuilder();
		const table = new Table({	image: imageData, cut: cutData, numPieces: numPiecesData	});
		table.setPuzzleDimensions(dimensions);
		table.cutPuzzle();
		const piece = table.getPieceByOrdinal({ x: 0, y: 0 });
		expect(piece).to.be.instanceOf(Piece);
	});

	it('should shuffle the puzzle', () => {
		const { imageData, numPiecesData, cutData, dimensions, rows, columns } = tableBuilder();
		const table = new Table({	image: imageData, cut: cutData, numPieces: numPiecesData	});
		table.setPuzzleDimensions(dimensions);
		table.cutPuzzle();
		const status = table.shufflePuzzle();
		expect(status.code).to.equal(Status.PUZZLE_READY);
		expect(status.data).to.equal(table.numberOfPieces);
	});
});