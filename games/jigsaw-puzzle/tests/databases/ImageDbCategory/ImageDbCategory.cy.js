import ImageDbCategory from "../../../src/classes/databases/ImageDbCategory/ImageDbCategory.js";
import ImageDbData from "../../../src/classes/databases/ImageDbData/ImageDbData.js";

describe('When I work with the ImageDbCategory class', () => {
	it('should initialize an empty class', () => {
		const imageDbCategoryData = new ImageDbCategory();
		expect(imageDbCategoryData).to.have.property('category', null);
		expect(imageDbCategoryData).to.have.property('images', null);
		expect(imageDbCategoryData).to.have.property('name', null);
		expect(imageDbCategoryData).to.have.property('id', null);
	});

	it('should initialize the claas based upon individual properties', () => {
		const testData = { category: 'beach', name: 'Beach', id: '18c4ab63-d455-4824-afb3-a0dd4369c354', images: [
				{ url: '/images/beach-418742_1280.jpg', id: 'ac09e151-333f-48e8-ab87-e608c0d5bd7b', name: 'My Favorite Beach', category: 'beach' },
				{ url: '/images/beach-6292382_1280.jpg', id: '52fc4101-5ccc-498a-ae63-a477e4d95c52', name: 'My Stock Footage Beach', category: 'beach' }
			] };
		const imageDbCategoryData = new ImageDbCategory(testData);
		expect(imageDbCategoryData.category).to.equal(testData.category);
		expect(imageDbCategoryData.name).to.equal(testData.name);
		expect(imageDbCategoryData.id).to.equal(testData.id);
		expect(imageDbCategoryData.images.size).to.equal(testData.images.length);
		const imageDbData = imageDbCategoryData.getImageDbData(testData.images[0].id);
		expect(imageDbData).to.be.instanceOf(ImageDbData);
	});
});
