import Ground from '../Ui/Ground.js';
import Tower from '../Tower.js';
import Position from '../Position.js';
import Runner from '../Runner.js';
import Enemy from '../Ui/Enemy.js';
import Statistics from '../Statistics.js';
import StatisticsUi from '../Ui/Statistics.js';
import Coins from '../Ui/Coins.js';
import Bullet from '../Ui/Bullet.js';
import Star from '../Ui/Star.js';
import Crown from '../Ui/Crown.js';
import BulletGroup from "../Ui/BulletGroup.js";
import EnemyGroup from "../Ui/EnemyGroup.js";
import RunnerGroup from "../Ui/RunnerGroup.js";
import EnemyType from "../../enums/EnemyType.js";
import GameEvent from "../../enums/GameEvent.js";
import Ammo from "../Ammo.js";
import AmmoType from "../../enums/AmmoType.js";
import CardUpgradeType from "../../enums/CardUpgradeType.js";
import CardSelect from "../CardSelect.js";
import ButtonUpgradeType from "../../enums/ButtonUpgradeType.js";

export default class GamePlay extends Phaser.Scene {
	#ground;
	#tower;
	#statistics;

	#prizesGroup;
	#prizesDropped;

	#cardSelect;

	#gamepad;
	#gunDamage = 6;

	#xKeyLastPressed = 0;

	#bullets;

	#enemies;

	#runners;
	#runnerSpeed = Runner.DEFAULT_SPEED;

	#currentWave = 1;

	#waveEnded = false;
	#gameOver = false;

	constructor() {
		super({
			key: 'game-play-scene'
		});
	}

	preload() {
		Ground.preload(this);
		Tower.preload(this);
		Enemy.preload(this);
		Bullet.preload(this);
		Coins.preload(this);
		Star.preload(this);
		Crown.preload(this);
		EnemyType.preload(this);
		GameEvent.Setup(this);
	}

