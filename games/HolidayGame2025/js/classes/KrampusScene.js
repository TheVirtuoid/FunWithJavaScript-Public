import Asteroid from "./Asteroid.js";
import Krampus from "./Krampus.js";
import Elf from "./Elf.js";
import Santa from "./Santa.js";
import Sidebar from "./Sidebar.js";
import Start from "./Start.js";
import GameEvent from "./GameEvent.js";
import Space from "./Space.js";
import GameController from "./GameController.js";
import Phaser from "phaser";
import AsteroidGroup from "./AsteroidGroup.js";
import ElfMissile from "./ElfMIssile.js";
import SantaMissile from "./SantaMIssile.js";
import KrampusMissile from "./KrampusMIssile.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
	#gameController;
	#elf;
	#santa;

	#kaBoomSprite;

	#asteroidGroup;
	#speed = 400;

	#asteroids = new Set();

	#shipTimer = 15000;
	#lastShipTime = 0;

	#sidebar;
	#start;
	#gameStarted = false;
	#space;

	#currentTime;
	#currentDelta;

	#shipsPhysicsGroup;
	#asteroidsPhysicsGroup;
	#missilesPhysicsGroup;

	#inCountdown;

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
		this.#inCountdown = false;
		GameEvent.Setup(this);
	}

	preload() {
		Krampus.Preload(this);
		Asteroid.Preload(this);
		Elf.Preload(this);
		Santa.Preload(this);
		this.load.image('ka-boom', '/img/blast.png');
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
	}

	update(time, delta) {
		this.#currentTime = time;
		this.#currentDelta = delta;
		if (!this.#gameStarted && this.#gameController.gameStart) {
			this.onEvent(GameEvent.GAME_STARTED);
		}
		this.#launchShips(time);
		this.#updateShips(time);
		this.physics.world.wrap(this.#asteroidsPhysicsGroup, 40);
		this.physics.world.wrap(this.#krampus.sprite, 40);
		this.#krampus?.processGunRotation(this.#gameController);
		const { thrustX, thrustY } = this.#gameController.getThrust();
		this.#krampus?.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);
		this.#krampus?.updateGunPosition();
		if (this.#gameStarted && !this.#inCountdown) {
			if (this.#gameController.leftFireMissile) {
				this.#krampus?.fireMissile();
			}
			if (this.#gameController.rightFireMissile) {
				this.#krampus?.fireMissile();
			}
		}
	}

	onEvent(eventName, ...data) {
		if (eventName === GameEvent.GAME_STARTED) this.#onGameStarted(...data);
		else if (eventName === GameEvent.GAME_OVER) this.#onGameOver(...data);
		else if (eventName === GameEvent.COUNTDOWN_STARTED) this.#onCountdownStarted(...data);
		else if (eventName === GameEvent.COUNTDOWN_COMPLETE) this.#onCountdownComplete(...data);
		else if (eventName === GameEvent.LAUNCH_ELF_SHIP) this.#onLaunchElf(...data);
		else if (eventName === GameEvent.REMOVE_ELF_SHIP) this.#onRemoveElf(...data);
		else if (eventName === GameEvent.ELF_MISSILE_HIT_KRAMPUS) this.#onElfMissileHitKrampus(...data);
		else if (eventName === GameEvent.LAUNCH_SANTA_SHIP) this.#onLaunchSanta(...data);
		else if (eventName === GameEvent.REMOVE_SANTA_SHIP) this.#onRemoveSanta(...data);
		else if (eventName === GameEvent.SANTA_MISSILE_HIT_KRAMPUS) this.#onSantaMissileHitKrampus(...data);
		else if (eventName === GameEvent.KRAMPUS_HIT_ELF) this.#onKrampusHitElf(...data);
		else if (eventName === GameEvent.KRAMPUS_HIT_SANTA) this.#onKrampusHitSanta(...data);
		else if (eventName === GameEvent.LEVEL_STARTED) this.#onLevelStarted(...data);
		else if (eventName === GameEvent.LEVEL_NEXT) this.#onLevelNext(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ELF) this.#onKrampusMissileHitElf(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_SANTA) this.#onKrampusMissileHitSanta(...data);
		else if (eventName === GameEvent.ASTEROID_HIT_ASTEROID) this.#onAsteroidHitAsteroid(...data);
		else if (eventName === GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID) this.#onKrampusMissileHitAsteroid(...data);
		else if (eventName === GameEvent.LEVEL_COMPLETE) this.#onLevelComplete(...data);
		else if (eventName === GameEvent.ELF_MISSILE_HIT_ASTEROID) this.#onElfMissileHitAsteroid(...data);
		else if (eventName === GameEvent.GAME_RESET) this.#onGameReset(...data);
	}

	/** -------------------------------------------------------- METHODS -------------------------------------- */

	#handleShipHitAsteroid(...data) {
		/*console.log('a ship has hit an asteroid');
		console.log(data);*/
	}

	#handleMissileHitShip(ship, missile) {
		if (missile instanceof ElfMissile && ship.name === Krampus.NAME) {
			GameEvent.Emit(GameEvent.ELF_MISSILE_HIT_KRAMPUS, ship, missile);
		}
		if (missile instanceof SantaMissile && ship.name === Krampus.NAME) {
			GameEvent.Emit(GameEvent.SANTA_MISSILE_HIT_KRAMPUS, ship, missile);
		}
		if (missile instanceof KrampusMissile && ship.name !== Krampus.NAME) {
			const eventName = ship.name === Elf.NAME ? GameEvent.KRAMPUS_MISSILE_HIT_ELF : GameEvent.KRAMPUS_MISSILE_HIT_SANTA;
			GameEvent.Emit(eventName, ship, missile);
		}
	}

	#handleAsteroidHitAsteroid(...data) {
		GameEvent.Emit(GameEvent.ASTEROID_HIT_ASTEROID, data);
	}

	#handleShipHitShip(ship1, ship2) {
		if ((ship1.name === Krampus.NAME || ship2.name === Krampus.NAME) && (ship1.name === Elf.NAME || ship2.name === Elf.NAME)) {
			GameEvent.Emit(GameEvent.KRAMPUS_HIT_ELF, ship1, ship2);
		}
		if ((ship1.name === Krampus.NAME || ship2.name === Santa.NAME) && (ship1.name === Santa.NAME || ship2.name === Elf.NAME)) {
			GameEvent.Emit(GameEvent.KRAMPUS_HIT_SANTA, ship1, ship2);
		}
	}

	#handleMissileHitAsteroid(asteroidSprite, missile) {
		if (missile instanceof ElfMissile) {
			GameEvent.Emit(GameEvent.ELF_MISSILE_HIT_ASTEROID, asteroidSprite, missile);
		} else if (missile instanceof SantaMissile) {
			GameEvent.Emit(GameEvent.SANTA_MISSILE_HIT_ASTEROID, asteroidSprite, missile);
		} else if (missile instanceof KrampusMissile) {
			GameEvent.Emit(GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID, asteroidSprite, missile);
		}
	}

	#launchShips(time) {
		if (time - this.#lastShipTime > this.#shipTimer) {
			const whoGetsToShootAtKrampus = Math.floor(Math.random() * 100);
			if (whoGetsToShootAtKrampus < (this.#sidebar.level - 1) * 10) {
				GameEvent.Emit(GameEvent.LAUNCH_SANTA_SHIP);
			} else {
				GameEvent.Emit(GameEvent.LAUNCH_ELF_SHIP);
			}
		}
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

	/* ---------------------------------------------- EVENT HANDLERS ------------------------------------------------ */
	#onAsteroidHitAsteroid(data) {
		// no operation - physics takes care of everything
	}

	#onCountdownStarted() {
		this.#inCountdown = true;
	}

	#onCountdownComplete() {
		this.#inCountdown = false;
	}

	#onElfMissileHitAsteroid(asteroidSprite, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			this.#asteroidGroup.remove(asteroidSprite);
		}
	}

	#onElfMissileHitKrampus(ship, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			GameEvent.Emit(GameEvent.GAME_OVER, this.#currentTime);
		}
	}

	#onSantaMissileHitKrampus(ship, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			GameEvent.Emit(GameEvent.GAME_OVER, this.#currentTime);
		}
	}

	#onGameReset() {
		if (this.#kaBoomSprite) {
			this.#kaBoomSprite.destroy();
			this.#kaBoomSprite = null;
		}
		this.#sidebar.reset();
		this.#sidebar.showGameOver();
		this.#sidebar.showPressStart();
		this.#sidebar.hideScore();
		this.#krampus.destroy();
		this.#krampus.setVisible(false);
		this.#asteroidGroup.removeAll();
		this.#gameStarted = false;
		this.scene.wake('credits');
		GameEvent.Emit(GameEvent.LEVEL_STARTED);
	}

	#onGameStarted(data) {
		this.scene.sleep('credits');
		if (this.#elf) {
			this.#elf.removeShip();
		}
		if (this.#santa) {
			this.#santa.removeShip();
		}
		this.#krampus.destroy();
		this.#asteroidGroup.removeAll();
		this.#gameStarted = true;
		this.#sidebar.reset();
		GameEvent.Emit(GameEvent.LEVEL_NEXT);
	}

	#onGameOver(data) {
		this.#sidebar.stopBonusTimer(false);
		this.#sidebar.showGameOver();
		this.#sidebar.hidePressStart();
		this.#sidebar.hideBonusTimer();
		const { x, y } = this.#krampus.sprite;
		this.#krampus.destroy();
		this.#krampus.setVisible(false);
		this.#gameStarted = false;
		if (this.#kaBoomSprite) {
			this.#kaBoomSprite.destroy();
			this.#kaBoomSprite = null;
		}
		this.#kaBoomSprite = this.add.image(x, y, 'ka-boom');
		this.#kaBoomSprite.setScale(.5);
		this.#kaBoomSprite.setDepth(10000);
		setTimeout(() => {
			GameEvent.Emit(GameEvent.GAME_RESET);
		}, 10000);
	}

	#onKrampusHitElf(ship1, ship2) {
		// they bounce off each other, so no action is taken.
	}

	#onKrampusHitSanta(ship1, ship2) {
		// they bounce off each other, so no action is taken.
	}

	#onKrampusMissileHitAsteroid(asteroidSprite, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			this.#sidebar.incrementScore(1);
			this.#asteroidGroup.remove(asteroidSprite);
		}
	}

	#onKrampusMissileHitElf(ship, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			GameEvent.Emit(GameEvent.REMOVE_ELF_SHIP, this.#currentTime);
		}
	}

	#onKrampusMissileHitSanta(ship, missile) {
		missile.destroy();
		if (this.#gameStarted) {
			GameEvent.Emit(GameEvent.REMOVE_SANTA_SHIP, this.#currentTime);
		}
	}

	#onLaunchElf() {
		this.#launchElf();
		this.#lastShipTime = Number.POSITIVE_INFINITY;
	}

	#onLaunchSanta() {
		this.#launchSanta();
		this.#lastShipTime = Number.POSITIVE_INFINITY;
	}

	#onLevelComplete(data) {
		this.#sidebar.stopBonusTimer();
		if (this.#elf) {
			this.#elf.removeShip();
		}
		if (this.#santa) {
			this.#santa.removeShip();
		}
		this.#lastShipTime = Number.POSITIVE_INFINITY;
		setTimeout(() => {
			GameEvent.Emit(GameEvent.LEVEL_NEXT);
		}, 5000)
	}

	#onLevelNext() {
		if (this.#elf) {
			this.#elf.removeShip();
		}
		if (this.#santa) {
			this.#santa.removeShip();
		}
		this.#krampus.destroy();
		[...this.#asteroids.values()].forEach(asteroid => asteroid.destroy());
		this.#asteroids.clear();
		this.#sidebar.incrementLevel(1);
		this.#sidebar.hideScore();
		this.#sidebar.hideBonusTimer();
		this.#sidebar.hideGameOver();
		this.#sidebar.hidePressStart();
		this.#lastShipTime = Number.POSITIVE_INFINITY;
		// start the countdown
		this.#sidebar.startCountdown();
	}

	#onLevelStarted() {
		this.#krampus = new Krampus({ scene: this, x: this.#space.midPoint.x, y: this.#space.midPoint.y, missilesPhysicsGroup: this.#missilesPhysicsGroup });
		this.#asteroidGroup = new AsteroidGroup({ scene: this, krampus: this.#krampus, space: this.#space, asteroidsPhysicsGroup: this.#asteroidsPhysicsGroup });
		this.#shipsPhysicsGroup.add(this.#krampus.sprite);
		this.#krampus.setPhysicsAttributes();

		for (let i = 0; i < 3 + this.#sidebar.level; i++) {
			const asteroid = this.#asteroidGroup.addAsteroid(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Asteroid.SCALE_LARGE);
			this.#asteroidsPhysicsGroup.add(asteroid.sprite);
			asteroid.setPhysicsAttributes();
		}
		if (this.#gameStarted) {
			this.#sidebar.showScore();
			this.#sidebar.startBonusTimer();
			this.#lastShipTime = this.#currentTime;
		}
	}

	#onRemoveElf(time) {
		this.#elf.removeShip();
		this.#elf = null;
		this.#lastShipTime = time;
	}

	#onRemoveSanta(time) {
		this.#santa.removeShip();
		this.#santa = null;
		this.#lastShipTime = time;
	}
}