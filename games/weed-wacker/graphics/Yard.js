import Phaser from 'phaser';
import Weed from "./Weed.js";

export default class Yard extends Phaser.Scene {

	#cutter;
	#weed;
	#grass;
	#weeds;
	#physicsWeeds;

	constructor() {
		super({
			key: 'yard'
		});
	}

	preload() {
		this.load.image('grass', '../img/grass.jpg');
		this.load.image('cutters', '../img/cutters.png');
		this.load.image('weed-0', '../img/weed-0.png');
	}

	create() {
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
			const weed = new Weed(this);
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
	}

	resize(gameSize, baseSize, displaySize, resolution) {
		const width = gameSize.width;
		const height = gameSize.height;
		this.#grass.setSize(width, height);
		this.#grass.setPosition(width / 2, height / 2);
		this.physics.world.setBounds(0, 0, width, height);
	}

	update(time, delta) {
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

	#onCutWeed(cutter, weedSprite) {
		const weed = this.#weeds.find(weed => {
			// console.log(weed.sprite, weedSprite);
			return weed.sprite === weedSprite;
		});
		weed.updateHitPoints(-5);
	}
}