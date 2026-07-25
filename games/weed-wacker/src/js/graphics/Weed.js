export default class Weed {
	#scene;
	#healthBarGreen;
	#healthBarBlack;
	#sprite;
	#hitPoints;
	#maxHitPoints;
	#index;

	constructor(scene, index) {
		this.#scene = scene;
		this.#index = index;
	}

	create(physicsGroup, x, y, imageName) {
		this.#sprite = physicsGroup.create(x, y, imageName);
		this.#createHealthBar();
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

	destroy() {
		this.#sprite.destroy();
		this.#healthBarGreen.destroy();
		this.#healthBarBlack.destroy();
		this.#scene.events.emit('weedDestroyed', this.#index);
	}

	updateHealthBar(toughness, maxToughness) {
		const healthPercentage = toughness / maxToughness;
		this.#healthBarGreen.width = 30 * healthPercentage; // 30 is the original width
		this.#healthBarBlack.width = 30 - this.#healthBarGreen.width; // 30 is the original width
		this.#healthBarBlack.setPosition(this.#sprite.x + 30 - this.#healthBarBlack.width, this.#sprite.y - 30);
	}
}