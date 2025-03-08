import {images} from "../support.js";
import ImageDb from "../../../src/classes/databases/ImageDb/ImageDb.js";
import ImageDbCategory from "../../../src/classes/databases/ImageDbCategory/ImageDbCategory.js";

describe('When I use the Reset static method on ImageDb', () => {
	it('should reset the ImageDb to an empty state', () => {
		ImageDb.reset();
		const imageDb = new ImageDb();
		const categoryNames = imageDb.getCategories();
		expect(categoryNames.length).to.equal(0);
	});

	it('should setup the Database with the correct typed parameters', () => {
		ImageDb.reset(images);
		const imageDb = new ImageDb();
		const category = imageDb.getCategories()[0];
		expect(category).to.be.instanceOf(ImageDbCategory);
	});
});