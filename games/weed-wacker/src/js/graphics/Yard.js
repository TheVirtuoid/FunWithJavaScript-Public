import Phaser from 'phaser';
import Weed from "./../engine/Weed.js";

export default class Yard extends Phaser.Scene {

	#cutter;
	#weed;
	#grass;
	#weeds;
	#physicsWeeds;

	#weedList;
	#countdown = 3000;
	#countdownText;

	#timeRemaining = 15000;
	#timesUpText;

	#panel;

	constructor() {
		super({
			key: 'yard'
		});
		this.#weedList = document.querySelector('.weeds ul');
	}

	setPanel(panel) {
		this.#panel = panel;
	}

	newGame(timeRemaining) {
		this.#timeRemaining = timeRemaining;
		/*this.#stats.reset();
		this.#stats.adjustStat('time', this.#timeRemaining);*/
		this.scene.start();
	}

	continue(timeRemaining) {
		this.#timeRemaining = timeRemaining;
		// this.#stats.setStat('time', this.#timeRemaining);
		this.scene.start();
	}

	preload() {
		this.load.image('grass', '/src/img/grass.jpg');
		this.load.image('cutters', '/src/img/cutters.png');
		Weed.WEEDS.forEach(weed => {
			this.load.image(weed.name, weed.image);
		});
	}

	create() {
		this.events.on('weedDestroyed', this.#onWeedDestroyed, this);
		// this.cameras.main.setBackgroundColor('#396a1a');
		const centerX = this.scale.width / 2;
		const centerY = this.scale.height / 2;
		this.#grass = this.add.tileSprite(centerX, centerY, this.scale.width, this.scale.height, 'grass');
		this.#cutter = this.physics.add.image(centerX, centerY, 'cutters');
		this.#cutter.setOrigin(0.5, 0.5);
		this.#cutter.body.setCollideWorldBounds(true);

		this.#weeds = [];

		this.#physicsWeeds = this.physics.add.group();
		for (let i = 0; i < 5; i++) {
			const randomX = Phaser.Math.Between(100, this.scale.width - 100);
			const randomY = Phaser.Math.Between(100, this.scale.height - 100);
			const weed = new Weed({ type: Weed.WEED_SYMBOLS[0], scene: this });
			weed.create(this.#physicsWeeds, randomX, randomY);
			this.#weeds.push(weed);
		}

		// this.#weed = this.physics.add.image(200, 200, 'weed-0');
		this.physics.add.overlap(
			this.#cutter,
			this.#physicsWeeds,
			this.#onCutWeed,
			null,
			this
		);

		this.#countdown = 3000;
		this.#countdownText = this.add.text(centerX, centerY, '0', { fontSize: '400px', fill: '#FF0000', fontFamily: '"Pixelify Sans"', fontStyle: 'bold' });
		this.#countdownText.setOrigin(0.5, 0.5);

		this.#timesUpText = this.add.text(centerX, centerY, `Time's Up!`, { fontSize: '300px', fill: '#882211', fontFamily: '"Pixelify Sans"', fontStyle: 'bold' });
		this.#timesUpText.setOrigin(0.5, 0.5);
		this.#timesUpText.visible = false;
	}

	resize(gameSize, baseSize, displaySize, resolution) {
		const width = gameSize.width;
		const height = gameSize.height;
		this.#grass.setSize(width, height);
		this.#grass.setPosition(width / 2, height / 2);
		this.physics.world.setBounds(0, 0, width, height);
	}

	update(time, delta) {
		if (this.#countdown > 0) {
			this.#processCountdown(delta);
		} else {
			this.#timeRemaining -= delta;
			this.#panel.adjustTime(-delta);
			if (this.#timeRemaining <= 0) {
				this.#timesUpText.visible = true;
				this.scene.pause();
			} else {
				this.#countdownText.visible = false;
				const gamePad = this.input.gamepad.getPad(0);
				if (gamePad) {
					// this is using the Left Analog Stick
					const xAxis = gamePad.axes[0].getValue();
					const yAxis = gamePad.axes[1].getValue();
					this.#cutter.setVelocity(xAxis * 200, yAxis * 200);
				} else {
					this.#cutter.setVelocity(0, 0);
				}
				this.#cutter.angle += 90 * (delta / 200)
			}
		}
	}

	#onCutWeed(cutter, weedSprite) {
		const weed = this.#weeds.find(weed => {
			return weed.sprite === weedSprite;
		});
		weed.adjustToughness(-5);
	}

	#onWeedDestroyed(index) {
		this.game.events.emit('change-weed-count', index, 1);
	}

	#processCountdown(delta) {
		this.#countdown -= delta;
		this.#countdownText.setText(Math.ceil( this.#countdown / 1000));
	}
}