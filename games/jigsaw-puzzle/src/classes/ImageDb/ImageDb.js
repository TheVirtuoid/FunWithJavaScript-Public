const defaultImages = new Map([]);

let instance = null;
let imageDatabase = null;
const { origin } = window?.location;

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

	getImage(entry) {
		const { url } = entry;
		return new Promise((resolve, reject) => {
			console.log('there');
			const imgElement = new Image(800, 600);
			imgElement.onload = () => {
				console.log('asiodjaiod');
				resolve(imgElement);
			};
			imgElement.onerror = () => {
				console.log('reject');
				reject('Image could not be loaded');
			};
			imgElement.src = url;
		});
	}
}