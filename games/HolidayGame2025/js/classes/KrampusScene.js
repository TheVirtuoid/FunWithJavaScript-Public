// import Statistics from "../Statistics.js";

import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import ElfShip from "./Elfship.js";
import Santa from "./Santa.js";
import Missile from "./MIssile.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
	#elfShip;
	#elfShipTarget = null;
	#santa;
	#santaTarget = null;
	#speed = 400;
	#missiles;

	#leftTriggerDown = false;
	#rightTriggerDown = false;

	#gun;
	#gunAngle;

	#asteroids = new Set();
	#asteroidGroup;

	constructor() {
		super({
			key: 'krampus',
		});
		this.#krampus = null;
		this.#gamepad = null;
		this.#elfShip = null;
		this.#santa = null;
	}

	preload() {
		Krampus.Preload(this);
		Asteroid.Preload(this);
		ElfShip.Preload(this);
		Santa.Preload(this);
		Missile.Preload(this);
	}

	create() {
		this.input.gamepad.enabled = true;

		// adjust physics position
		const { width: cameraWidth, height: cameraHeight } = this.cameras.main;
		const leftInset = 450; // tweak to taste
		this.physics.world.setBounds(leftInset, 10, cameraWidth - leftInset - 10, cameraHeight - 10);

		const { width, height } = this.cameras.main;
		const middleX = Math.floor(width / 2);
		const middleY = Math.floor(height / 2);

		this.#krampus = new Krampus(this, middleX, middleY);
		this.#launchElfShip();
		this.#launchSanta();
		// Initialize Missile Group
		this.#missiles = this.physics.add.group({
			// classType: Phaser.Physics.Arcade.Image,
			classType: Missile,
			maxSize: 30,
			runChildUpdate: true
		});

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

		this.#speed = 600; // pixels/sec²; tweak to taste

		// Gamepad setup
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		if (this.input.gamepad.total) {
			this.#gamepad = this.input.gamepad.gamepads[0];
		}

		// Krampus Gun
		this.#gun = this.add.graphics();
		this.#gun.fillStyle(0xffffff, 1); // color, alpha
		this.#gun.fillCircle(0, 0, 4);
		this.#gunAngle = (-Math.PI / 2) + ((12 * 2 * Math.PI) / 12);
		const gunPosition = this.#getGunPositionOnCircle();
		this.#gun.setPosition(gunPosition.x, gunPosition.y);


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
		this.physics.add.collider(
			this.#elfShip.sprite,
			this.#asteroidGroup,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		this.physics.add.collider(
			this.#elfShip.sprite,
			this.#krampus.sprite,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		this.physics.add.collider(
			this.#santa.sprite,
			this.#asteroidGroup,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		this.physics.add.collider(
			this.#santa.sprite,
			this.#krampus.sprite,
			this.#onKrampusHitAsteroid,
			null,
			this
		);
		// Missile vs Asteroid Collision
		this.physics.add.collider(
			this.#missiles,
			this.#asteroidGroup,
			this.#onMissileHitAsteroid,
			null,
			this
		);

	}

	update(time, delta) {
		if (this.#elfShip && this.#elfShipTarget) {
			const dist = Phaser.Math.Distance.Between(
				this.#elfShip.x, this.#elfShip.y,
				this.#elfShipTarget.x, this.#elfShipTarget.y
			);

			if (dist < 10) {
				this.#elfShip.sprite.destroy();
				this.#elfShip = null;
				this.#elfShipTarget = null;
			}
		}

		if (!this.#gamepad || !this.#krampus) {
			this.#keepBoxSpeedConstant();
			return;
		}

		// process gun rotataion
		const { x:gunRotation} = this.#gamepad.rightStick;
		if (gunRotation !== 0) {
			const direction = gunRotation > 0 ? 1 : -1;
			this.#gunAngle += direction * .03;
			const gunPosition = this.#getGunPositionOnCircle();
			this.#gun.setPosition(gunPosition.x, gunPosition.y);
		}

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

		this.#gun.setPosition(this.#krampus.x, this.#krampus.y - this.#krampus.displayRadius);
		const gunPosition = this.#getGunPositionOnCircle();
		this.#gun.setPosition(gunPosition.x, gunPosition.y);

		// asteroid
		this.#keepBoxSpeedConstant();
	}

	#fireLeftMissile() {
		this.#fireMissile();
	}

	#fireRightMissile() {
		this.#fireMissile();
	}

	#fireMissile() {
		const gunPos = this.#getGunPositionOnCircle();

		// Create missile at gun position
		const missile = this.#missiles.get(gunPos.x, gunPos.y, 'missile');
		// const missile = new Missile(this, gunPos.x, gunPos.y);

		if (missile) {
			// Use the fire method on our custom Missile class
			missile.fire(gunPos.x, gunPos.y, this.#gunAngle);
		}
	}

	#getGunPositionOnCircle() {
		return {
			x: this.#krampus.x + this.#krampus.displayRadius * Math.cos(this.#gunAngle),
			y: this.#krampus.y + this.#krampus.displayRadius * Math.sin(this.#gunAngle)
		};
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

		const bounds = this.physics.world.bounds;
		const minX = bounds.x + edgePadding;
		const maxX = bounds.right - edgePadding;
		const minY = bounds.y + edgePadding;
		const maxY = bounds.bottom - edgePadding;

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
		// Handle what should happen when Krampus hits an asteroid:
		// e.g., end game, reduce lives, play explosion animation, etc.

		// Example: stop movement and fade out Krampus
		/*krampusSprite.body.setAcceleration(0, 0);
		krampusSprite.body.setVelocity(0, 0);

		this.tweens.add({
			targets: krampusSprite,
			alpha: 0,
			duration: 250,
			onComplete: () => {
				// TODO: show Game Over screen / restart scene
				// this.scene.restart();
			}
		});*/
	}

	#launchElfShip() {
		// Create the ship initially off-screen so we can read its radius
		this.#elfShip = new ElfShip(this, -1000, -1000);
		const radius = this.#elfShip.displayRadius;

		// Use physics world bounds to define the playing area
		const bounds = this.physics.world.bounds;
		const offset = radius + 20; // Ensure it is fully off-screen relative to the bounds

		let startX, startY, endX, endY;

		// Randomly determine start side: 0=Left, 1=Right, 2=Top, 3=Bottom
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

		// Position the ship
		this.#elfShip.sprite.setPosition(startX, startY);

		// Set the target for cleanup
		this.#elfShipTarget = { x: endX, y: endY };

		// Move to target at constant rate
		const elfSpeed = 200;
		this.physics.moveTo(this.#elfShip.sprite, endX, endY, elfSpeed);
	}

	#launchSanta() {
		// Create the ship initially off-screen so we can read its radius
		this.#santa = new Santa(this, -1000, -1000);
		const radius = this.#santa.displayRadius;

		// Use physics world bounds to define the playing area
		const bounds = this.physics.world.bounds;
		const offset = radius + 20; // Ensure it is fully off-screen relative to the bounds

		let startX, startY, endX, endY;

		// Randomly determine start side: 0=Left, 1=Right, 2=Top, 3=Bottom
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

		// Position the ship
		this.#santa.sprite.setPosition(startX, startY);

		// Set the target for cleanup
		this.#santaTarget = { x: endX, y: endY };

		// Move to target at constant rate
		const santaSpeed = 300;
		this.physics.moveTo(this.#santa.sprite, endX, endY, santaSpeed);
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
}