import venueData from "./VenueDb.js";

export default class VenueData {
	#id;
	#name;
	#description;
	#thumbnailUrl;
	#layout;
	#models;
	#thumbnail;

	constructor(args = {}) {
		const { id = '', name = '', description = '', thumbnailUrl = '', models = [], layout = [] } = args;
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#thumbnailUrl = thumbnailUrl;
		this.#models = models;
		this.#layout = layout;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get thumbnailUrl() {
		return this.#thumbnailUrl;
	}

	get models() {
		return this.#models;
	}

	get layout() {
		return this.#layout;
	}

	get thumbnail() {
		return this.#thumbnail;
	}

	loadVenue() {
		return new Promise((resolve, reject) => {
			if (this.thumbnail) {
				resolve(this);
			}
			const imgElement = new Image(200, 170);
			imgElement.dataset.id = this.id;
			imgElement.onload = () => {
				this.#thumbnail = imgElement;
				resolve(this);
			};
			imgElement.onerror = (error) => {
				console.log('thumbnail not loaded: ', this.thumbnailUrl, error);
				reject('Venue Thumbnail could not be loaded');
			};
			imgElement.src = this.thumbnailUrl;
		});
	}
}