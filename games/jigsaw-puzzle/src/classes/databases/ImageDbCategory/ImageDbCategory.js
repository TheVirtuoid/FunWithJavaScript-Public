import ImageDbData from "../ImageDbData/ImageDbData.js";

export default class ImageDbCategory {
	#category;
	#images;
	#name;
	#id;

	constructor(args = {}) {
		this.#category = args.category || null;
		this.#name = args.name || null;
		this.#id = args.id || null;
		if (!args.images || args.images.length === 0) {
			this.#images = null;
		} else {
			this.#images = new Map();
			args.images.forEach((imageData) => {
				const imageDbData = new ImageDbData(imageData);
				this.#images.set(imageDbData.id, imageDbData);
			});
		}
	}

	get category() {
		return this.#category;
	}

	get images() {
		return this.#images;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	getImageDbData(id) {
		return this.#images.get(id);
	}
}