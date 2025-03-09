import ImageDbCategory from "../ImageDbCategory/ImageDbCategory.js";
import ImageDbData from "../ImageDbData/ImageDbData.js";

let instance = null;
let database = null;
let imageDatabase = null;

export default class ImageDb {

	static reset(images = []) {
		database = new Map();
		imageDatabase = new Map();
		instance = null;
		images.forEach(categoryData => {
			const category = new ImageDbCategory(categoryData);
			database.set(category.id, category);
			category.images.forEach((imageData) => {
				const imageDbData = new ImageDbData(imageData);
				imageDatabase.set(imageData.id, imageDbData);
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

	getCategoryNames() {
		const names = [];
		database.forEach(category => {
			names.push(category.name);
		});
		return names;
	}

	getCategory(id) {
		return database.get(id);
	}

	getCategoryImages(id) {
		return database.get(id)?.images;
	}

	getAllImageIds() {
		const ids = [];
		imageDatabase.forEach(image => {
			ids.push(image.id);
		});
		return ids;
	}

	get(id) {
		return imageDatabase.get(id);
	}

	getImage(id, thumbnail = false) {
		const imageDbData = this.get(id);
		if (!imageDbData) {
			return undefined;
		}
		const { url } = imageDbData;
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