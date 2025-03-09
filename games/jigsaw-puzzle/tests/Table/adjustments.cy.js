import Table from "../../src/classes/Table/Table.js";
import Status from "../../src/classes/support/Status/Status.js";
import ImageDb from "../../src/classes/databases/ImageDb/ImageDb.js";
import {cuts, images, numPieces} from "../databases/support.js";
import CutDb from "../../src/classes/databases/CutDb/CutDb.js";
import NumPiecesDb from "../../src/classes/databases/NumPiecesDb/NumPiecesDb.js";
import tableBuilder from "./tableBuilder.js";

describe('When I am moving a piece', () => {

	let table;
	let piece1, piece2;
	let pieceW;

	beforeEach( () => {
		const { imageData, cutData, numPiecesData, pieceWidth } = tableBuilder();
		table = new Table({	image: imageData, cut: cutData, numPieces: numPiecesData	});
		table.setPuzzleDimensions({ x: 600, y: 400 });
		table.cutPuzzle();
		table.shufflePuzzle();
		piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		pieceW = pieceWidth;
	});

	it('should have NOT the dropped piece if the connection is exact', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 100 + pieceW, y: 100 });
		expect(piece2.x).to.equal(100 + pieceW);
		expect(piece2.y).to.equal(100);
	});

	it('should have adjusted the dropped piece if the connection is not exact (negative)', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 100 + pieceW - Table.CONNECTION_TOLERANCE, y: 100 - Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(100 + pieceW);
		expect(piece2.y).to.equal(100);
	});

	it('should have adjusted the dropped piece if the connection is not exact (positive)', () => {
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 100 + pieceW + Table.CONNECTION_TOLERANCE, y: 100 + Table.CONNECTION_TOLERANCE });
		expect(piece2.x).to.equal(100 + pieceW);
		expect(piece2.y).to.equal(100);
	});
});
