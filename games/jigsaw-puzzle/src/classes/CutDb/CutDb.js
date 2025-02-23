import ImageDb from "../ImageDb/ImageDb.js";

const defaultCuts = new Map([]);

let instance = null;
let cutDatabase = null;
let cutIdDatabase = null;

export default class CutDb {

	static reset(cuts) {
		cutDatabase = cuts ? cuts : defaultCuts;
		instance = null;
		cutIdDatabase = new Map();
		cutDatabase.forEach((cut) => {
			cutIdDatabase.set(cut.id, cut);
		});
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

	getImageById(id) {
		const cut = cutIdDatabase.get(id);
		if (!cut) {
			return cut;
		}
		return this.getImage(cut);
	}

	getImage(cut) {
		const { url, id } = cut || {};
		if (!url || !id) {
			return undefined;
		}
		const width = ImageDb.THUMBNAIL_WIDTH;
		const height = ImageDb.THUMBNAIL_HEIGHT;
		return new Promise((resolve, reject) => {
			const imgElement = new Image(width, height);
			imgElement.dataset.id = id;
			imgElement.setAttribute('target', '');
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