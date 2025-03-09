
import { cuts } from '../support.js';
import CutDb from "../../../src/classes/databases/CutDb/CutDb.js";
import ImageDb from "../../../src/classes/databases/ImageDb/ImageDb.js";
import Position2d from "../../../src/classes/support/Position2d.js";
import CutDbData from "../../../src/classes/databases/CutDbData/CutDbData.js";

describe('When I work with the CutDb class', () => {

	let testData;

	beforeEach(() => {
		CutDb.reset(cuts);
		testData = cuts[0];
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
		const categories = cutDb.getNames();
		expect(categories).to.have.lengthOf(2);
	});

	it('should get a cut from a named cut', () => {
		const cutDb = new CutDb();
		const square = cutDb.get(testData.id);
		expect(square).to.be.instanceOf(CutDbData);
	});

	it('should return undefined cut is invalid', () => {
		const cutDb = new CutDb();
		const invalid = cutDb.get('invalid');
		expect(invalid).to.be.undefined;
	});

	it('should import an image from the cut', () => {
		const cutDb = new CutDb();

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				cutDb.getImage(testData.id)
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
						expect(image.dataset.id).to.equal(testData.id);
						expect(image.getAttribute('target')).to.equal('cut');
					})
			});
	});

	it('should import not return an invalid cut', () => {
		const cutDb = new CutDb();
		const cut = cutDb.getImage('invalid');
		expect(cut).to.be.undefined;
	});

	it('should get a list of cut ids', () => {
		const cutDb = new CutDb();
		const ids = cutDb.getIds();
		expect(ids).to.have.lengthOf(2);
	});

});