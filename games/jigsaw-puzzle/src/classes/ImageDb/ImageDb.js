const defaultImages = new Map([]);

let instance = null;
let imageDatabase = null;
let imageIdDatabase = null;

export default class ImageDb {

	static reset(images) {
		imageDatabase = images ? images : defaultImages;
		instance = null;
		imageIdDatabase = new Map();
		images.forEach((category) => {
			category.forEach((imageData) => {
				imageIdDatabase.set(imageData.id, imageData);
			});
		});
	}

	static IMAGE_WIDTH = 800;
	static IMAGE_HEIGHT = 600;
	static THUMBNAIL_WIDTH = 80;
	static THUMBNAIL_HEIGHT = 60;

	constructor() {
		if (instance) {
			return instance;
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

	getImageById(id) {
		const imageEntry = imageIdDatabase.get(id);
		if (!imageEntry) {
			return imageEntry;
		}
		return this.getImage(imageEntry);
	}

	getImageData(id) {
		return imageIdDatabase.get(id);
	}

	getImage(entry, thumbnail = false) {
		const { url, id } = entry || {};
		if (!url || !id) {
			return undefined;
		}
		const width = thumbnail ? ImageDb.THUMBNAIL_WIDTH : ImageDb.IMAGE_WIDTH;
		const height = thumbnail ? ImageDb.THUMBNAIL_HEIGHT : ImageDb.IMAGE_HEIGHT;
		return new Promise((resolve, reject) => {
			const imgElement = new Image(width, height);
			imgElement.dataset.id = id;
			imgElement.setAttribute('target', 'image');
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