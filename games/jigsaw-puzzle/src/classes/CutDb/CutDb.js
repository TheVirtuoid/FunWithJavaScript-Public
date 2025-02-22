import ImageDb from "../ImageDb/ImageDb.js";

const defaultCuts = new Map([]);

let instance = null;
let cutDatabase = null;

export default class CutDb {

	static reset(cuts) {
		cutDatabase = cuts ? cuts : defaultCuts;
		instance = null;
	}

	constructor() {
		if (instance) {
			throw new Error('CutDb class has already been initialized');
		}
		instance = this;
	}

	getCutNames() {
		return Array.from(cutDatabase.keys());
	}

	getCut(cutName) {
		return cutDatabase.get(cutName);
	}

	getImage(cut) {
		const { url } = cut;
		const width = ImageDb.THUMBNAIL_WIDTH;
		const height = ImageDb.THUMBNAIL_HEIGHT;
		return new Promise((resolve, reject) => {
			const imgElement = new Image(width, height);
			imgElement.onload = () => {
				resolve(imgElement);
			};
			imgElement.onerror = (error) => {
				console.log(error);
				reject('Cut Image could not be loaded');
			};
			imgElement.src = url;
		});
	}
}