	create() {
		// setup events
		this.events.once(GameEvent.GAME_OVER, this.#onGameOver.bind(this));
		this.events.on(GameEvent.ENEMY_REACHED_TOWER, this.#onEnemyReachedTower.bind(this));
		this.events.on(GameEvent.ENEMY_DESTROYED, this.#onEnemyDestroyed.bind(this));
		this.events.on(GameEvent.RUNNER_RETURNED, this.#onRunnerReturned.bind(this));
		this.events.on(GameEvent.RUNNER_DESTROYED, this.#onRunnerDestroyed.bind(this));

		this.events.on(GameEvent.MISSILE_HIT_TOWER, this.#onMissileHitTower.bind(this));
		this.events.on(GameEvent.MISSILE_HIT_RUNNER, this.#onMissileHitRunner.bind(this));
		this.events.on(GameEvent.MISSILE_HIT_ENEMY, this.#onMissileHitEnemy.bind(this));
		this.events.on(GameEvent.MISSILE_HIT_MISSILE, this.#onMissileHitMissile.bind(this));

		this.events.on(GameEvent.WAVE_STARTED, this.#onWaveStarted.bind(this));
		this.events.on(GameEvent.WAVE_ENDED, this.#onWaveEnded.bind(this));
		this.events.on(GameEvent.NEW_WAVE, this.#onNewWave.bind(this));

		this.events.on(GameEvent.CARD_SELECTED, this.#onCardSelected.bind(this));

		this.events.on(GameEvent.UPDATE_SELECTED, this.#onUpgradeSelected.bind(this));

		this.#ground = new Ground({scene: this});
		this.#ground.create();


		this.#tower = new Tower({position: new Position(1000, 475), scene: this});
		this.#statistics = new Statistics({scene: this});

		this.#statistics.create();
		this.input.gamepad.start();

		this.input.gamepad.on('connected', (pad) => {
			this.#gamepad = pad;
		});
		this.input.gamepad.on('disconnected', (pad) => {
			this.#gamepad = null;
		});
		this.#gameOver = false;
		this.#cardSelect = new CardSelect({scene: this, position: new Position(400, 100)});

		EnemyType.createAnimations(this);
		GameEvent.Emit(GameEvent.NEW_WAVE);
	}

	update(time, delta) {
		this.#enemies.setLastLaunchedTime(time);
		// TODO: Left or Right Handed
		if (this.#gamepad) {
			// Get horizontal input from left analog stick or d-pad
			let horizontalInput = this.#gamepad.leftStick.x;
			const direction = horizontalInput > 0 ? 1 : -1;

			// Update the angle based on controller input
			if (horizontalInput !== 0) {
				this.#tower.guns.forEach((gun) => {
					let angle = gun.angle;
					angle += this.#tower.turretRotationSpeed * direction;
					const x = this.#tower.x + this.#tower.radius * Math.cos(angle);
					const y = this.#tower.y + this.#tower.radius * Math.sin(angle);
					gun.setPosition(new Position(x, y));
					gun.setRotation(angle + Math.PI / 2);
					gun.setAngle(angle);
				});
			}
			if (this.#gamepad.X && time > this.#xKeyLastPressed + 500) {
				this.#xKeyLastPressed = time;
				const button = this.#statistics.getButtonUpgradeHealth();
				if (button.selectable) {
					this.#onUpgradeSelected(button);
				}
			}
			if (this.#gamepad.A) {
				// Fire cooldown (200ms = 5 bullets per second)
				if (time > this.#bullets.bulletLastFired + 200) {
					this.#bullets.fireBullet(this.#tower.guns, time);
				}
			}
			this.#bullets.removeOffScreenBullets();
		}
		this.#enemies.scheduleNextEnemyMove(time);
		if (this.#prizesDropped.length > 0 && !this.#waveEnded) {
			this.#runners.scheduleNextRunner(this.#prizesDropped);
		}
	}

	#handleBulletEnemyCollision(bullet, enemyImage) {
		bullet.setActive(false).setVisible(false);
		bullet.body.enable = false;

		// Find the Enemy instance that owns this image
		const hitEnemy = this.#enemies.findEnemyFromImage(enemyImage);
		if (hitEnemy) {
			GameEvent.Emit(GameEvent.MISSILE_HIT_ENEMY, bullet, hitEnemy);
		}
	}

	#clearDroppedPrizes() {
		this.#prizesDropped.forEach(prize => {
			prize.setVisible(false);
		});
		this.#prizesDropped = [];
	}

	#dropPrize(prize, position) {
		const x = position ? position.x : Math.floor(Math.random() * this.cameras.main.width - 500) + 400;
		const y = position ? position.y : Math.floor(Math.random() * this.cameras.main.height - 50) + 10;
		prize.setPosition(new Position(x, y));
		prize.setVisible(true);
		this.#prizesGroup.add(prize.image);
		this.#prizesDropped.push(prize);
	}

	#onGameOver() {
		this.#gameOver = true;
		GameEvent.Emit(GameEvent.WAVE_ENDED);
		const gameWidth = this.cameras.main.width;
		const gameHeight = this.cameras.main.height;
		const width = 500;
		const height = 300;
		const x = (gameWidth - width) / 2;
		const y = (gameHeight - height) / 2;

		const square = this.add.rectangle(
			x,
			y,
			width,
			height,
			0x660000,
			1
		)
			.setOrigin(0, 0)
			.setStrokeStyle(2, 0x000000);
		const text = this.add.text(x + 10, y + 20, 'GAME OVER', {
			fontFamily: StatisticsUi.DEFAULT_FONT,
			fontSize: '40px',
			fixedWidth: width - 20,
			fill: '#ffffff',
			align: 'center',
		});
	};

	#onUpgradeSelected(button) {
		if (button.type === ButtonUpgradeType.HEALTH) {
			this.#tower.setHealth(this.#tower.maxHealth);
			this.#statistics.setHealth(this.#tower.maxHealth);
			const newLimit = Math.round(button.limit * 1.5);
			this.#statistics.setUpgradeButtonHealthLimit(button.limit, newLimit);
		}
		if (button.type === ButtonUpgradeType.RUNNER) {
			// this.#tower.addRunner(new Runner({ scene: this }))
			this.#tower.addRunner();
			const newLimit = Math.round(button.limit * 1.5);
			this.#statistics.setUpgradeButtonAddRunner(button.limit, newLimit);
		}
		if (button.type === ButtonUpgradeType.GUN) {
			this.#tower.addGun();
			const newLimit = Math.round(button.limit * 1.5);
			this.#statistics.setUpgradeButtonAddGun(button.limit, newLimit);
		}
	}

	#onEnemyReachedTower(enemy) {
		enemy.setVisible(false);
		const ammo = new Ammo({ damage: enemy.damage, type: AmmoType.ENEMY, scene: this });
		const health = this.#tower.takeDamage(ammo);
		this.#statistics.setHealth(this.#tower.health);
		if (this.#enemies.enemyToLaunch === -1 && enemy === this.#enemies.lastEnemyToLaunch) {
			GameEvent.Emit(GameEvent.WAVE_ENDED);
		}
		if (health === 0) {
			GameEvent.Emit(GameEvent.GAME_OVER);
		}
	};

	#onEnemyDestroyed(enemy) {
		enemy.setVisible(false);
		this.tweens.getTweensOf(enemy.image).forEach(tween => tween.stop());
		enemy.destroy();
		this.#dropPrize(enemy.prize, new Position(enemy.image.x, enemy.image.y));
		if (this.#enemies.enemyToLaunch === -1 && enemy === this.#enemies.lastEnemyToLaunch) {
			GameEvent.Emit(GameEvent.WAVE_ENDED);
		}
	};

	#onRunnerReturned(prize) {
		this.#statistics.update(prize);
	};

	#onRunnerDestroyed(enemy) {
	};

	#onMissileHitTower(missile) {
	};

