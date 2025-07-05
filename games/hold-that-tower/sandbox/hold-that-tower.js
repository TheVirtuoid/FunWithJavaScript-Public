import '/src/css/hold-that-tower.pcss';
import Phaser from 'phaser';
import WebFont from 'webfontloader';

class Game extends Phaser.Scene {

	#gun;
	#gamepad;
	#gunAngle= 0;
	#gunRotationSpeed = .1;

	#graphics;

	#tower = { x: 1000, y: 475, radius: 75 };

	#bullets;
	#bulletLastFired;
	#bullet;
	#gunner;
	#gunnerCountdown = 2000;

	#runner;
	#prize;

	constructor() {
		super();
	}

	preload ()
	{
		// this.load.setBaseURL('localhost:5173');
		// this.load.image('toy', './images/shocktroopers-toy.png');
		// this.load.bitmapFont('atari', './fonts/atari-classic.png', './fonts/atari-classic.xml');
		// this.load.spritesheet('veg', './images/fruitnveg32wh37.png', { frameWidth: 32, frameHeight: 37 });
		// this.load.image('mushroom', './images/mine.png');
		this.load.image('ground', './images/vecteezy_brown-pixel-pattern-or-background_33048268.jpg');
		// this.load.tilemapTiledJSON('map1', './images/super-mario.json');
		// this.load.image('tiles1', './images/super-mario.png');

		this.load.image('tower', './images/tower.png');
		this.load.image('gun', './images/gun.png');
		this.load.image('prize1', './images/coin.png');
		this.load.image('prize2', './images/star.png');
		this.load.image('prize3', './images/crown.png');
		this.load.image('bullet', './images/bullet.png');
		this.load.image('gunner', './images/snowman.png');
		this.load.image('runner', './images/dancing.png');

		this.load.image('prize', './images/coin.png');

	}

	create ()
	{
		this.tilesprite = this.add.tileSprite(800, 400, 0, 0, 'ground');

		const graphics = this.add.graphics();
		this.#graphics = graphics;
		graphics.fillStyle(0x402000, 1);
		graphics.fillRoundedRect(10, 10, 350, 670, 20);

		graphics.lineStyle(2, 0xffffff,1);
		graphics.strokeRoundedRect(20, 100, 330, 240, 20);


		this.add.text(20, 20, 'Hold That Tower!', {
			fontFamily: 'Pixelify Sans',
			fontSize: '32px',
			fill: '#ffffff'
		});

		this.add.text(20, 60, 'Wave: 6', {
			fontFamily: 'Pixelify Sans',
			fontSize: '26px',
			fill: '#88ff88'
		});


		this.add.text(30, 110, 'Hitpoints: 20', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(30, 135, 'Max Hitpoints: 30', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(30, 160, 'Gun Damage: 6', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(30, 185, 'Enemies Destroyed: 38', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ff4444'
		});

		this.add.text(40, 205, 'Gunners:  11', {
			fontFamily: 'Pixelify Sans',
			fontSize: '16px',
			fill: '#ff4444'
		});
		this.add.text(40, 220, 'Runners:  23', {
			fontFamily: 'Pixelify Sans',
			fontSize: '16px',
			fill: '#ff4444'
		});
		this.add.text(40, 235, 'Bosses:  4', {
			fontFamily: 'Pixelify Sans',
			fontSize: '16px',
			fill: '#ff4444'
		});

		this.add.text(30, 300, 'Prizes:', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#4444ff'
		});

		this.add.image(170, 270, 'prize1').setScale(.075);
		this.add.text(150, 300, '267', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#4444ff'
		});

		this.add.image(240, 270, 'prize2').setScale(.075);
		this.add.text(230, 300, '44', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#4444ff'
		});

