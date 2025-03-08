import Table from '../../src/classes/Table/Table.js';
import CutType from "../../src/classes/support/CutType.js";
import ImageDb from "../../src/classes/databases/ImageDb/ImageDb.js";
import { cuts, images, numPieces } from "../databases/support.js";
import CutDb from "../../src/classes/databases/CutDb/CutDb.js";
import NumPiecesDb from "../../src/classes/databases/NumPiecesDb/NumPiecesDb.js";

describe('When I create a new Table', () => {
	/*let table;

	beforeEach( () => {
		table = new Table();
	});*/

	it('should create a table with empty objects', () => {
		const table = new Table();
		expect(table.image).to.be.null;
		expect(table.numPieces).to.be.null;
		expect(table.cut).to.be.null;
		expect(table.numberOfPieces).to.equal(0);
	});

	it('should create a table with complete objects', () => {
		ImageDb.reset(images);
		CutDb.reset(cuts);
		NumPiecesDb.reset(numPieces);
		const imageDb = new ImageDb();
		const cutDb = new CutDb();
		const numPiecesDb = new NumPiecesDb();
		const image = imageDb.getImagesFromCategory('beach')[0];
		const numPieces = numPiecesDb.getPieceData(8);
		const cut = cutDb.getCut('square');
		const table = new Table({	image, cut, numPieces	});
		expect(table.image).to.equal(image);
		expect(table.numPieces).to.equal(numPieces);
		expect(table.cut).to.equal(cut);
		expect(table.numberOfPieces).to.equal(8);
	});

});
