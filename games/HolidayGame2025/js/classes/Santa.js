export default class Santa {
	#sprite;
	#radius;
	#displayRadius;
	#scene;
	#movingTarget;
	#speed = 300;

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
		this.#scene = scene;
		this.#movingTarget = null;
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

	launch() {
		const radius = this.displayRadius;
		const bounds = this.#scene.physics.world.bounds;
		const offset = radius + 20; // Ensure it is fully off-screen relative to the bounds
		let startX, startY, endX, endY;
		const side = Phaser.Math.Between(0, 3);
		switch (side) {
			case 0: // Left -> Right
				startX = bounds.x - offset;
				startY = Phaser.Math.Between(bounds.y, bounds.bottom);
				endX = bounds.right + offset;
				endY = Phaser.Math.Between(bounds.y, bounds.bottom);
				break;
			case 1: // Right -> Left
				startX = bounds.right + offset;
				startY = Phaser.Math.Between(bounds.y, bounds.bottom);
				endX = bounds.x - offset;
				endY = Phaser.Math.Between(bounds.y, bounds.bottom);
				break;
			case 2: // Top -> Bottom
				startX = Phaser.Math.Between(bounds.x, bounds.right);
				startY = bounds.y - offset;
				endX = Phaser.Math.Between(bounds.x, bounds.right);
				endY = bounds.bottom + offset;
				break;
			case 3: // Bottom -> Top
				startX = Phaser.Math.Between(bounds.x, bounds.right);
				startY = bounds.bottom + offset;
				endX = Phaser.Math.Between(bounds.x, bounds.right);
				endY = bounds.y - offset;
				break;
		}

		this.#sprite.setPosition(startX, startY);
		this.#movingTarget = { x: endX, y: endY };
		this.#scene.physics.moveTo(this.#sprite, endX, endY, this.#speed);
	}

	updateMovement() {
		let removeShip = false;
		if (this.#movingTarget) {
			const dist = Phaser.Math.Distance.Between(
				this.x, this.y,
				this.#movingTarget.x, this.#movingTarget.y
			);

			if (dist < 10) {
				this.#sprite.destroy();
				this.#movingTarget = null;
				removeShip = true;
			}
		}
		return removeShip;
	}
}