import ImageDb from "../../src/classes/ImageDb/ImageDb.js";

const images = new Map([
	['beach', [{ url: 'src/images/beach-41872_1280.jpg' }, { url: 'beach2.jpg' }, { url: 'beach3.jpg' }]],
	['landscape', [{ url: 'landscape1.jpg' }, { url: 'landscape2.jpg' }, { url: 'landscape3.jpg' }]],
	['insects', [{ url: 'insects1.jpg' }, { url: 'insects2.jpg' }, { url: 'insects3.jpg' }]],
	['cities', [{ url: 'cities1.jpg' }, { url: 'cities2.jpg' }, { url: 'cities3.jpg' }]]
]);

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
		const beach = imageDb.getImages('beach');
		expect(beach).to.have.lengthOf(3);
	});

	it('should return an empty array if category is invalid', () => {
		const imageDb = new ImageDb();
		const invalid = imageDb.getImages('invalid');
		expect(invalid).to.have.lengthOf(0);
	});

	it('should make that image URL list available', () => {
		const imageDb = new ImageDb();
		const images = imageDb.getAllImages();
		expect(images.get('landscape')).to.have.lengthOf(3);
		expect(images.get('beach')).to.have.lengthOf(3);
		expect(images.get('insects')).to.have.lengthOf(3);
		expect(images.get('cities')).to.have.lengthOf(3);
	});

	it('should import an image', () => {
		const imageDb = new ImageDb();
		const beach = imageDb.getImages('beach');
		const target = beach[0];
		console.log(target);
		imageDb.getImage(target)
			.then(image => {
				console.log(image);
				expect(false).to.be.true;
			})
			.catch(err => {
				console.log(err);
				expect(false).to.be.true;
			});
	});
});