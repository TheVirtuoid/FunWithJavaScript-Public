import { numPieces } from '../support.js';
import NumPiecesDb from "../../src/classes/NumPiecesDb/NumPiecesDb.js";
import NumPieceData from "../../src/classes/NumPieceData/NumPieceData.js";

describe('When I work with the NumPiecesDb class', () => {

	beforeEach(() => {
		NumPiecesDb.reset(numPieces);
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
		const pieceNames = numPiecesDb.getPieceNames();
		expect(pieceNames).to.have.lengthOf(3);
		expect(pieceNames).to.include(8);
		expect(pieceNames).to.include(16);
		expect(pieceNames).to.include(32);
	});

	it('should get a piece from a named pieceName', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.getPieceData(8);
		expect(pieceData).to.be.instanceOf(NumPieceData);
	});

	it('should return undefined pieceName is invalid', () => {
		const numPiecesDb = new NumPiecesDb();
		const invalid = numPiecesDb.getPieceData(0);
		expect(invalid).to.be.undefined;
	});

	it('should retrieve the pieceData based upon Id', () => {
		const numPiecesDb = new NumPiecesDb();
		const testPieceData = numPiecesDb.getPieceData(8);
		const id = testPieceData.id;
		const pieceData = numPiecesDb.getPieceDataById(id);
		expect(pieceData).to.be.instanceOf(NumPieceData);
		expect(pieceData.id).to.equal(testPieceData.id);
		expect(pieceData.name).to.equal(testPieceData.name);
	});

	it('should return undefined if the ID is invalid', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.getPieceDataById('invalid');
		expect(pieceData).to.be.undefined;
	});


	it('should import an image from the piece', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.getPieceData(8);

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				numPiecesDb.getImage(pieceData)
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

	it('should import an image from the id', () => {
		const numPiecesDb = new NumPiecesDb();
		const pieceData = numPiecesDb.getPieceData(8);

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				numPiecesDb.getImageById(pieceData.id)
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
		const cut = numPiecesDb.getImageById('invalid');
		expect(cut).to.be.undefined;
	});

});