const defaultImages = new Map([]);

let instance = null;
let imageDatabase = null;

export default class ImageDb {

	static reset(images) {
		imageDatabase = images ? images : defaultImages;
		instance = null;
	}

	static IMAGE_WIDTH = 800;
	static IMAGE_HEIGHT = 600;
	static THUMBNAIL_WIDTH = 80;
	static THUMBNAIL_HEIGHT = 60;

	constructor() {
		if (instance) {
			throw new Error('ImageDb class has already been initialized');
		}
		instance = this;
	}

	getCategories() {
		return Array.from(imageDatabase.keys());
	}

	getImagesFromCategory(categoryName) {
		const category = imageDatabase.get(categoryName);
		return !category ? [] : category;
	}

	getAllImageData() {
		return imageDatabase;
	}

	getImage(entry, thumbnail = false) {
		const { url } = entry;
		const width = thumbnail ? ImageDb.THUMBNAIL_WIDTH : ImageDb.IMAGE_WIDTH;
		const height = thumbnail ? ImageDb.THUMBNAIL_HEIGHT : ImageDb.IMAGE_HEIGHT;
		return new Promise((resolve, reject) => {
			const imgElement = new Image(width, height);
			imgElement.onload = () => {
				resolve(imgElement);
			};
			imgElement.onerror = () => {
				reject('Image could not be loaded');
			};
			imgElement.src = url;
		});
	}
}