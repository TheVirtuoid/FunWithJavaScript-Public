import Missile from "./MIssile.js";
import ElfMissile from "./ElfMIssile.js";
import GameEvent from "./GameEvent.js";

export default class Ship {
	#sprite;
	#radius;
	#displayRadius;
	#scene;
	#movingTarget;
	#speed = 150;
	#missiles = new Set();
	#nextFireTime = 0;
	#missilePhysicsGroup;
	#missleConstructor;

	constructor(args = {}) {
		const { scene, x, y, missilePhysicsGroup, spriteName, shipName, speed, missileConstructor } = args;
		this.#sprite = scene.physics.add.sprite(x, y, spriteName);
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.15);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.setImmovable(true);
		this.#displayRadius = this.#sprite.displayWidth / 2;
		this.#scene = scene;
		this.#movingTarget = null;
		this.#missilePhysicsGroup = missilePhysicsGroup;
		this.#sprite.name = shipName;
		this.#speed = speed;
		this.#missleConstructor = missileConstructor;
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
	get name() {
		return this.#sprite.name;
	}

	launch() {
		const radius = this.displayRadius;
		const bounds = this.#scene.physics.world.bounds;
		const offset = radius + 20;
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

	fireMissile(time, krampus) {
		if (time > this.#nextFireTime) {
			const angle = Phaser.Math.Angle.Between(this.x, this.y, krampus.x, krampus.y);
			const missile = new this.#missleConstructor({ scene: this.#scene, x: this.x, y: this.y, angle });
			this.#missilePhysicsGroup.add(missile);
			missile.fire({ x: krampus.x, y: krampus.y, angle });
			this.#missiles.add(missile);
			this.#nextFireTime = time + 500;
		}
	}

	update(time, krampus) {
		// 1. Handle firing
		this.fireMissile(time, krampus);

		// 2. Cleanup missiles that are off-screen
		const bounds = this.#scene.physics.world.bounds;
		this.#missiles.forEach((missile) => {
			if (missile && !bounds.contains(missile.x, missile.y)) {
				missile.destroy();
			}
		});

		// 3. Existing movement logic
		return this.updateMovement();
	}

	updateMovement() {
		let removeShip = false;
		if (this.#movingTarget) {
			this.#scene.physics.moveTo(
				this.#sprite,
				this.#movingTarget.x,
				this.#movingTarget.y,
				this.#speed
			);
			const dist = Phaser.Math.Distance.Between(
				this.x, this.y,
				this.#movingTarget.x, this.#movingTarget.y
			);

			if (dist < 10) {
				removeShip = true;
			}
		}
		return removeShip;
	}

	removeShip() {
		this.#sprite.destroy();
		this.#missiles.forEach((missile) => missile.destroy());
		this.#movingTarget = null;
		this.#nextFireTime = Number.MAX_SAFE_INTEGER;
	}
}