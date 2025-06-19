import Model from "../Model/Model.js";

export default class CarData {
	#id;
	#name;
	#description;
	#modelUrl;
	#thumbnailUrl;
	#model;
	#thumbnail;

	constructor(args = {}) {
		const { id = '', name = '', description = '', modelUrl = '', thumbnailUrl = '' } = args;
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#modelUrl = modelUrl;
		this.#thumbnailUrl = thumbnailUrl;
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

	get modelUrl() {
		return this.#modelUrl;
	}

	get thumbnailUrl() {
		return this.#thumbnailUrl;
	}

	get model() {
		return this.#model;
	}

	get thumbnail() {
		return this.#thumbnail;
	}

	loadCar() {
		return new Promise((resolve, reject) => {
			const loadPromises = [
				this.#loadModel(),
				this.#loadThumbnail()
			];
			Promise.all(loadPromises)
				.then(resolve)
				.catch(reject);
		});
	}

	#loadModel() {
		return new Promise((resolve, reject) => {
			if (this.model) {
				resolve(this);
			}
			fetch(this.modelUrl)
				.then(response => {
					if (!response.ok) {
						console.log(`HTTP error! status: ${response.status}`);
						reject('Car Model could not be loaded (HTTP error)');
					} else {
						this.#model = response.arrayBuffer();
						resolve(this);
					}
				})
				.catch((error) => {
					console.log('model not loaded', this.modelUrl, error);
					reject('Car Model could not be loaded');
				});
		});
	}

	#loadThumbnail() {
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
				reject('Car Thumbnail could not be loaded');
			};
			imgElement.src = this.thumbnailUrl;
		});
	}

}