import '/src/css/hold-that-tower.pcss';
import Phaser from 'phaser';
import WebFont from 'webfontloader';

import Ground from './../src/classes/Ui/Ground.js';
import Tower from "../src/classes/Ui/Tower.js";
import Position from "../src/classes/Position.js";
import Runner from "../src/classes/Ui/Runner.js";
import Enemy from "../src/classes/Ui/Enemy.js";
import Bullet from "../src/classes/Ui/Bullet.js";
import Gun from "../src/classes/Ui/Gun.js";
import Statistics from "../src/classes/Ui/Statistics.js";
import Coins from "../src/classes/Ui/Coins.js";
import Star from "../src/classes/Ui/Star.js";
import Crown from "../src/classes/Ui/Crown.js";

class Game extends Phaser.Scene {

	#ground;
	#tower;
	#runner;
	#enemy;
	#gun;
	#statistics;
	#prize;

	#gamepad;
	#gunAngle= 0;
	#gunRotationSpeed = .05;

	#bullets;
	#bulletLastFired;

	constructor() {
		super();
		this.#ground = new Ground({ scene: this });
		this.#tower = new Tower({ position: new Position(1000, 475), scene: this });
		this.#runner = new Runner({ scene: this });
		this.#enemy = new Enemy({ scene: this });
		this.#gun = new Gun({ scene: this });
		this.#statistics = new Statistics({ scene: this });
		this.#prize = new Coins({ scene: this, visible: false });
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

		this.load.image('prize1', './images/coin.png');

	}

	create ()
	{
		this.#ground.create();
		this.#tower.create();
		this.#runner.create({ visible: false });
		this.#enemy.create({ visible: false });
		this.#gun.create({ position: new Position(this.#tower.x, this.#tower.y - this.#tower.radius) });
		this.#statistics.create();
		this.#prize.create();

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

		setTimeout(this.#moveEnemy.bind(this), 3000);

	}
	update (time, delta) {
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

	}

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

	#moveEnemy() {
		// Set initial position on the left side of the screen
		if (Math.random() < .5) {
			this.#enemy.setPosition(new Position(
			Math.random() < .5 ? -100 : this.cameras.main.width + 100,
				Math.floor(Math.random() * this.cameras.main.height)
			));
		} else {
			this.#enemy.setPosition(new Position(
				Math.floor(Math.random() * this.cameras.main.width),
			Math.random() < .5 ? -100 : this.cameras.main.height + 100
			));
		}
		this.#enemy.setVisible(true);

		// Create a tween to move from left to right
		this.tweens.add({
			targets: this.#enemy.image,
			x: this.#tower.x,
			y: this.#tower.y,
			duration: 5000, // Time in milliseconds to complete the animation
			ease: 'Linear', // Linear motion for consistent speed
			onComplete: () => {
				// Optional: if you want to repeat the animation or do something when done
				this.#enemy.setVisible(false);
				this.#dropPrize();
			}
		});
	}

	#dropPrize() {
		this.#prize.setPosition(new Position(
		Math.floor(Math.random() * this.cameras.main.width - 500) + 400,
		Math.floor(Math.random() * this.cameras.main.height - 50) + 10
		));
		this.#prize.setVisible(true);
		this.#moveRunner();
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




}
const multiplier = .98;
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth * multiplier,
	height: window.innerHeight * multiplier,
	parent: 'phaser-example',
	pixelArt: true,
	input: {
		gamepad: true
	},
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }, // No gravity for top-down games
			debug: false
		}
	},
	scene: Game
};


// Load the font before initializing Phaser
WebFont.load({
	google: {
		families: ['Pixelify Sans']
	},
	active: function() {
		// Initialize your Phaser game after fonts are loaded
		const game = new Phaser.Game(config);
	}
});

// const game = new Phaser.Game(config);