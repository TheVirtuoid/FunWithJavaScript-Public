export default class Elfship {
	#sprite;
	#radius;
	#displayRadius;

	static Preload(scene) {
		scene.load.image('elfship', '/img/elf-ship.png');
	}

	constructor(scene, x, y) {
		this.#sprite = scene.physics.add.sprite(x, y, 'elfship');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.15);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.setImmovable(true);
		// this.#sprite.body.setCollideWorldBounds(true);
		// Enable damping so drag is applied smoothly
		// this.#sprite.body.setDamping(false);
		// Drag acts like friction; tune these values
		// this.#sprite.body.setDrag(100, 100);
		// Limit maximum speed
		// this.#sprite.body.setMaxVelocity(400, 400);
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