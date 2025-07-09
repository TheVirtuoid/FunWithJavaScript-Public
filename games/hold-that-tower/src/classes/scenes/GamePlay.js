import Ground from '../Ui/Ground.js';
import Tower from '../Ui/Tower.js';
import Position from '../Position.js';
import Runner from '../Ui/Runner.js';
import Enemy from '../Ui/Enemy.js';
import Gun from '../Ui/Gun.js';
import Statistics from '../Ui/Statistics.js';
import Coins from '../Ui/Coins.js';
import Bullet from '../Ui/Bullet.js';
import Star from '../Ui/Star.js';
import Crown from '../Ui/Crown.js';

export default class GamePlay extends Phaser.Scene {
	#ground;
	#tower;
	#enemy;
	#gun;
	#statistics;
	#prize;
	#prizesGroup;

	#gamepad;
	#gunAngle= 0;
	#gunRotationSpeed = .05;

	#bullets;
	#bulletLastFired;

	#enemies;
	#enemiesGroup;
	#enemyToLaunch = 0;
	#enemyLastLaunchedTime = 0;
	#enemyLaunchInterval = 1000; // Launch enemy every 3 seconds

	#currentWave = 1;

	#runner;

	constructor() {
		super({
			key: 'game-play-scene'
		});
	}

	preload ()
	{
		Ground.preload(this);
		Tower.preload(this);
		Runner.preload(this);
		Enemy.preload(this);
		Bullet.preload(this);
		Gun.preload(this);
		Coins.preload(this);
		Star.preload(this);
		Crown.preload(this);
	}

