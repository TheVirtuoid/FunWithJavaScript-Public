import { numPieces } from '../support.js';
import NumPiecesDb from "../../../src/classes/databases/NumPiecesDb/NumPiecesDb.js";
import NumPieceDbData from "../../../src/classes/databases/NumPieceDbData/NumPieceDbData.js";

describe('When I work with the NumPiecesDb class', () => {

	let testData;

	beforeEach(() => {
		NumPiecesDb.reset(numPieces);
		testData = numPieces[0];
	});

	it('should initialize the class', () => {
		const numPiecesDb = new NumPiecesDb();
		expect(numPiecesDb instanceof NumPiecesDb).to.be.true;
	});

	it('should return the same instance if the class is initialized a second time', () => {
		const numPiecesDb = new NumPiecesDb();
		expect(new NumPiecesDb()).to.equal(numPiecesDb);
	});

	it('should get a list of pieces', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceNames = numPiecesDb.getNames();
		expect(pieceNames).to.have.lengthOf(3);
	});

	it('should get a piece', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.get(testData.id);
		expect(pieceData).to.be.instanceOf(NumPieceDbData);
	});

	it('should return undefined pieceName is invalid', () => {
		const numPiecesDb = new NumPiecesDb();
		const invalid = numPiecesDb.get('bad');
		expect(invalid).to.be.undefined;
	});

	it('should import an image from the piece', () => {
		const numPiecesDb = new NumPiecesDb();

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				numPiecesDb.getImage(testData.id)
					.then(image => {
						resolve(image);
					})
					.catch(err => {
						reject(err);
					});
			});
		}

		cy.wrap(null)
			.then(() => {
				return getImagePromise()
					.then((image) => {
						expect(image instanceof HTMLSpanElement).to.be.true;
						expect(image.getAttribute('target')).to.equal('numPieces');
						expect(image.dataset.id).to.equal('8');
					})
			});
	});

	it('should import not return an invalid id', () => {
		const numPiecesDb = new NumPiecesDb();
		const cut = numPiecesDb.getImage('invalid');
		expect(cut).to.be.undefined;
	});

	it('should get a list of ids', () => {
		const numPiecesDb = new NumPiecesDb();
		const ids = numPiecesDb.getIds();
		expect(ids).to.have.lengthOf(3);
	});

});