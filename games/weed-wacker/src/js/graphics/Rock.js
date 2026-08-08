export default class Rock {
	#scene;
	#sprite;
	#type;

	constructor(scene, type) {
		this.#scene = scene;
		this.#type = type;
	}

	create(physicsGroup, x, y, imageName) {
		this.#sprite = physicsGroup.create(x, y, imageName);
	}

	get sprite() {
		return this.#sprite;
	}

	destroy() {
		this.#sprite.destroy();
	}
}