import TowerType from "../../enums/TowerType.js";

export default class Tower {

	#position;
	#radius;
	#scene;
	#image;

	constructor(args = {}) {
		const { position, radius, scene } = args;
		this.#position = position;
		this.#radius = radius || TowerType.DEFAULT_RADIUS;
		this.#scene = scene;
	}

	get position() {
		return this.#position;
	}

	get radius() {
		return this.#radius;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get image() {
		return this.#image;
	}

	static preload(scene) {
		scene.load.image(TowerType.NAME, TowerType.IMAGE_URL);
	}

	create() {
		this.#image = this.#scene.add.image(this.position.x, this.position.y, TowerType.NAME).setScale(TowerType.DEFAULT_SCALE);
	}
}