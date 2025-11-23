export default class Santa {
	#sprite;
	#radius;
	#displayRadius;

	static Preload(scene) {
		scene.load.image('santa', '/img/santa.png');
	}

	constructor(scene, x, y) {
		this.#sprite = scene.physics.add.sprite(x, y, 'santa');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.10);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.setImmovable(true);
		this.#displayRadius = this.#sprite.displayWidth / 2;
	}

	get x() {
		return this.#sprite.x;
	}
	get y() {
		return this.#sprite.y;
	}
	get radius() {
		return this.#radius;
	}
	get displayRadius() {
		return this.#displayRadius;
	}
	get sprite() {
		return this.#sprite;
	}
	get displayWidth() {
		return this.#sprite.displayWidth;
	}
	get displayHeight() {
		return this.#sprite.displayHeight;
	}
	get width() {
		return this.#sprite.width;
	}
	get height() {
		return this.#sprite.height;
	}
}