	create ()
	{
		this.#ground = new Ground({ scene: this });
		this.#tower = new Tower({ position: new Position(1000, 475), scene: this });
		// this.#enemy = new Enemy({ scene: this });
		this.#gun = new Gun({ scene: this });
		this.#statistics = new Statistics({ scene: this });
		this.#prize = new Coins({ scene: this, visible: false });
		this.#runner = new Runner({ scene: this });
		this.#ground.create();
		this.#tower.create();
		// this.#enemy.create({ visible: false });
		this.#gun.create({ position: new Position(this.#tower.x, this.#tower.y - this.#tower.radius) });
		this.#statistics.create();
		this.#prize.create();
		this.#runner.create({ visible: false });

		this.#bullets = this.physics.add.group({
			name: 'bullets',
			enabled: false
			// maxSize: 20
		});
		this.#bullets.createMultiple({
			key: 'bullet',
			quantity: 20,
			active: false,
			visible: false,
			setScale: { x: 0.25, y: 0.25 },
		});
		this.#bulletLastFired = 0;

		// gamepad input
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		this.#buildEnemyWave(this.#currentWave);

		this.#enemiesGroup = this.physics.add.group();
		this.#enemies.forEach(enemy => {
			this.#enemiesGroup.add(enemy.image);
		});

		this.#prizesGroup = this.physics.add.group();

		this.physics.add.overlap(
			this.#bullets,
			this.#enemiesGroup,
			this.#handleBulletEnemyCollision.bind(this),
			(bullet, enemy) => bullet.active && enemy.visible,
			this
		);
	}
	update (time, delta) {
		this.#enemyLastLaunchedTime = this.#enemyLastLaunchedTime === 0 ? time : this.#enemyLastLaunchedTime;
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
				if (time > this.#bulletLastFired + 200) {
					this.#fireBullet(time);
				}
			}
			if (this.#bullets) {
				this.#bullets.getChildren().forEach(bullet => {
					// Remove bullets that are off-screen
					if (bullet.active && (
						bullet.x < 0 ||
						bullet.x > this.cameras.main.width ||
						bullet.y < 0 ||
						bullet.y > this.cameras.main.height
					)) {
						bullet.setActive(false).setVisible(false);
					}
				});
			}
		}
		if (time > this.#enemyLastLaunchedTime + this.#enemyLaunchInterval && this.#enemyToLaunch !== -1) {
			if (this.#enemyToLaunch < this.#enemies.length) {
				const enemy = this.#enemies[this.#enemyToLaunch];
				this.#moveEnemy(enemy);
				this.#enemyToLaunch++;
				this.#enemyLastLaunchedTime = time;
			} else {
				this.#enemyToLaunch = -1;
			}
		}
	}

	#handleBulletEnemyCollision(bullet, enemyImage) {
		// console.log(bullet, enemyImage);
		bullet.setActive(false).setVisible(false);
		bullet.body.enable = false;

		// Find the Enemy instance that owns this image
		const hitEnemy = this.#enemies.find(enemy => enemy.image === enemyImage);
		if (hitEnemy) {
			hitEnemy.setVisible(false);
			// Stop any tweens for this enemy
			this.tweens.getTweensOf(enemyImage).forEach(tween => tween.stop());
			this.#dropPrize(new Position(enemyImage.x, enemyImage.y));
		}
	}


	#launchEnemy() {}

	#fireBullet(time) {
		// Get a bullet from the pool or create a new one
		const bullet = this.#bullets.getFirstDead();
		if (bullet) {
			const offsetX = Math.cos(this.#gun.rotation - Math.PI/2) * 30;
			const offsetY = Math.sin(this.#gun.rotation - Math.PI/2) * 30;
			bullet.enableBody(true, this.#gun.x + offsetX, this.#gun.y + offsetY, true, true);
			const bulletSpeed = 1200;
			const velocityX = Math.cos(this.#gun.rotation - Math.PI/2) * bulletSpeed;
			const velocityY = Math.sin(this.#gun.rotation - Math.PI/2) * bulletSpeed;
			bullet.body.setVelocity(velocityX, velocityY);
			this.#bulletLastFired = time;
		}
	}

	#moveEnemy(enemy) {
		if (Math.random() < .5) {
			enemy.setPosition(new Position(
				Math.random() < .5 ? -100 : this.cameras.main.width + 100,
				Math.floor(Math.random() * this.cameras.main.height)
			));
		} else {
			enemy.setPosition(new Position(
				Math.floor(Math.random() * this.cameras.main.width),
				Math.random() < .5 ? -100 : this.cameras.main.height + 100
			));
		}
		enemy.setVisible(true);

		// Create a tween to move from left to right
		this.tweens.add({
			targets: enemy.image,
			x: this.#tower.x,
			y: this.#tower.y,
			duration: 5000, // Time in milliseconds to complete the animation
			ease: 'Linear', // Linear motion for consistent speed
			onComplete: () => {
				// Optional: if you want to repeat the animation or do something when done
				enemy.setVisible(false);
			}
		});
	}

	#dropPrize(position) {
		const prize = new Coins({ scene: this, visible: false });
		prize.create();
		const x = position ? position.x : Math.floor(Math.random() * this.cameras.main.width - 500) + 400;
		const y = position ? position.y : Math.floor(Math.random() * this.cameras.main.height - 50) + 10;
		prize.setPosition(new Position(x, y));
		prize.setVisible(true);
		this.#prizesGroup.add(prize.image);
	}

	#moveRunner() {
		this.#runner.setPosition(new Position(this.#tower.x, this.#tower.y));
		this.#runner.setVisible(true);
		this.tweens.add({
			targets: this.#runner.image,
			x: this.#prize.x,
			y: this.#prize.y,
			duration: 2000,
			ease: 'Linear',
			onComplete: () => {
				this.#prize.setVisible(false);
				this.tweens.add({
					targets: this.#runner.image,
					x: this.#tower.x,
					y: this.#tower.y,
					duration: 2000,
					ease: 'Linear',
					onComplete: () => {
						this.#runner.setVisible(false);
						this.#statistics.updateMoney(Math.floor(Math.random() * 15) + 5);
						setTimeout(this.#moveEnemy.bind(this),500);
					}
				});
			}
		});
	}

	#buildEnemyWave(wave) {
		this.#enemyToLaunch = 0;
		this.#enemyLastLaunchedTime = 0;
		this.#enemyLaunchInterval = 1000 - (wave * 50); // Decrease interval by 50ms per wave, minimum 200ms
		if (this.#enemyLaunchInterval < 200) {
			this.#enemyLaunchInterval = 200;
		}
		this.#currentWave = wave;
		this.#enemies = [];
		for (let i = 0; i < 20; i++) {
			const enemy = new Enemy({ scene: this, visible: false });
			enemy.create({ visible: false });
			// this.physics.add.existing(enemy);
			this.#enemies.push(enemy);
		}
		// this.#statistics.setWave(wave);
	}
}