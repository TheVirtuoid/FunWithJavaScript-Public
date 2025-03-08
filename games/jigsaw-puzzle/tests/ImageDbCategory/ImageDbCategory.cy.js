import ImageDbCategory from "../../src/classes/ImageDbCategory/ImageDbCategory.js";
import ImageDbData from "../../src/classes/ImageDbData/ImageDbData.js";

describe('WHen I work with the ImageDbCategory class', () => {
	it('should initialize an empty class', () => {
		const imageDbCategoryData = new ImageDbCategory();
		expect(imageDbCategoryData).to.have.property('category', null);
		expect(imageDbCategoryData).to.have.property('images');
		expect(imageDbCategoryData.images).to.have.length(0);
	});

	it('should initialize the claas based upon individual properties', () => {
		const testData = 	{ category: 'beach', images: [
				{ url: '/images/beach-418742_1280.jpg', id: 'ac09e151-333f-48e8-ab87-e608c0d5bd7b', name: 'My Favorite Beach', category: 'beach' },
				{ url: '/images/beach-6292382_1280.jpg', id: '52fc4101-5ccc-498a-ae63-a477e4d95c52', name: 'My Stock Footage Beach', category: 'beach' }
			] };
		const imageDbCategoryData = new ImageDbCategory(testData);
		expect(imageDbCategoryData.category).to.equal(testData.category);
		expect(imageDbCategoryData.images).to.have.length(testData.images.length);
		expect(imageDbCategoryData.images[0]).to.be.instanceOf(ImageDbData);
	});
});
