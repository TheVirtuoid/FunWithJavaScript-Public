
import { numPieces } from '../support.js';
import NumPiecesDb from "../../src/classes/NumPiecesDb/NumPiecesDb.js";
import ImageDb from "../../src/classes/ImageDb/ImageDb.js";

describe('When I work with the NumPieces class', () => {

	beforeEach(() => {
		NumPiecesDb.reset(numPieces);
	});

	it('should initialize the class', () => {
		const numPiecesDb = new NumPiecesDb();
		expect(numPiecesDb instanceof NumPiecesDb).to.be.true;
	});

	it('should throw an exception if the class is initialized a second time', () => {
		const numPiecesDb = new NumPiecesDb();
		expect(() => new NumPiecesDb()).to.throw();
	});

	it('should get a list of num pieces', () => {
		const numPiecesDb = new NumPiecesDb();
		const numberList = numPiecesDb.getNumPieces();
		expect(numberList).to.have.lengthOf(3);
		expect(numberList).to.include(8);
		expect(numberList).to.include(16);
		expect(numberList).to.include(32);
	});

	it('should create an image from the number of pieces', () => {
		const numPiecesDb = new NumPiecesDb();
		const numPieces = numPiecesDb.getNumPieces();
		const number = numPieces[0];

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				numPiecesDb.getImage(number)
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
						expect(image.dataset.id).to.equal(`${number}`);
					})
			});
	});

	it('should return undefined if number is not valid', () => {
		const numPiecesDb = new NumPiecesDb();
		const invalid = numPiecesDb.getImage(0);
		expect(invalid).to.be.undefined;
	});

});