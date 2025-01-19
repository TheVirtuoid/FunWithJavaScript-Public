export default class Picture {
	#image;

	constructor(picture) {
		this.#image = picture || null;
	}

	get image() {
		return this.#image;
	}
}