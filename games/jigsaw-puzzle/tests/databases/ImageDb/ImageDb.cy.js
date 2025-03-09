import ImageDb from "../../../src/classes/databases/ImageDb/ImageDb.js";

import { images } from '../support.js';
import ImageDbData from "../../../src/classes/databases/ImageDbData/ImageDbData.js";

describe('When I work with the ImageDb class', () => {

	const testData = images[0];
	const testImage = images[0].images[0];

	beforeEach(() => {
		ImageDb.reset(images);
	});

	it('should initialize the class', () => {
		const imageDb = new ImageDb();
		expect(imageDb instanceof ImageDb).to.be.true;
	});

	it('should return same instance if the class is initialized a second time', () => {
		const imageDb = new ImageDb();
		expect(new ImageDb()).to.equal(imageDb);
	});

	it('should get a list of categories', () => {
		const imageDb = new ImageDb();
		const categoryNames = imageDb.getCategoryNames();
		expect(categoryNames).to.have.lengthOf(4);
	});

	it('should get a list of image URLs for a category', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getCategoryImages(testData.id);
		expect(beach).to.have.lengthOf(2);
	});

	it('should return undefined if category is invalid', () => {
		const imageDb = new ImageDb();
		const invalid = imageDb.getCategoryImages('invalid');
		expect(invalid).to.be.undefined;
	});

	it('should retrieve the imageData based upon Id', () => {
		const imageDb = new ImageDb();
		const imageData = imageDb.get(testImage.id);
		expect(imageData).to.be.instanceOf(ImageDbData);
	});

	it('should return undefined if the ID is invalid accessing getImageData', () => {
		const imageDb = new ImageDb();
		const imageData = imageDb.get('invalid');
		expect(imageData).to.be.undefined;
	});

	it('should import an image', () => {
		const imageDb = new ImageDb();

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				imageDb.getImage(testImage.id)
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
						expect(image.width).to.equal(ImageDb.IMAGE_WIDTH);
						expect(image.height).to.equal(ImageDb.IMAGE_HEIGHT);
						expect(image.dataset.id).to.equal(testImage.id);
						expect(image.getAttribute('target')).to.equal('image');
					})
			});
	});

	it('should import an image thumbnail', () => {
		const imageDb = new ImageDb();

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				imageDb.getImage(testImage.id, true)
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
						expect(image.width).to.equal(ImageDb.THUMBNAIL_WIDTH);
						expect(image.height).to.equal(ImageDb.THUMBNAIL_HEIGHT);
						expect(image.dataset.id).to.equal(testImage.id);
						expect(image.getAttribute('target')).to.equal('image');
					})
			});
	});

	it('should return undefined if imageId is not there', () => {
		const imageDb = new ImageDb();
		const image = imageDb.getImage('invalid');
		expect(image).to.be.undefined;
	});
});