		this.add.image(310, 270, 'prize3').setScale(.075);
		this.add.text(310, 300, '7', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#4444ff'
		});

		this.add.text(20, 350, 'Upgrades', {
			fontFamily: 'Pixelify Sans',
			fontSize: '26px',
			fill: '#88ff88'
		});

		this.add.text(30, 390, 'Guns', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(100, 390, 'Tower', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(190, 390, 'Wall', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.add.text(250, 390, 'Runners', {
			fontFamily: 'Pixelify Sans',
			fontSize: '20px',
			fill: '#ffffff'
		});

		graphics.lineStyle(2, 0x8888ff);
		graphics.lineBetween(50,430, 50, 640);

		graphics.lineStyle(2, 0x8888ff);
		graphics.lineBetween(130,430, 130, 640);

		graphics.lineStyle(2, 0x8888ff);
		graphics.lineBetween(210,430, 210, 640);

		graphics.lineStyle(2, 0x8888ff);
		graphics.lineBetween(290,430, 290, 640);

		// gun
		this.#buildUpgradePath(40, 420, [true, true, false, false, false, false]);

		// tower
		this.#buildUpgradePath(120, 420, [true, true, true, true, false, false]);

		// Wall
		this.#buildUpgradePath(200, 420, [true, true, true, true, true, false]);

		// Runners
		this.#buildUpgradePath(280, 420, [false, false, false, false, false, false]);

		this.#graphics.fillStyle(0x000000);
		this.#graphics.fillRect(0, 0, 4, 4);
		// this.#bullet = this.#graphics.generateTexture('bullet-texture', 4, 4);

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



		// const map1 = this.make.tilemap({ key: 'map1' });
		// const tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
		// const layer1 = map1.createLayer('World1', tileset1, 0, 64).setScale(2);

		// this.add.image(0, 0, 'tower').setOrigin(100, 100).setScale(.35);
		this.add.image(this.#tower.x, this.#tower.y, 'tower').setScale(.15);
		// this.#gun = this.add.image(this.#gunX, this.#gunY, 'gun').setScale(.1);
		this.#gun = this.add.image(this.#tower.x, this.#tower.y - this.#tower.radius, 'gun').setScale(.1);
		this.#gunner = this.add.image(-100, -100, 'gunner').setScale(.1);
		this.#gunner.setVisible(false);

		this.#runner = this.add.image(500, 100, 'runner').setScale(.1);
		this.#runner.setVisible(false);

		this.#prize = this.add.image(500, 100, 'prize').setScale(.075);
		this.#prize.setVisible(false);
		// this.add.text(400, 8, 'Phaser 3 pixelArt: true', { font: '16px Courier', fill: '#00ff00' }).setOrigin(0.5, 0).setScale(3);

		/*this.add.particles(400, 300, 'veg', {
			frame: 0,
			speed: 100,
			frequency: 300,
			lifespan: 4000
		}).setScale(4);*/

		// this.add.bitmapText(400, 128, 'atari', 'PHASER').setOrigin(0.5).setScale(2);
		// gamepad input
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		setTimeout(this.#moveGunner.bind(this), this.#gunnerCountdown);

	}

	gamer = false;

	update (time, delta) {
		/*this.tilesprite.tileScaleX = Math.max(2, Math.sin(this.iter) * .08);
		this.tilesprite.tileScaleY = Math.max(2, Math.sin(this.iter) * .08);*/
		this.tilesprite.tileScaleX = .05;
		this.tilesprite.tileScaleY = .05;
		this.tilesprite.setAlpha(.01, .5, .5, 1);

		// this.iter += 0.01;
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

				// Update player position
				this.#gun.setPosition(x, y);

				// Optional: rotate the player to face along the circle
				this.#gun.rotation = this.#gunAngle + Math.PI/2; // Add 90 degrees to face tangent to the circle
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

	#buildUpgradePath(x, y, active) {
		for(let i = 0; i < active.length; i++) {
			this.#buildUpgradePathBox(x, y + i * 40, active[i]);

		}
	}

	#buildUpgradePathBox(x, y, active) {
		const fillColor = active ? 0x228822 : 0x003300;
		const borderColor = active ? 0x99ff99 : 0x229922;
		this.#graphics.fillStyle(fillColor, 1);
		this.#graphics.fillRoundedRect(x, y, 20, 20, 5);
		this.#graphics.lineStyle(2, borderColor, 1);
		this.#graphics.strokeRoundedRect(x, y, 20, 20, 5);
	}

	#fireBullet(time) {
		// Get a bullet from the pool or create a new one
		const bullet = this.#bullets.getFirstDead();
		if (bullet) {
			const offsetX = Math.cos(this.#gun.rotation - Math.PI/2) * 30;
			const offsetY = Math.sin(this.#gun.rotation - Math.PI/2) * 30;
			// bullet.setScale(.25);
			bullet.enableBody(true, this.#gun.x + offsetX, this.#gun.y + offsetY, true, true);
			const bulletSpeed = 1200;
			const velocityX = Math.cos(this.#gun.rotation - Math.PI/2) * bulletSpeed;
			const velocityY = Math.sin(this.#gun.rotation - Math.PI/2) * bulletSpeed;
			bullet.body.setVelocity(velocityX, velocityY);
			this.#bulletLastFired = time;
		}
	}

	#moveGunner() {
		// Set initial position on the left side of the screen
		if (Math.random() < .5) {
			this.#gunner.x = Math.random() < .5 ? -100 : this.cameras.main.width + 100; // Start slightly off-screen
			this.#gunner.y = Math.floor(Math.random() * this.cameras.main.height); // Start slightly off-screen
		} else {
			this.#gunner.x = Math.floor(Math.random() * this.cameras.main.width); // Start slightly off-screen
			this.#gunner.y = Math.random() < .5 ? -100 : this.cameras.main.height + 100; // Start slightly off-screen
		}

		// Make sure the gunner is visible
		this.#gunner.setVisible(true);

		// Create a tween to move from left to right
		this.tweens.add({
			targets: this.#gunner,
			x: this.#tower.x,
			y: this.#tower.y,
			duration: 5000, // Time in milliseconds to complete the animation
			ease: 'Linear', // Linear motion for consistent speed
			onComplete: () => {
				// Optional: if you want to repeat the animation or do something when done
				this.#gunner.setVisible(false);
				this.#dropPrize();
			}
		});
	}

	#dropPrize() {
		this.#prize.x = Math.floor(Math.random() * this.cameras.main.width - 500) + 400;
		this.#prize.y = Math.floor(Math.random() * this.cameras.main.height - 50) + 10;
		this.#prize.setVisible(true);
		this.#moveRunner();
	}

	#moveRunner() {
		this.#runner.x = this.#tower.x;
		this.#runner.y = this.#tower.y;
		this.#runner.setVisible(true);
		// Make sure the gunner is visible

		// Create a tween to move from left to right
		this.tweens.add({
			targets: this.#runner,
			x: this.#prize.x,
			y: this.#prize.y,
			duration: 2000, // Time in milliseconds to complete the animation
			ease: 'Linear', // Linear motion for consistent speed
			onComplete: () => {
				// Optional: if you want to repeat the animation or do something when done
				this.#prize.setVisible(false);
				this.tweens.add({
					targets: this.#runner,
					x: this.#tower.x,
					y: this.#tower.y,
					duration: 2000, // Time in milliseconds to complete the animation
					ease: 'Linear', // Linear motion for consistent speed
					onComplete: () => {
						// Optional: if you want to repeat the animation or do something when done
						this.#runner.setVisible(false);
						setTimeout(this.#moveGunner.bind(this),500);
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