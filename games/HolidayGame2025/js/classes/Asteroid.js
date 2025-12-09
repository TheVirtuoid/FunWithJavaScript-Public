export default class Asteroid {
	static SCALE_SMALL = 0.05;
	static SCALE_MEDIUM = 0.1;
	static SCALE_LARGE = 0.2;

	#scene;
	#asteroid;
	#scale;

	constructor(scene) {
		this.#scene = scene;
	}

	static Preload(scene) {
		scene.load.image('asteroid', '/img/giftbox.png');
	}

	create(args = {}) {
		const { scale = Asteroid.SCALE_LARGE, x = 0, y = 0 } = args;
		this.#asteroid = this.#scene.physics.add.sprite(x, y, 'asteroid');
		this.#asteroid.setOrigin(0.5);
		this.#asteroid.setScale(scale);
		this.#asteroid.setCollideWorldBounds(true);
		this.#asteroid.setBounce(1, 1);
		this.#asteroid.body.setAllowGravity(false);
		this.#asteroid.setAttributes();
		this.#scale = scale;
	}

	get sprite() {
		return this.#asteroid;
	}

	get scale() {
		return this.#scale;
	}

	setAttributes() {
		this.#asteroid.setBounce(1,1);
		this.#asteroid.body.setAllowGravity(false);
		const asteroidAngle = Phaser.Math.DegToRad(Math.random() * 360);
		this.#asteroid.body.setVelocity(Math.cos(asteroidAngle) * (Math.random() * 200 + 100), Math.sin(asteroidAngle) * (Math.random() * 200 + 100));
		this.#asteroid.setAngularVelocity(Math.random() * 30 + 50);

	}
}