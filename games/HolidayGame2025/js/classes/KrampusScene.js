import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import ElfShip from "./Elfship.js";
import Santa from "./Santa.js";
import Statistics from "./Statistics.js";
import Start from "./Start.js";
import GameEvent from "./GameEvent.js";
import Space from "./Space.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
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
		this.input.gamepad.enabled = true;
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
		// Gamepad setup
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		if (this.input.gamepad.total) {
			this.#gamepad = this.input.gamepad.gamepads[0];
		}

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
			collideWorldBounds: true
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

		if (!this.#gamepad || !this.#krampus) {
			this.#keepBoxSpeedConstant();
			return;
		}

		this.#krampus.processGunRotation(this.#gamepad);

		// Read gamepad axes (left stick)
		const axisH = this.#gamepad.axes.length > 0 ? this.#gamepad.axes[0].getValue() : 0; // X axis
		const axisV = this.#gamepad.axes.length > 1 ? this.#gamepad.axes[1].getValue() : 0; // Y axis

		// Deadzone to avoid drift
		const deadZone = 0.2;
		let thrustX = Math.abs(axisH) > deadZone ? axisH : 0;
		let thrustY = Math.abs(axisV) > deadZone ? axisV : 0;

		// D-pad fallback (some controllers use buttons instead of axes for dpad)
		const dPadLeft = this.#gamepad.left || this.#gamepad.buttons[14]?.pressed;
		const dPadRight = this.#gamepad.right || this.#gamepad.buttons[15]?.pressed;
		const dPadUp = this.#gamepad.up || this.#gamepad.buttons[12]?.pressed;
		const dPadDown = this.#gamepad.down || this.#gamepad.buttons[13]?.pressed;

		if (dPadLeft)  thrustX = -1;
		if (dPadRight) thrustX =  1;
		if (dPadUp)    thrustY = -1;
		if (dPadDown)  thrustY =  1;

		// If there is any thrust, normalize so diagonals aren't faster
		if (thrustX !== 0 || thrustY !== 0) {
			const len = Math.hypot(thrustX, thrustY);
			thrustX /= len;
			thrustY /= len;

			// Apply thrust as acceleration
			this.#krampus.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);
		} else {
			// No thrust — coast with current velocity (drag will slow it down)
			this.#krampus.setAcceleration(0, 0);
		}

		// Buttons 6 & 7 are LT/RT on most Xbox-style controllers.
		const leftButton = this.#gamepad.buttons[6];
		const rightButton = this.#gamepad.buttons[7];

		const leftDown = leftButton && leftButton.pressed;
		const rightDown = rightButton && rightButton.pressed;

		// Fire once on press (rising edge)
		if (leftDown && !this.#leftTriggerDown) {
			this.#fireLeftMissile();
		}
		if (rightDown && !this.#rightTriggerDown) {
			this.#fireRightMissile();
		}

		// Remember state for next frame
		this.#leftTriggerDown = leftDown;
		this.#rightTriggerDown = rightDown;

		this.#krampus.updateGunPosition();
		// asteroid
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

					const existingRadius = Math.max(sprite.displayWidth, sprite.displayHeight) / 2;
					const dist = Phaser.Math.Distance.Between(x, y, sprite.x, sprite.y);

					if (dist < asteroidRadius + existingRadius + 10) { // +10 = small gap
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
	tester = false;
	#onMissileHitElfShip(elfSprite, missile) {
		if (!this.tester) {
			console.log('****** KA-BOOM ************');
			console.log(missile);
			console.log(elfSprite);
			this.tester = true;
		}
		missile.destroy();
		elfSprite.destroy();
		this.#elfShip = null;
	}
	test = false;
	#onElfMissileHitKrampus(missile, krampusSprite) {
		//  missile.destroy();
		if (!this.test) {
			console.log('****** BOOM ************');
			console.log(missile);
			console.log(krampusSprite);
			this.test = true;
		}

	}

	#onMissileHitAsteroid(missile, asteroidSprite) {
		// Destroy the missile
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
		// Check if it's a large asteroid
		if (hitAsteroid.scale === Asteroid.SCALE_LARGE) {
			this.#spawnSplitAsteroids(hitAsteroid.sprite.x, hitAsteroid.sprite.y, Asteroid.SCALE_MEDIUM, 2);
		}
		if (hitAsteroid.scale === Asteroid.SCALE_MEDIUM) {
			this.#spawnSplitAsteroids(hitAsteroid.sprite.x, hitAsteroid.sprite.y, Asteroid.SCALE_SMALL, 2);
		}

		// Handle asteroid destruction or splitting logic here
		// For now, let's just destroy the asteroid sprite
		asteroidSprite.destroy();

		// Cleanup original asteroid
		this.#asteroids.delete(hitAsteroid);
		asteroidSprite.destroy();
		this.#statistics.incrementScore(1);
		if (this.#asteroids.size === 0) {
			this.#statistics.stopBonusTimer();
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
		this.#krampus = new Krampus(this, middleX, middleY);
	}
}