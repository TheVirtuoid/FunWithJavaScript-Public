const defaultImages = new Map([]);

let instance = null;
let imageDatabase = null;

export default class ImageDb {

	static reset(images) {
		imageDatabase = images ? images : defaultImages;
		instance = null;
	}

	constructor() {
		if (instance) {
			throw new Error('ImageDb class has already been initialized');
		}
		instance = this;
	}

	getCategories() {
		return Array.from(imageDatabase.keys());
	}

	getImages(categoryName) {
		const category = imageDatabase.get(categoryName);
		return !category ? [] : category;
	}

	getAllImages() {
		return imageDatabase;
	}
}