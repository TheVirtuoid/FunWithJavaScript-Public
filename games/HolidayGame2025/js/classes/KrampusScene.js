import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import ElfShip from "./Elfship.js";
import Santa from "./Santa.js";
import Statistics from "./Statistics.js";
import Start from "./Start.js";
import GameEvent from "./GameEvent.js";
import Space from "./Space.js";
import GameController from "./GameController.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
	#gameController;
	#elfShip;
	#santaShip;
	#speed = 400;

	#leftTriggerDown = false;
	#rightTriggerDown = false;

	#asteroids = new Set();
	#asteroidGroup;

	#shipTimer = 15000;
	#lastShipTime = 0;

	#statistics;
	#start;
	#gameStarted = false;
	#space;

	constructor() {
		super({
			key: 'krampus',
		});
		this.#krampus = null;
		this.#gamepad = null;
		this.#gameController = null;
		this.#elfShip = null;
		this.#santaShip = null;
		GameEvent.Setup(this);
	}

	preload() {
		Krampus.Preload(this);
		Asteroid.Preload(this);
		ElfShip.Preload(this);
		Santa.Preload(this);
	}

	create() {
		this.#gameController = new GameController(this);
		// this.input.gamepad.enabled = true;
		this.#space = new Space(this);
		this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);

		this.add.text(10, 10, 'Krampus-oid', {
			fontFamily: '"Press Start 2P"',
			fontSize: '38px',
			fill: '#bb2222'
		});

		const text = this.add.text(10, 70, 'Help Krampus save Christmas from Santa and his elves!', {
			fontFamily: '"Press Start 2P"',
			fontSize: '14px',
			fixedWidth: 400,
			fill: '#aabbcc',
			wordWrap: { width: 400, useAdvancedWrap: true },
			align: 'center'
		});

		this.#statistics = new Statistics(this);
		this.#speed = 600; // pixels/sec²; tweak to taste
		// asteroids
		// --- Create asteroids with non-overlapping starting positions ---
		const numAsteroids = 4;
		for (let i = 0; i < numAsteroids; i++) {
			const asteroid = new Asteroid(this);

			const spawnPos = this.#findNonOverlappingPosition({
				asteroidRadius: 60,           // approximate; tweak if needed
				minDistanceFromKrampus: 120,  // how far from Krampus
				edgePadding: 40               // don't spawn right on the edges
			});

			asteroid.create({
				scale: Asteroid.SCALE_LARGE,
				x: spawnPos.x,
				y: spawnPos.y
			});

			this.#asteroids.add(asteroid);
		}

		// --- Make asteroids bounce off each other ---
		this.#asteroidGroup = this.physics.add.group({
			bounceX: 1,
			bounceY: 1,
			// collideWorldBounds: true
			colliderWorldBounds: false
		});
		this.#asteroids.forEach(asteroid => {
			if (asteroid.sprite) {
				this.#asteroidGroup.add(asteroid.sprite);
				// Make sure bounce is fully elastic
				asteroid.sprite.setBounce(1, 1);
				asteroid.sprite.body.setAllowGravity(false);
				asteroid.setAttributes();
				// console.log('after group add', asteroid.sprite.body.velocity);
			}
		});

		this.physics.add.collider(this.#asteroidGroup, this.#asteroidGroup);
		this.physics.add.collider(
			this.#krampus.sprite,
			this.#asteroidGroup,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		// this.#krampus.addAsteroidCollider(this.#asteroidGroup, this.#onMissileHitAsteroid.bind(this));
		this.#krampus.addAsteroidCollider(this.#asteroidGroup, GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID);
		this.#lastShipTime = 0;

		this.#start = new Start(this);
		this.#statistics.startBonusTimer();
	}

	update(time, delta) {
		if (time - this.#lastShipTime > this.#shipTimer) {
			this.#launchElfShip();
			this.#lastShipTime = time;
		}
		// this.#elfShip = this.#elfShip?.updateMovement() ? null : this.#elfShip;
		this.#elfShip = this.#elfShip?.update(time, this.#krampus) ? null : this.#elfShip;
		this.#santaShip = this.#santaShip?.updateMovement() ? null : this.#santaShip;
		this.physics.world.wrap(this.#asteroidGroup, 40);

		if (!this.#gameController.online || !this.#krampus) {
			this.#keepBoxSpeedConstant();
			return;
		}
		this.#krampus.processGunRotation(this.#gameController);
		const { thrustX, thrustY } = this.#gameController.getThrust();
		this.#krampus.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);

		if (this.#gameController.leftFireMissile) {
			this.#fireLeftMissile();
		}
		if (this.#gameController.rightFireMissile) {
			this.#fireRightMissile();
		}

		this.#krampus.updateGunPosition();
		this.#keepBoxSpeedConstant();

	}

	onEvent(eventName, ...data) {
		if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID) this.#onMissileHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_ASTEROID) this.#onKrampusHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_KRAMPUS) this.#onKrampusHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_KRAMPUS_MISSILE) this.#onMissileHitElfShip(...data);
		else if (eventName === GameEvent.ELF_MISSILE_HIT_KRAMPUS) this.#onElfMissileHitKrampus(...data);
		// console.log(eventName, data);
	}

	#fireLeftMissile() {
		this.#fireMissile();
	}

	#fireRightMissile() {
		this.#fireMissile();
	}

	#fireMissile() {
		this.#krampus.fireMissile();
	}
	#keepBoxSpeedConstant() {
		this.#asteroids.forEach((asteroid) => {
			// Keep the box moving at a (nearly) constant speed
			const sprite = asteroid.sprite;
			if (!sprite || !sprite.body) return;

			const targetSpeed = 100; // must match the value used in create()
			const body = sprite.body;
			const vx = body.velocity.x;
			const vy = body.velocity.y;
			const len = Math.hypot(vx, vy);

			if (len === 0) {
				return;
			}

			// Re-normalize velocity to targetSpeed
			const scale = targetSpeed / len;
			body.setVelocity(vx * scale, vy * scale);
		});
	}

	// Helper: find a random position that doesn't overlap Krampus or any existing asteroid
	#findNonOverlappingPosition(options) {
		const {
			asteroidRadius,
			minDistanceFromKrampus,
			edgePadding
		} = options;

		// const bounds = this.physics.world.bounds;
		const minX = this.#space.left + edgePadding;
		const maxX = this.#space.right - edgePadding;
		const minY = this.#space.top + edgePadding;
		const maxY = this.#space.bottom - edgePadding;

		const maxAttempts = 50;
		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			const x = Phaser.Math.Between(minX, maxX);
			const y = Phaser.Math.Between(minY, maxY);

			let valid = true;

			// 1) Not too close to Krampus
			const distToKrampus = Phaser.Math.Distance.Between(x, y, this.#krampus.x, this.#krampus.y);
			if (distToKrampus < this.#krampus.displayRadius + minDistanceFromKrampus) {
				valid = false;
			}

			// 2) Not overlapping any already-created asteroid
			if (valid) {
				for (const existing of this.#asteroids) {
					const sprite = existing.sprite;
					if (!sprite) continue;

					// For squares, we check X and Y overlap separately (AABB check)
					// We treat 'asteroidRadius' as the half-width of the new asteroid
					const existingHalfWidth = sprite.displayWidth / 2;
					const existingHalfHeight = sprite.displayHeight / 2;

					const dx = Math.abs(x - sprite.x);
					const dy = Math.abs(y - sprite.y);

					// Check overlap on both axes with a 10px buffer
					if (dx < asteroidRadius + existingHalfWidth + 10 &&
						dy < asteroidRadius + existingHalfHeight + 10) {
						valid = false;
						break;
					}
				}
			}

			if (valid) {
				return { x, y };
			}
		}

		// If we can't find a perfect spot, just fall back to center
		return {
			x: (minX + maxX) / 2,
			y: (minY + maxY) / 2
		};
	}

	#onKrampusHitAsteroid(krampusSprite, asteroidSprite) {
		// purposefully left empty
	}

	#launchElfShip() {
		// Create the ship initially off-screen so we can read its radius
		this.#elfShip = new ElfShip(this, -1000, -1000);
		this.#elfShip.addCollisionDetection({
			asteroids: this.#asteroidGroup,
			krampus: this.#krampus.sprite,
			krampusMissiles: this.#krampus.missiles,
		});
		this.#elfShip.launch();
	}

	#launchSanta() {
		// Create the ship initially off-screen so we can read its radius
		this.#santaShip = new Santa(this, -1000, -1000);
		this.physics.add.collider(
			this.#santaShip.sprite,
			this.#asteroidGroup,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		this.physics.add.collider(
			this.#santaShip.sprite,
			this.#krampus.sprite,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		this.#santaShip.launch();
	}

	#onMissileHitElfShip(elfSprite, missile) {
		if (this.#gameStarted) {
			missile.destroy();
			elfSprite.destroy();
			this.#elfShip = null;
		}
	}

	#onElfMissileHitKrampus(missile, krampusSprite) {
		if (this.#gameStarted) {
			//  missile.destroy();
		}
	}

	#onMissileHitAsteroid(missile, asteroidSprite) {
		if (this.#gameStarted) {
			missile.destroy();
			// Find the wrapper class instance for this sprite
			let hitAsteroid = null;
			for (const asteroid of this.#asteroids) {
				if (asteroid.sprite === asteroidSprite) {
					hitAsteroid = asteroid;
					break;
				}
			}
			if (!hitAsteroid) return;
			if (hitAsteroid.scale === Asteroid.SCALE_LARGE) {
				this.#spawnSplitAsteroids(hitAsteroid.sprite.x, hitAsteroid.sprite.y, Asteroid.SCALE_MEDIUM, 2);
			}
			if (hitAsteroid.scale === Asteroid.SCALE_MEDIUM) {
				this.#spawnSplitAsteroids(hitAsteroid.sprite.x, hitAsteroid.sprite.y, Asteroid.SCALE_SMALL, 2);
			}
			asteroidSprite.destroy();
			this.#asteroids.delete(hitAsteroid);
			asteroidSprite.destroy();
			this.#statistics.incrementScore(1);
			if (this.#asteroids.size === 0) {
				this.#statistics.stopBonusTimer();
			}
		}
	}

	#spawnSplitAsteroids(x, y, newScale, count) {
		const baseSpeed = 100; // The speed of large asteroids (from #keepBoxSpeedConstant)
		const newSpeed = baseSpeed * 1.5;

		for (let i = 0; i < count; i++) {
			const newAsteroid = new Asteroid(this);
			newAsteroid.create({
				scale: newScale,
				x: x,
				y: y
			});

			// Setup physics properties
			const sprite = newAsteroid.sprite;
			this.#asteroidGroup.add(sprite);
			sprite.setBounce(1, 1);
			sprite.body.setAllowGravity(false);
			newAsteroid.setAttributes(); // Sets rotation, etc.

			// Set random velocity
			const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
			this.physics.velocityFromRotation(angle, newSpeed, sprite.body.velocity);

			this.#asteroids.add(newAsteroid);
		}
	}

	#destroyAssets() {}

	#buildAssets() {
		this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);
	}
}