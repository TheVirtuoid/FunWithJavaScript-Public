import ImageDb from "../ImageDb/ImageDb.js";
import CutDbData from "../CutDbData/CutDbData.js";

let instance = null;
let database = null;

export default class CutDb {

	static reset(cuts = []) {
		database = new Map();
		instance = null;
		cuts.forEach((cut) => {
			const cutData = new CutDbData(cut);
			database.set(cutData.id, cutData);
		});

	}

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}

	get(id) {
		return database.get(id);
	}

	getNames() {
		const names = [];
		database.forEach((cutData) => {
			names.push(cutData.name);
		});
		return names;
	}

	getImage(id) {
		const cut = this.get(id);
		if (!cut) {
			return cut;
		}
		const { url } = cut;
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