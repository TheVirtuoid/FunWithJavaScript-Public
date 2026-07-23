export default class Weed {
	#scene;
	#healthBarGreen;
	#healthBarBlack;
	#sprite;
	#hitPoints;
	#maxHitPoints;

	constructor(scene) {
		this.#scene = scene;
	}

	create(physicsGroup, x, y) {
		this.#sprite = physicsGroup.create(x, y, 'weed-0');
		this.#createHealthBar();
		this.#hitPoints = 1000;
		this.#maxHitPoints = 1000;
	}

	get sprite() {
		return this.#sprite;
	}

	#createHealthBar() {
		this.#healthBarGreen = this.#scene.add.rectangle(
			0, 0,
			30, // width
			5,  // height
			0x00ff00 // green color
		);
		this.#healthBarGreen.setOrigin(0, 0.5);
		this.#healthBarGreen.visible = true;
		this.#healthBarGreen.setPosition(this.#sprite.x, this.#sprite.y - 30);
		this.#healthBarBlack = this.#scene.add.rectangle(
			0, 0,
			0, // width
			5,  // height
			0x000000 // black color
		);
		this.#healthBarBlack.setOrigin(0, 0.5);
		this.#healthBarBlack.visible = true;
		this.#healthBarBlack.setPosition(this.#sprite.x + 30, this.#sprite.y - 30);
	}

	updateHitPoints(value) {
		this.#hitPoints += value;
		this.#updateHealthBar();
		if (this.#hitPoints <= 0) {
			this.#sprite.destroy();
			this.#healthBarGreen.destroy();
			this.#healthBarBlack.destroy();
		}
	}

	#updateHealthBar() {
		const healthPercentage = this.#hitPoints / this.#maxHitPoints;
		this.#healthBarGreen.width = 30 * healthPercentage; // 30 is the original width
		this.#healthBarBlack.width = 30 - this.#healthBarGreen.width; // 30 is the original width
		this.#healthBarBlack.setPosition(this.#sprite.x + 30 - this.#healthBarBlack.width, this.#sprite.y - 30);
	}
}