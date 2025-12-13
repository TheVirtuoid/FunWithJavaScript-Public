import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import Elf from "./Elf.js";
import Santa from "./Santa.js";
import Sidebar from "./Sidebar.js";
import Start from "./Start.js";
import GameEvent from "./GameEvent.js";
import Space from "./Space.js";
import GameController from "./GameController.js";
// import { Scene } from "phaser";
import Phaser from "phaser";
import AsteroidGroup from "./AsteroidGroup.js";
import ElfMissile from "./ElfMIssile.js";
import SantaMissile from "./SantaMIssile.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
	#gameController;
	#elf;
	#santa;

	#asteroidGroup;
	#speed = 400;

	#asteroids = new Set();
	// #asteroidGroup;

	#elfTimer = 15000;
	#lastElfTime = 0;
	#santaTimer = 15000;
	#lastSantaTime = 0;

	#sidebar;
	#start;
	#gameStarted = false;
	#space;

	#currentTime;
	#currentDelta;

	#shipsPhysicsGroup;
	#asteroidsPhysicsGroup;
	#missilesPhysicsGroup;

	constructor() {
		super({
			key: 'krampus',
		});
		this.#krampus = null;
		this.#gamepad = null;
		this.#gameController = null;
		this.#elf = null;
		this.#santa = null;
		this.#sidebar = null;
		GameEvent.Setup(this);
	}

	preload() {
		Krampus.Preload(this);
		Asteroid.Preload(this);
		Elf.Preload(this);
		Santa.Preload(this);
	}

	create() {
		this.#gameController = new GameController(this);
		this.#space = new Space(this);
		this.#sidebar = new Sidebar(this);
		this.#start = new Start(this);
		this.#shipsPhysicsGroup = this.physics.add.group();
		this.#asteroidsPhysicsGroup = this.physics.add.group();
		this.#missilesPhysicsGroup = this.physics.add.group();
		this.#gameStarted = false;

		this.physics.add.collider(
			this.#shipsPhysicsGroup,
			this.#asteroidsPhysicsGroup,
			this.#handleShipHitAsteroid,
			null,
			this
		);

		this.physics.add.collider(
			this.#shipsPhysicsGroup,
			this.#shipsPhysicsGroup,
			this.#handleShipHitShip,
			null,
			this
		);

		this.physics.add.overlap(
			this.#shipsPhysicsGroup,
			this.#missilesPhysicsGroup,
			this.#handleMissileHitShip,
			null,
			this
		);

		this.physics.add.overlap(
			this.#asteroidsPhysicsGroup,
			this.#missilesPhysicsGroup,
			this.#handleMissileHitAsteroid,
			null,
			this
		);

		this.physics.add.collider(
			this.#asteroidsPhysicsGroup,
			this.#asteroidsPhysicsGroup,
			this.#handleAsteroidHitAsteroid,
			null,
			this
		);

		this.#gameStarted = false;
		GameEvent.Emit(GameEvent.LEVEL_STARTED);

		/*this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);
		this.#asteroidGroup = new AsteroidGroup({ scene: this, krampus: this.#krampus, space: this.#space });
		this.#shipsPhysicsGroup.add(this.#krampus.sprite);

		const asteroid = this.#asteroidGroup.addAsteroid(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE);
		this.#asteroidsPhysicsGroup.add(asteroid.sprite);
		asteroid.setPhysicsAttributes();*/

		/*this.#buildStaticAssets();
		this.#buildAssets();

		this.#speed = 600; // pixels/sec²; tweak to taste*/

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
		/*this.#lastElfTime = 0;

		this.#start = new Start(this);
		this.#gameStarted = false;*/
	}

	update(time, delta) {
		this.#currentTime = time;
		this.#currentDelta = delta;
		this.#launchShips(time);
		this.#updateShips(time);
		this.physics.world.wrap(this.#asteroidsPhysicsGroup, 40);
		this.physics.world.wrap(this.#krampus.sprite, 40);
		this.#krampus?.processGunRotation(this.#gameController);
		const { thrustX, thrustY } = this.#gameController.getThrust();
		// deadzone for stick
		const deadzone = 0.12;
		const ax = Math.abs(thrustX) < deadzone ? 0 : thrustX;
		const ay = Math.abs(thrustY) < deadzone ? 0 : thrustY;
		this.#krampus?.setAcceleration(ax * this.#speed, ay * this.#speed);
		this.#krampus?.updateGunPosition();
		/*if (!this.#gameStarted && this.#gameController.gameStart) {
			this.onEvent(GameEvent.GAME_STARTED);
		}
		this.#launchShips(time);
		this.#updateShips(time);
		this.physics.world.wrap(this.#asteroidGroup, 40);
		this.#krampus?.processGunRotation(this.#gameController);
		const { thrustX, thrustY } = this.#gameController.getThrust();
		this.#krampus?.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);
		if (this.#gameStarted) {
			if (this.#gameController.leftFireMissile) {
				this.#fireLeftMissile();
			}
			if (this.#gameController.rightFireMissile) {
				this.#fireRightMissile();
			}
		}
		this.#krampus?.updateGunPosition();*/
	}

	onEvent(eventName, ...data) {
		if (eventName === GameEvent.GAME_STARTED) this.#onGameStarted(...data);
		else if (eventName === GameEvent.LAUNCH_ELF_SHIP) this.#onLaunchElf(...data);
		else if (eventName === GameEvent.REMOVE_ELF_SHIP) this.#onRemoveElf(...data);
		else if (eventName === GameEvent.ELF_MISSILE_HIT_KRAMPUS) this.#onElfMissileHitKrampus(...data);
		else if (eventName === GameEvent.LAUNCH_SANTA_SHIP) this.#onLaunchSanta(...data);
		else if (eventName === GameEvent.REMOVE_SANTA_SHIP) this.#onRemoveSanta(...data);
		else if (eventName === GameEvent.SANTA_MISSILE_HIT_KRAMPUS) this.#onSantaMissileHitKrampus(...data);
		else if (eventName === GameEvent.KRAMPUS_HIT_ELF) this.#onKrampusHitElf(...data);
		else if (eventName === GameEvent.KRAMPUS_HIT_SANTA) this.#onKrampusHitSanta(...data);
		else if (eventName === GameEvent.LEVEL_STARTED) this.#onLevelStarted(...data);
		/*  else if (eventName === GameEvent.KRAMPUS_HIT_ASTEROID) this.#onKrampusHitAsteroid(...data);
		else if (eventName === GameEvent.KRAMPUS_HIT_SANTA) thie.#onKrampusHitSanta(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID) this.#onKrampusMissileHitAsteroid(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ELF) this.#onKrampusMissileHitElf(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_SANTA) this.#onKrampusMissileHitSanta(...data);

		else if (eventName === GameEvent.ELF_MISSILE_HIT_ASTEROID) this.#onElfMissileHitAsteroid(...data);

		else if (eventName === GameEvent.SANTA_MISSILE_HIT_ASTEROID) this.#onSantaMissileHitAsteroid(...data);
		else if (eventName === GameEvent.SANTA_MISSILE_HIT_KRAMPUS) this.#onSantaMissileHitKrampus(...data);



		else if (eventName === GameEvent.GAME_STARTED) this.#onGameStarted(...data);
		else if (eventName === GameEvent.LEVEL_STARTED) this.#onLevelStarted(...data);
		else if (eventName === GameEvent.LEVEL_COMPLETE) this.#onLevelComplete(...data);
		else if (eventName === GameEvent.LEVEL_NEXT) this.#onLevelNext(...data);*/
	}

	/** -------------------------------------------------------- METHODS -------------------------------------- */

	#handleShipHitAsteroid(...data) {
		console.log('a ship has hit an asteroid');
		console.log(data);
	}

	#handleMissileHitShip(ship, missile) {
		console.log('missile hit ship');
		if (missile instanceof ElfMissile && ship.name === Krampus.NAME) {
			GameEvent.Emit(GameEvent.ELF_MISSILE_HIT_KRAMPUS, ship, missile);
		}
		if (missile instanceof SantaMissile && ship.name === Krampus.NAME) {
			GameEvent.Emit(GameEvent.SANTA_MISSILE_HIT_KRAMPUS, ship, missile);
		}
	}

	#handleAsteroidHitAsteroid(...data) {
		console.log('an asteroid has hit an asteroid');
		console.log(data);
	}

	#handleShipHitShip(ship1, ship2) {
		console.log('ship hit ship');
		if ((ship1.name === Krampus.NAME || ship2.name === Krampus.NAME) && (ship1.name === Elf.NAME || ship2.name === Elf.NAME)) {
			GameEvent.Emit(GameEvent.KRAMPUS_HIT_ELF, ship1, ship2);
		}
		if ((ship1.name === Krampus.NAME || ship2.name === Santa.NAME) && (ship1.name === Santa.NAME || ship2.name === Elf.NAME)) {
			GameEvent.Emit(GameEvent.KRAMPUS_HIT_SANTA, ship1, ship2);
		}
	}

	#handleMissileHitAsteroid(asteroid, missile) {
		console.log('missile hit asteroid');
		console.log(asteroid, missile);
	}

	/*#fireLeftMissile() {
		this.#fireMissile();
	}*/

	/*#fireRightMissile() {
		this.#fireMissile();
	}*/

	/*#fireMissile() {
		this.#krampus.fireMissile();
	}*/

	// Helper: find a random position that doesn't overlap Krampus or any existing asteroid
	/*#findNonOverlappingPosition(options) {
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
	}*/

	/*#onKrampusHitAsteroid(krampusSprite, asteroidSprite) {
		// purposefully left empty
	}*/

	#launchShips(time) {
		/*if (time - this.#lastElfTime > this.#elfTimer) {
			GameEvent.Emit(GameEvent.LAUNCH_ELF_SHIP);
		}*/
		/*if (time - this.#lastSantaTime > this.#santaTimer) {
			GameEvent.Emit(GameEvent.LAUNCH_SANTA_SHIP);
		}*/
	}

	#launchElf() {
		// Create the ship initially off-screen so we can read its radius
		this.#elf = new Elf({ scene: this, x: -1000, y: -1000, missilePhysicsGroup: this.#missilesPhysicsGroup });
		this.#shipsPhysicsGroup.add(this.#elf.sprite);
		this.#elf.launch();
	}

	#launchSanta() {
		this.#santa = new Santa({ scene: this, x: -1000, y: -1000, missilePhysicsGroup: this.#missilesPhysicsGroup });
		this.#shipsPhysicsGroup.add(this.#santa.sprite);
		this.#santa.launch();
	}

	#updateShips(time) {
		const elfRemoveShip = this.#elf?.update(time, this.#krampus);
		if (elfRemoveShip) {
			GameEvent.Emit(GameEvent.REMOVE_ELF_SHIP, time);
		}
		const santaRemoveShip = this.#santa?.update(time, this.#krampus);
		if (santaRemoveShip) {
			GameEvent.Emit(GameEvent.REMOVE_SANTA_SHIP, time);
		}
	}
	/*#launchSanta() {
		// Create the ship initially off-screen so we can read its radius
		this.#santa = new Santa(this, -1000, -1000);
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
		this.#santa.launch();
	}*/

	/*#onLevelComplete(data) {
		this.#sidebar.stopBonusTimer();
		this.#elf?.removeShip();
		setTimeout(() => {
			GameEvent.Emit(GameEvent.LEVEL_NEXT);
		}, 5000)
	}*/

	/*#onMissileHitElf(elfSprite, missile) {
		if (this.#gameStarted) {
			missile.destroy();
			GameEvent.Emit(GameEvent.REMOVE_ELF_SHIP, this.#currentTime);
		}
	}*/

	/*#onElfOrSantaMissileHitKrampus(missile, krampusSprite) {
		if (this.#gameStarted) {
			//  missile.destroy();
		}
	}*/

	/*#onElfOrSantaMissileHitAsteroid(missile, asteroidSprite) {
		if (this.#gameStarted) {
			this.#missileDestroysAsteroid(missile, asteroidSprite);
		}
	}*/

	/*#onMissileHitAsteroid(missile, asteroidSprite) {
		if (this.#gameStarted) {
			this.#sidebar.incrementScore(1);
			this.#missileDestroysAsteroid(missile, asteroidSprite);
		}
	}*/

	/*#onGameStarted() {
		this.scene.stop('credits');
		this.#gameStarted = true;
		this.#sidebar.reset();
		GameEvent.Emit(GameEvent.LEVEL_NEXT);
	}*/



	/*#onRemoveElf(time) {
		this.#elf.removeShip();
		this.#elf = null;
		this.#lastElfTime = time;
	}*/

	/*#onLevelNext() {
		this.#sidebar.incrementLevel(1);
		this.#sidebar.hideScore();
		this.#sidebar.hideBonusTimer();
		// make krampus invisible
		this.#krampus.setInvisible();
		// remove the asteroids to asteroid collision group
		this.#asteroidGroup.clear(true, true);
		this.#asteroids.clear();
		// remove the krampus to asteroids collision group
		this.#krampus.missiles.clear(true, true);
		// game over invisible
		this.#sidebar.hideGameOver();
		// start the countdown
		this.#sidebar.startCountdown();
	}*/

	/*#onLevelStarted() {
		//krampus visible!
		this.#krampus.setPosition(this.#space.midPoint.x, this.#space.midPoint.y);
		this.#krampus.setVisible();
		// asteroids visible!
		// ramdomize 4 more new asteroids
		this.#spawnSplitAsteroids(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE, 4);
		// make the asteroids invisible
		this.#asteroids.forEach(asteroid => asteroid.sprite.setVisible(true));
		// show stats
		this.#sidebar.showScore();
		// start bonus timer
		this.#sidebar.startBonusTimer();
	}*/

	/*#missileDestroysAsteroid(missile, asteroidSprite) {
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
		if (this.#asteroids.size === 0) {
			GameEvent.Emit(GameEvent.LEVEL_COMPLETE);
		}
	}*/

	/*#spawnSplitAsteroids(x, y, newScale, count) {
		const baseSpeed = 100; // The speed of large asteroids (from #keepBoxSpeedConstant)
		const newSpeed = baseSpeed * 1.5;
		const randomize = x === Number.POSITIVE_INFINITY || y === Number.POSITIVE_INFINITY;

		for (let i = 0; i < count; i++) {
			const newAsteroid = new Asteroid(this);
			if (randomize) {
				const spawnPos = this.#findNonOverlappingPosition({
					asteroidRadius: 60,           // approximate; tweak if needed
					minDistanceFromKrampus: 120,  // how far from Krampus
					edgePadding: 40               // don't spawn right on the edges
				});
				x = spawnPos.x;
				y = spawnPos.y;
			}
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
	}*/

	/*#destroyAssets() {
		// this.#krampus.destroy();
		// this.#krampus = null;
		// this.#asteroids = null;
		// this.#sidebar = null;
	}*/

	/*#buildAssets() {
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
	}*/

	/*#buildStaticAssets() {
		this.#sidebar = new Sidebar(this);
	}*/

	/* ---------------------------------------------- EVENT HANDLERS ------------------------------------------------ */
	#onElfMissileHitKrampus(ship, missile) {
		missile.destroy();
	}

	#onSantaMissileHitKrampus(ship, missile) {
		missile.destroy();
	}

	#onGameStarted(data) {}

	#onKrampusHitElf(ship1, ship2) {
		// they bounce off each other, so no action is taken.
	}

	#onKrampusHitSanta(ship1, ship2) {
		// they bounce off each other, so no action is taken.
	}

	#onLaunchElf() {
		this.#launchElf();
		this.#lastElfTime = Number.POSITIVE_INFINITY;
	}

	#onLaunchSanta() {
		this.#launchSanta();
		this.#lastSantaTime = Number.POSITIVE_INFINITY;
	}

	#onLevelStarted() {
		this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);
		this.#asteroidGroup = new AsteroidGroup({ scene: this, krampus: this.#krampus, space: this.#space });
		this.#shipsPhysicsGroup.add(this.#krampus.sprite);
		this.#krampus.setPhysicsAttributes();

		/*for (let i = 0; i < 4; i++) {
			const asteroid = this.#asteroidGroup.addAsteroid(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE);
			this.#asteroidsPhysicsGroup.add(asteroid.sprite);
			asteroid.setPhysicsAttributes();
		}*/




		/*this.#krampus = new Krampus(this, this.#space.midPoint.x, this.#space.midPoint.y);
		// this.#asteroidGroup = new AsteroidGroup({ scene: this, krampus: this.#krampus, space: this.#space });
		this.#shipsPhysicsGroup.add(this.#krampus.sprite);
		// this.#krampus.setPosition(this.#space.midPoint.x, this.#space.midPoint.y);
		// this.#krampus.setVisible();
		// ramdomize 4 more new asteroids
		// this.#spawnSplitAsteroids(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE, 4);
		this.#addAsteroids(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE, 4);
		// make the asteroids invisible
		this.#asteroids.forEach(asteroid => asteroid.sprite.setVisible(true));
		// show stats
		this.#sidebar.showScore();
		// start bonus timer
		this.#sidebar.startBonusTimer();*/
	}

	#onRemoveElf(time) {
		this.#elf.removeShip();
		this.#elf = null;
		this.#lastElfTime = time;
	}

	#onRemoveSanta(time) {
		this.#santa.removeShip();
		this.#santa = null;
		this.#lastSantaTime = time;
	}
}