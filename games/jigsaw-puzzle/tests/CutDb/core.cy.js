
import { cuts } from '../support.js';
import CutDb from "../../src/classes/CutDb/CutDb.js";
import ImageDb from "../../src/classes/ImageDb/ImageDb.js";

describe('When I work with the CutDb class', () => {

	beforeEach(() => {
		CutDb.reset(cuts);
	});

	it('should initialize the class', () => {
		const cutDb = new CutDb();
		expect(cutDb instanceof CutDb).to.be.true;
	});

	it('should return the same instance if the class is initialized a second time', () => {
		const cutDb = new CutDb();
		expect(new CutDb()).to.equal(cutDb);
	});

	it('should get a list of cuts', () => {
		const cutDb = new CutDb();
		const categories = cutDb.getCutNames();
		expect(categories).to.have.lengthOf(2);
		expect(categories).to.include('square');
		expect(categories).to.include('jigsaw');
	});

	it('should get a cut from a named cut', () => {
		const cutDb = new CutDb();
		const square = cutDb.getCut('square');
		expect(square).to.have.property('name', 'Square');
		expect(square).to.have.property('description', 'A square cut');
	});

	it('should return undefined cut is invalid', () => {
		const cutDb = new CutDb();
		const invalid = cutDb.getCut('invalid');
		expect(invalid).to.be.undefined;
	});

	it('should retrieve the cutData based upon Id', () => {
		const cutDb = new CutDb();
		const square = cutDb.getCut('square');
		const id = square.id;
		const cutData = cutDb.getCutData(id);
		expect(cutData.url).to.equal(square.url);
		expect(cutData.id).to.equal(square.id);
		expect(cutData.name).to.equal(square.name);
		expect(cutData.description).to.equal(square.description);
	});

	it('should return undefined if the ID is invalid accessing getImageData', () => {
		const cutDb = new CutDb();
		const cutData = cutDb.getCutData('invalid');
		expect(cutData).to.be.undefined;
	});


	it('should import an image from the cut', () => {
		const cutDb = new CutDb();
		const square = cutDb.getCut('square');
		const squareId = square.id;

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				cutDb.getImage(square)
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
						expect(image instanceof Image).to.be.true;
						expect(image.dataset.id).to.equal(squareId);
						expect(image.getAttribute('target')).to.equal('cut');
					})
			});
	});

	it('should import an image from the cutId', () => {
		const cutDb = new CutDb();
		const square = cutDb.getCut('square');
		const squareId = square.id;

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				cutDb.getImageById(squareId)
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
						expect(image instanceof Image).to.be.true;
						expect(image.dataset.id).to.equal(squareId);
						expect(image.getAttribute('target')).to.equal('cut');
					})
			});
	});

	it('should import not return an invalid cutId', () => {
		const cutDb = new CutDb();
		const cut = cutDb.getImageById('invalid');
		expect(cut).to.be.undefined;
	});

	it('should import not return an invalid cut', () => {
		const cutDb = new CutDb();
		const cut = cutDb.getImage('invalid');
		expect(cut).to.be.undefined;
	});

});