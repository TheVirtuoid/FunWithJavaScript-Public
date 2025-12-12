import Missile from "./MIssile.js";
import ElfMissile from "./ElfMIssile.js";
import GameEvent from "./GameEvent.js";

export default class Elfship {
	#sprite;
	#radius;
	#displayRadius;
	#scene;
	#movingTarget;
	#speed = 150;
	#missiles = new Set();
	#nextFireTime = 0;
	#missilePhysicsGroup;
	#name;

	static Preload(scene) {
		scene.load.image('elfship', '/img/elf-ship.png');
		scene.load.image('elf-missile', '/img/lightning.png');
	}

	static NAME = 'ElfShip';

	constructor(args = {}) {
		const { scene, x, y, missilePhysicsGroup } = args;
		this.#sprite = scene.physics.add.sprite(x, y, 'elfship');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.15);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.setImmovable(true);
		this.#displayRadius = this.#sprite.displayWidth / 2;
		this.#scene = scene;
		this.#movingTarget = null;
		this.#missilePhysicsGroup = missilePhysicsGroup;
		this.#sprite.name = Elfship.NAME;
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
			// const missile = this.#missiles.get(this.x, this.y, 'elf-missile');
			const angle = Phaser.Math.Angle.Between(this.x, this.y, krampus.x, krampus.y);
			const speed = 400;
			const missile = new ElfMissile(this.#scene, this.x, this.y, angle);
			this.#missilePhysicsGroup.add(missile);
			// const missile = this.#missiles.get(gunPos.x, gunPos.y, 'missile');
			// const angle = Phaser.Math.Angle.Between(this.x, this.y, krampus.x, krampus.y);
			missile.fire(krampus.x, krampus.y, angle, speed);
			this.#missiles.add(missile);
			// this.#scene.physics.velocityFromRotation(angle, speed, missile.velocity);
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
	}

	addCollisionDetection(args = {}) {
		/*const { asteroids, krampus, krampusMissiles } = args;
		this.#scene.physics.add.collider(
			this.#sprite,
			asteroids,
			this.#onHitAsteroid,
			null,
			this.#scene
		);
		this.#scene.physics.add.collider(
			this.#sprite,
			krampus,
			this.#onHitKrampus,
			null,
			this.#scene
		);
		this.#scene.physics.add.overlap(
			this.#sprite,
			krampusMissiles,
			this.#onHitKrampusMissile,
			null,
			this.#scene
		);
		this.#scene.physics.add.overlap(
			this.#missiles,
			krampus,
			this.#onMissileHitKrampus,
			null,
			this.#scene
		);
		this.#scene.physics.add.overlap(
			this.#missiles,
			asteroids,
			this.#onMissileHitAsteroid,
			null,
			this.#scene
		);*/
		/*elfMissileHitAsteroidCallback: this.#onMissileHitAsteroid.bind(this),
			elfMissileHitKrampusCallback: this.#onMissileHitElfShip.bind(this)*/
	}

	#onHitAsteroid(...data) {
		GameEvent.Emit(GameEvent.ELF_HIT_ASTEROID, ...data);
	}

	#onHitKrampus(...data) {
		GameEvent.Emit(GameEvent.ELF_HIT_KRAMPUS, ...data);
	}

	#onHitKrampusMissile(...data) {
		GameEvent.Emit(GameEvent.ELF_SHIP_HIT_KRAMPUS_MISSILE, ...data);
	}

	#onMissileHitKrampus(...data) {
		GameEvent.Emit(GameEvent.ELF_MISSILE_HIT_KRAMPUS, ...data);
	}

	#onMissileHitAsteroid(...data) {
		GameEvent.Emit(GameEvent.ELF_MISSILE_HIT_ASTEROID, ...data);
	}
}