import ImageDb from "../../src/classes/ImageDb/ImageDb.js";

import { images } from '../support.js';

describe('When I work with the ImageDb class', () => {

	beforeEach(() => {
		ImageDb.reset(images);
	});

	it('should initialize the class', () => {
		const imageDb = new ImageDb();
		expect(imageDb instanceof ImageDb).to.be.true;
	});

	it('should throw an exception if the class is initialized a second time', () => {
		const imageDb = new ImageDb();
		expect(() => new ImageDb()).to.throw();
	});

	it('should get a list of categories', () => {
		const imageDb = new ImageDb();
		const categories = imageDb.getCategories();
		expect(categories).to.have.lengthOf(4);
		expect(categories).to.include('beach');
		expect(categories).to.include('landscape');
		expect(categories).to.include('insects');
		expect(categories).to.include('cities');
	});

	it('should get a list of image URLs for a category', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getImagesFromCategory('beach');
		expect(beach).to.have.lengthOf(2);
	});

	it('should return an empty array if category is invalid', () => {
		const imageDb = new ImageDb();
		const invalid = imageDb.getImagesFromCategory('invalid');
		expect(invalid).to.have.lengthOf(0);
	});

	it('should make that image URL list available', () => {
		const imageDb = new ImageDb();
		const images = imageDb.getAllImageData();
		expect(images.get('landscape')).to.have.lengthOf(1);
		expect(images.get('beach')).to.have.lengthOf(2);
		expect(images.get('insects')).to.have.lengthOf(1);
		expect(images.get('cities')).to.have.lengthOf(1);
	});

	it('should import an image', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getImagesFromCategory('beach');
		const target = beach[0];
		const targetId = target.id;

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				imageDb.getImage(target)
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
						expect(image.dataset.id).to.equal(targetId);
						expect(image.getAttribute('target')).to.equal('image');
					})
			});
	});

	it('should import an image thumbnail', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getImagesFromCategory('beach');
		const target = beach[0];
		const targetId = target.id;

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				imageDb.getImage(target, true)
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
						expect(image.dataset.id).to.equal(targetId);
						expect(image.getAttribute('target')).to.equal('image');
					})
			});
	});

	it('should import an image based upon ID', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getImagesFromCategory('beach');
		const target = beach[0];
		const targetId = target.id;

		const getImagePromise = () => {
			return new Cypress.Promise((resolve, reject) => {
				imageDb.getImageById(targetId)
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
						expect(image.dataset.id).to.equal(targetId);
						expect(image.getAttribute('target')).to.equal('image');
					})
			});
	});

	it('should return undefined if imageId is not there', () => {
		const imageDb = new ImageDb();
		const image = imageDb.getImageById('invalid');
		expect(image).to.be.undefined;
	});

	it('should return undefined if image is not there', () => {
		const imageDb = new ImageDb();
		const image = imageDb.getImage('invalid');
		expect(image).to.be.undefined;
	});

});