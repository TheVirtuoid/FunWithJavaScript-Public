export default class Krampus {

	#scene;
	#sprite;
	#radius;
	#displayRadius;

	static Preload(scene) {
		scene.load.image('krampus', '/img/krampus.png');
	}

	constructor(scene, x, y) {
		this.#scene = scene;

		this.#sprite = this.#scene.physics.add.sprite(x, y, 'krampus');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.075);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.body.setCollideWorldBounds(true);
		// Enable damping so drag is applied smoothly
		this.#sprite.body.setDamping(false);
		// Drag acts like friction; tune these values
		this.#sprite.body.setDrag(100, 100);
		// Limit maximum speed
		this.#sprite.body.setMaxVelocity(400, 400);
		this.#displayRadius = this.#sprite.displayWidth / 2;
	}

	setAcceleration(x, y) {
		this.#sprite.body.setAcceleration(x, y);
	}

	get x() {
		return this.#sprite.x;
	}

	get y() {
		return this.#sprite.y;
	}

	get height() {
		return this.#sprite.height;
	}

	get width() {
		return this.#sprite.width;
	}

	get displayHeight() {
		return this.#sprite.displayHeight;
	}

	get displayWidth() {
		return this.#sprite.displayWidth;
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

}