import ImageDbData from "../ImageDbData/ImageDbData.js";

export default class ImageDbCategory {
	#category;
	#images;

	constructor(args = {}) {
		this.#category = args.category || null;
		this.#images = [];
		const images = args.images || [];
		images.forEach((imageData) => {
			this.#images.push(new ImageDbData(imageData));
		});
	}

	get category() {
		return this.#category;
	}

	get images() {
		return this.#images;
	}
}