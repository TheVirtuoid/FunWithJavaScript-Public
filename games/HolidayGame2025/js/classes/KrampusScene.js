import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import ElfShip from "./Elfship.js";
import Santa from "./Santa.js";
import Sidebar from "./Sidebar.js";
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

	#asteroids = new Set();
	#asteroidGroup;

	#elfShipTimer = 15000;
	#lastElfShipTime = 0;

	#sidebar;
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
		this.#sidebar = null;
		GameEvent.Setup(this);
	}

	preload() {
		Krampus.Preload(this);
		Asteroid.Preload(this);
		ElfShip.Preload(this);
		Santa.Preload(this);
	}

	create() {
		this.#buildStaticAssets();
		this.#buildAssets();

		this.#speed = 600; // pixels/sec²; tweak to taste

		/*this.physics.add.collider(this.#asteroidGroup, this.#asteroidGroup);
		this.physics.add.collider(
			this.#krampus.sprite,
			this.#asteroidGroup,
			this.#onKrampusHitAsteroid,
			null,
			this
		);*/
		// this.#krampus.addAsteroidCollider(this.#asteroidGroup, this.#onMissileHitAsteroid.bind(this));
		// this.#krampus.addAsteroidCollider(this.#asteroidGroup, GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID);
		this.#lastElfShipTime = 0;

		this.#start = new Start(this);
		this.#gameStarted = false;
		// this.#sidebar.startBonusTimer();
	}

	update(time, delta) {
		if (!this.#gameStarted && this.#gameController.gameStart) {
			this.onEvent(GameEvent.GAME_STARTED);
		}
		// this.#launchShips(time);
		this.physics.world.wrap(this.#asteroidGroup, 40);
		this.#krampus?.processGunRotation(this.#gameController);
		const { thrustX, thrustY } = this.#gameController.getThrust();
		this.#krampus?.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);
		if (this.#gameController.leftFireMissile) {
			this.#fireLeftMissile();
		}
		if (this.#gameController.rightFireMissile) {
			this.#fireRightMissile();
		}
		this.#krampus?.updateGunPosition();
	}

	onEvent(eventName, ...data) {
		if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID) this.#onMissileHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_ASTEROID) this.#onKrampusHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_KRAMPUS) this.#onKrampusHitAsteroid(...data);
		else if (eventName === GameEvent.ELF_SHIP_HIT_KRAMPUS_MISSILE) this.#onMissileHitElfShip(...data);
		else if (eventName === GameEvent.ELF_MISSILE_HIT_KRAMPUS) this.#onElfMissileHitKrampus(...data);
		else if (eventName === GameEvent.GAME_STARTED) this.#onGameStarted(...data);
		else if (eventName === GameEvent.LEVEL_STARTED) this.#onLevelStarted(...data);
		else if (eventName === GameEvent.LEVEL_COMPLETE) this.#onLevelComplete(...data);
		else if (eventName === GameEvent.LEVEL_NEXT) this.#onLevelNext(...data);
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

	#launchShips(time) {
		if (time - this.#lastElfShipTime > this.#elfShipTimer) {
			this.#launchElfShip();
			this.#lastElfShipTime = time;
		}
		this.#elfShip = this.#elfShip?.update(time, this.#krampus) ? null : this.#elfShip;
		// this.#santaShip = this.#santaShip?.updateMovement() ? null : this.#santaShip;
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

	#onLevelComplete(data) {
		this.#sidebar.stopBonusTimer();
		setTimeout(() => {
			GameEvent.Emit(GameEvent.LEVEL_NEXT);
		}, 5000)
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
			this.#sidebar.incrementScore(1);
			if (this.#asteroids.size === 0) {
				GameEvent.Emit(GameEvent.LEVEL_COMPLETE);
			}
		}
	}

	#onGameStarted() {
		this.scene.stop('credits');
		this.#gameStarted = true;
		this.#sidebar.reset();
		GameEvent.Emit(GameEvent.LEVEL_NEXT);
		/*// make krampus invisible
		this.#krampus.setInvisible();
		// reset krampus to the middle of the screen
		this.#krampus.sprite.setPosition(this.#space.midPoint.x, this.#space.midPoint.y);
		// remove the asteroids to asteroid collision group
		this.#asteroidGroup.clear(true, true);
		this.#asteroids.clear();
		// remove the krampus to asteroids collision group
		this.#krampus.missiles.clear(true, true);
		// ramdomize 4 more new asteroids
		this.#spawnSplitAsteroids(this.#space.midPoint.x, this.#space.midPoint.y, Asteroid.SCALE_LARGE, 4);
		// make the asteroids invisible
		this.#asteroids.forEach(asteroid => asteroid.sprite.setVisible(false));
		// game over invisible
		this.#sidebar.hideGameOver();
		// start the countdown
		this.#sidebar.startCountdown();*/
	}

	#onLevelNext() {
		this.#sidebar.incrementLevel(1);
		this.#sidebar.hideScore();
		this.#sidebar.hideBonusTimer();
		// make krampus invisible
		this.#krampus.setInvisible();
		// reset krampus to the middle of the screen
		this.#krampus.sprite.setPosition(this.#space.midPoint.x, this.#space.midPoint.y);
		// remove the asteroids to asteroid collision group
		this.#asteroidGroup.clear(true, true);
		this.#asteroids.clear();
		// remove the krampus to asteroids collision group
		this.#krampus.missiles.clear(true, true);
		// ramdomize 4 more new asteroids
		this.#spawnSplitAsteroids(this.#space.midPoint.x, this.#space.midPoint.y, Asteroid.SCALE_LARGE, 4);
		// make the asteroids invisible
		this.#asteroids.forEach(asteroid => asteroid.sprite.setVisible(false));
		// game over invisible
		this.#sidebar.hideGameOver();
		// start the countdown
		this.#sidebar.startCountdown();
	}

	#onLevelStarted() {
		//krampus visible!
		this.#krampus.setVisible();
		// asteroids visible!
		this.#asteroids.forEach(asteroid => asteroid.sprite.setVisible(true));
		// show stats
		this.#sidebar.showScore();
		// start bonus timer
		this.#sidebar.startBonusTimer();
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

	#destroyAssets() {
		// this.#krampus.destroy();
		// this.#krampus = null;
		// this.#asteroids = null;
		// this.#sidebar = null;
	}

	#buildAssets() {
		this.#gameController = new GameController(this);
		this.#space = new Space(this);
		this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);
		// this.#sidebar = new Sidebar(this);
		this.#asteroidGroup?.destroy(true);
		this.#asteroids.clear();

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
		this.#asteroidGroup = this.physics.add.group({
			bounceX: 1,
			bounceY: 1,
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
		this.#krampus.addAsteroidCollider(this.#asteroidGroup, GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID);
	}

	#buildStaticAssets() {
		this.#sidebar = new Sidebar(this);
/*		this.add.text(10, 10, 'Krampus-oid', {
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
		});*/
	}
}