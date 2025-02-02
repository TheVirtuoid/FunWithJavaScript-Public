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

	xit('should merge two pieces into one', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		const statusMove2 = table.movePiece(piece2, { x: 200, y: 100 });
		console.log(statusMove2);
		expect(piece1.children.length).to.equal(1);
		const child = piece1.children[0];
		expect(child).to.equal(piece2);
	});

	// if a multi-piece object is moved to a single piece object, then the children of all the multi
	// piece objects will become the children of the single piece object, and the single piece object
	// will become the new parent.
	it('should merge a multi-piece into a single piece, with the single piece becoming the parent', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const piece3 = table.getPieceByOrdinal({ x: 0, y: 1 });
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200, y: 100 });
		table.movePiece(piece3, { x: 110, y: 200 });
		table.movePiece(piece1, { x: 110, y: 100 });
		expect(piece1.children.length).to.equal(0);
		expect(piece2.children.length).to.equal(0);
		expect(piece3.children.length).to.equal(2);
	});

	xit('should move all pieces when a child piece is moved', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const piece3 = table.getPieceByOrdinal({ x: 2, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200, y: 100 });
		table.movePiece(piece3, { x: 300, y: 100 });
		table.movePiece(piece2, { x: 200, y: 200 });
		expect(piece1.x).to.equal(100);
		expect(piece1.y).to.equal(200);
		expect(piece2.x).to.equal(200);
		expect(piece2.y).to.equal(200);
		expect(piece2.x).to.equal(300);
		expect(piece2.y).to.equal(200);
	});

	xit('should move all pieces when a parent piece is moved', () => {
		const piece1 = table.getPieceByOrdinal({ x: 0, y: 0 });
		const piece2 = table.getPieceByOrdinal({ x: 1, y: 0 });
		const piece3 = table.getPieceByOrdinal({ x: 2, y: 0 });
		table.movePiece(piece1, { x: 100, y: 100 });
		table.movePiece(piece2, { x: 200, y: 100 });
		table.movePiece(piece3, { x: 300, y: 100 });
		table.movePiece(piece1, { x: 200, y: 200 });
		expect(piece1.x).to.equal(200);
		expect(piece1.y).to.equal(200);
		expect(piece2.x).to.equal(300);
		expect(piece2.y).to.equal(200);
		expect(piece2.x).to.equal(400);
		expect(piece2.y).to.equal(200);
	});
});
