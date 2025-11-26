import Missile from "./MIssile.js";
import ElfMissile from "./ElfMIssile.js";

export default class Elfship {
	#sprite;
	#radius;
	#displayRadius;
	#scene;
	#movingTarget;
	#speed = 150;
	#missiles;
	#nextFireTime = 0;

	static Preload(scene) {
		scene.load.image('elfship', '/img/elf-ship.png');
		scene.load.image('elf-missile', '/img/lightning.png');
	}

	constructor(scene, x, y) {
		this.#sprite = scene.physics.add.sprite(x, y, 'elfship');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.15);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.setImmovable(true);
		this.#displayRadius = this.#sprite.displayWidth / 2;
		this.#scene = scene;
		this.#movingTarget = null;
		this.#missiles = this.#scene.physics.add.group({
			classType: ElfMissile,
			maxSize: 50,
			runChildUpdate: true
		});
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
	get missiles() {
		return this.#missiles;
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
			const missile = this.#missiles.get(this.x, this.y, 'elf-missile');
			// const missile = this.#missiles.get(gunPos.x, gunPos.y, 'missile');
			if (missile) {
				missile.setScale(0.05);
				const speed = 400;
				const angle = Phaser.Math.Angle.Between(this.x, this.y, krampus.x, krampus.y);
				this.#scene.physics.velocityFromRotation(angle, speed, missile.body.velocity);
				missile.setRotation(angle);
				this.#nextFireTime = time + 500;
			}
		}
	}

	update(time, krampus) {
		// 1. Handle firing
		this.fireMissile(time, krampus);

		// 2. Cleanup missiles that are off-screen
		const bounds = this.#scene.physics.world.bounds;
		this.#missiles.children.iterate((missile) => {
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

	addCollisionDetection(args = {}) {
		const { asteroids, krampus, krampusMissiles, hitKrampusCallback, hitAsteroidCallback, hitKrampusMissileCallback, elfMissileHitKrampusCallback } = args;
		this.#scene.physics.add.collider(
			this.#sprite,
			asteroids,
			hitAsteroidCallback,
			null,
			this.#scene
		);
		this.#scene.physics.add.collider(
			this.#sprite,
			krampus,
			hitKrampusCallback,
			null,
			this.#scene
		);
		this.#scene.physics.add.overlap(
			this.#sprite,
			krampusMissiles,
			hitKrampusMissileCallback,
			null,
			this.#scene
		);
		this.#scene.physics.add.overlap(
			this.#missiles,
			krampus,
			elfMissileHitKrampusCallback,
			null,
			this.#scene
		);
		/*elfMissileHitAsteroidCallback: this.#onMissileHitAsteroid.bind(this),
			elfMissileHitKrampusCallback: this.#onMissileHitElfShip.bind(this)*/

	}
}