	#onMissileHitRunner(missile, runner) {
	};

	#onMissileHitEnemy(missile, enemy) {
		const bullet = this.#bullets.findBulletFromImage(missile);
		const hitPoints = enemy.takeDamage(bullet.damage);
		if (hitPoints === 0) {
			GameEvent.Emit(GameEvent.ENEMY_DESTROYED, enemy);
		}
	};

	#onMissileHitMissile(missileFired, missileHit) {
	};

	#onWaveStarted(wave) {
		this.#waveEnded = false;
		this.#statistics.setWave(wave);
	};

	#onWaveEnded() {
		this.#waveEnded = true;
		this.#clearDroppedPrizes();
		this.#enemies.destroy();
		this.#bullets.destroy();
		if (!this.#gameOver) {
			this.#cardSelect.build();
		}
	};

	#onNewWave() {
		this.#bullets = new BulletGroup({scene: this, damage: this.#gunDamage });
		this.#bullets.create();
		this.#enemies = new EnemyGroup({scene: this, tower: this.#tower});

		this.#enemies.buildWave(this.#currentWave);

		this.#prizesGroup = this.physics.add.group();
		this.#prizesDropped = [];

		this.#runners = new RunnerGroup({scene: this, tower: this.#tower, statistics: this.#statistics, speed: this.#runnerSpeed });
		this.#runners.buildWave(this.#currentWave);

		this.physics.add.overlap(
			this.#bullets.group,
			this.#enemies.group,
			this.#handleBulletEnemyCollision.bind(this),
			(bullet, enemy) => bullet.active && enemy.visible,
			this
		);

		this.#statistics.setHealth(this.#tower.health);
		this.#statistics.setMaxHealth(this.#tower.maxHealth);
		this.#statistics.setGunDamage(this.#gunDamage);
		this.#statistics.setRunnerSpeed(this.#runnerSpeed);
		this.#statistics.setGunRotationSpeed(this.#tower.turretRotationSpeed);
		GameEvent.Emit(GameEvent.WAVE_STARTED, this.#currentWave);
	}

	#onCardSelected(card) {
		this.#updateStats(card);
		this.#cardSelect.remove();
		if (!this.#gameOver) {
			setTimeout(() => {
				this.#currentWave++;
				GameEvent.Emit(GameEvent.NEW_WAVE);
			}, 5000);
		}
	}

	#updateStats(card) {
		if (card.type === CardUpgradeType.GUN_DAMAGE) {
			this.#gunDamage = this.#gunDamage * card.upgradeAmount;
			this.#statistics.setGunDamage(this.#gunDamage);
			// this.#gun.setDamage(this.#gunDamage);
		} else if (card.type === CardUpgradeType.TOWER_MAX_HEALTH) {
			const maxHealth = Math.round(this.#tower.maxHealth * card.upgradeAmount);
			this.#tower.setMaxHealth(maxHealth);
			this.#statistics.setMaxHealth(maxHealth);
		} else if (card.type === CardUpgradeType.TOWER_HEALTH) {
			const health = Math.round(Math.min(this.#tower.health * card.upgradeAmount, this.#tower.maxHealth));
			this.#tower.setHealth(health);
			this.#statistics.setHealth(health);
		} else if (card.type === CardUpgradeType.RUNNER_SPEED) {
			this.#runnerSpeed = Math.round(this.#runnerSpeed * card.upgradeAmount);
			this.#statistics.setRunnerSpeed(this.#runnerSpeed);
		} else if (card.type === CardUpgradeType.TOWER_ROTATION_SPEED) {
			this.#tower.setTurretRotationSpeed(this.#tower.turretRotationSpeed + card.upgradeAmount);
			this.#statistics.setGunRotationSpeed(this.#tower.turretRotationSpeed);
		}
	}

}