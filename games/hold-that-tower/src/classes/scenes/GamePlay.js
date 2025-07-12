import Ground from '../Ui/Ground.js';
import Tower from '../Tower.js';
import TowerUi from '../UI/Tower.js';
import Position from '../Position.js';
import Runner from '../Ui/Runner.js';
import Enemy from '../Ui/Enemy.js';
import Gun from '../Ui/Gun.js';
import Statistics from '../Ui/Statistics.js';
import Coins from '../Ui/Coins.js';
import Bullet from '../Ui/Bullet.js';
import Star from '../Ui/Star.js';
import Crown from '../Ui/Crown.js';
import BulletGroup from "../Ui/BulletGroup.js";
import EnemyGroup from "../Ui/EnemyGroup.js";
import RunnerGroup from "../Ui/RunnerGroup.js";
import EnemyType from "../../enums/EnemyType.js";

export default class GamePlay extends Phaser.Scene {
	#ground;
	#tower;
	#gun;
	#statistics;
	#prize;
	#prizesGroup;
	#prizesDropped;

	#gamepad;
	#gunAngle= 0;
	#gunRotationSpeed = .05;

	#bullets;

	#enemies;

	#runners;

	#currentWave = 1;

	#runner;

	#waveEnded = false;

	constructor() {
		super({
			key: 'game-play-scene'
		});
	}

	preload ()
	{
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
	}

	create ()
	{
		this.#ground = new Ground({ scene: this });
		this.#ground.create();
		this.#tower = new Tower({ position: new Position(1000, 475), scene: this });
		this.#gun = new Gun({ scene: this });
		this.#statistics = new Statistics({ scene: this });
		this.#prize = new Coins({ scene: this, visible: false });
		// this.#tower.create();
		this.#gun.create({ position: new Position(this.#tower.x, this.#tower.y - this.#tower.radius) });
		this.#statistics.create();
		this.#prize.create();

		this.#bullets = new BulletGroup({ scene: this });
		this.#bullets.create();

		// gamepad input
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		this.#enemies = new EnemyGroup({ scene: this, tower: this.#tower });

		this.#enemies.buildWave(this.#currentWave);

		this.#prizesGroup = this.physics.add.group();
		this.#prizesDropped = [];

		this.#runners = new RunnerGroup({ scene: this, tower: this.#tower, statistics: this.#statistics });
		this.#runners.buildWave(this.#currentWave);

		this.physics.add.overlap(
			this.#bullets.group,
			this.#enemies.group,
			this.#handleBulletEnemyCollision.bind(this),
			(bullet, enemy) => bullet.active && enemy.visible,
			this
		);

		this.#waveEnded = false;
	}
	update (time, delta) {
		this.#enemies.setLastLaunchedTime(time);
		// TODO: Left or Right Handed
		if (this.#gamepad) {
			// Get horizontal input from left analog stick or d-pad
			let horizontalInput = this.#gamepad.leftStick.x;
			const direction = horizontalInput > 0 ? 1 : - 1;

			// Update the angle based on controller input
			if (horizontalInput !== 0) {
				this.#gunAngle += this.#gunRotationSpeed * direction;
				const x = this.#tower.x + this.#tower.radius * Math.cos(this.#gunAngle);
				const y = this.#tower.y + this.#tower.radius * Math.sin(this.#gunAngle);
				this.#gun.setPosition(new Position(x, y));
				this.#gun.setRotation(this.#gunAngle + Math.PI/2);
			}
			if (this.#gamepad.A) {
				// Fire cooldown (200ms = 5 bullets per second)
				if (time > this.#bullets.bulletLastFired + 200) {
					this.#bullets.fireBullet(this.#gun, time);
				}
			}
			this.#bullets.removeOffScreenBullets();
		}
		this.#waveEnded = this.#enemies.scheduleNextEnemyMove(time);
		if (this.#waveEnded) {
			this.#clearDroppedPrizes();
		}
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
			hitEnemy.setVisible(false);
			// Stop any tweens for this enemy
			this.tweens.getTweensOf(enemyImage).forEach(tween => tween.stop());
			this.#dropPrize(hitEnemy.prize, new Position(enemyImage.x, enemyImage.y));
			if (this.#enemies.enemyToLaunch === -1 && hitEnemy === this.#enemies.lastEnemyToLaunch) {
				this.#waveEnded = true;
				this.#clearDroppedPrizes();
			}
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
}