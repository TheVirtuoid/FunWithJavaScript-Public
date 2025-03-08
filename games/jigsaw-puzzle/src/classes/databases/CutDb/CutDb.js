import ImageDb from "../ImageDb/ImageDb.js";
import NumPieceDbData from "../NumPieceDbData/NumPieceDbData.js";
import CutDbData from "../CutDbData/CutDbData.js";

const defaultCuts = new Map([]);

let instance = null;
let cutDatabase = null;
let cutIdDatabase = null;

export default class CutDb {

	static reset(cuts = []) {
		cutDatabase = new Map();
		cutIdDatabase = new Map();
		instance = null;
		cuts.forEach((cut) => {
			const cutData = new CutDbData(cut);
			cutDatabase.set(cutData.name, cutData);
			cutIdDatabase.set(cutData.id, cutData);
		});

	}

	constructor() {
		if (instance) {
			return instance;
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

	getCutData(id) {
		return cutIdDatabase.get(id);
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
			imgElement.setAttribute('target', 'cut');
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