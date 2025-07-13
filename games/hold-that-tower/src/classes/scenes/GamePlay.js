import Ground from '../Ui/Ground.js';
import Tower from '../Tower.js';
import TowerUi from '../UI/Tower.js';
import Position from '../Position.js';
import Runner from '../Ui/Runner.js';
import Enemy from '../Ui/Enemy.js';
import Gun from '../Ui/Gun.js';
import Statistics from '../Statistics.js';
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
import CardUi from '../UI/Card.js';
import CardUpgradeType from "../../enums/CardUpgradeType.js";
import CardSelect from "../CardSelect.js";

export default class GamePlay extends Phaser.Scene {
	#ground;
	#tower;
	#gun;
	#statistics;

	#prizesGroup;
	#prizesDropped;

	#cardSelect;

	#gamepad;
	#gunAngle = 0;
	#gunRotationSpeed = .05;
	#gunDamage = 6;

	#bullets;

	#enemies;

	#runners;

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
		TowerUi.preload(this);
		Runner.preload(this);
		Enemy.preload(this);
		Bullet.preload(this);
		Gun.preload(this);
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

		this.#ground = new Ground({scene: this});
		this.#ground.create();
		this.#tower = new Tower({position: new Position(1000, 475), scene: this});
		this.#statistics = new Statistics({scene: this});

		this.#gun = new Gun({scene: this});
		// this.#tower.create();
		this.#gun.create({position: new Position(this.#tower.x, this.#tower.y - this.#tower.radius)});
		this.#statistics.create();
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});
		this.#gameOver = false;

		this.#cardSelect = new CardSelect({scene: this, position: new Position(400, 100)});

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
				this.#gunAngle += this.#gunRotationSpeed * direction;
				const x = this.#tower.x + this.#tower.radius * Math.cos(this.#gunAngle);
				const y = this.#tower.y + this.#tower.radius * Math.sin(this.#gunAngle);
				this.#gun.setPosition(new Position(x, y));
				this.#gun.setRotation(this.#gunAngle + Math.PI / 2);
			}
			if (this.#gamepad.A) {
				// Fire cooldown (200ms = 5 bullets per second)
				if (time > this.#bullets.bulletLastFired + 200) {
					this.#bullets.fireBullet(this.#gun, time);
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
	};

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

	#onRunnerReturned(enemy) {
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

		this.#runners = new RunnerGroup({scene: this, tower: this.#tower, statistics: this.#statistics});
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
			const maxHealth = this.#tower.maxHealth * card.upgradeAmount;
			this.#tower.setMaxHealth(maxHealth);
			this.#statistics.setMaxHealth(maxHealth);
		}
	}

}