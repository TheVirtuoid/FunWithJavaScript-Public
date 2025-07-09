import Position from "../Position.js";
import Star from "./Star.js";
import Crown from "./Crown.js";
import Coins from "./Coins.js";

export default class Statistics {
	static NAME = 'statistics';
	static BACKGROUND_COLOR = 0x402000;
	static DEFAULT_FONT = 'Tiny5';
	static WIDTH = 360;
	static PADDING = 10;

	#scene;
	#image;
	#money;
	#moneyText;

	#starImage;
	#crownImage;
	#moneyImage;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
		this.#money = 0;
		this.#starImage = new Star({ scene: this.#scene});
		this.#crownImage = new Crown({ scene: this.#scene});
		this.#moneyImage = new Coins({ scene: this.#scene});
	}

	get scene() {
		return this.#scene;
	}

	get image() {
		return this.#image;
	}

	create() {
		const graphics = this.#scene.add.graphics();
		this.#image = graphics;

		this.#buildMainPanel();
		this.#starImage.create();
		this.#crownImage.create();
		this.#moneyImage.create();

		graphics.lineStyle(2, 0xffffff,1);
		graphics.strokeRoundedRect(20, 100, 330, 240, 20);

		this.#addExtraLargeText(new Position(20, 20), 'Hold That Tower!', '#ffffff');
		this.#addLargeText(new Position(20, 60), 'Wave: 6', '#88ff88');

		this.#addMainText(new Position(30,110), 'Hitpoints: 20');
		this.#addMainText(new Position(30,135), 'Max Hitpoints: 30');
		this.#addMainText(new Position(30,160), 'Gun Damage: 6');

		this.#buildEnemiesPanel();

		this.#buildPrizesPanel();

		this.#scene.add.text(20, 350, 'Upgrades', {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '26px',
			fill: '#88ff88'
		});

		this.#scene.add.text(30, 390, 'Guns', {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.#scene.add.text(100, 390, 'Tower', {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.#scene.add.text(190, 390, 'Wall', {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '20px',
			fill: '#ffffff'
		});

		this.#scene.add.text(250, 390, 'Runners', {
			fontFamily: Statistics.DEFAULT_FONT,
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

		this.#image.fillStyle(0x000000);
		this.#image.fillRect(0, 0, 4, 4);
	}

	#buildUpgradePath(x, y, active) {
		for(let i = 0; i < active.length; i++) {
			this.#buildUpgradePathBox(x, y + i * 40, active[i]);
		}
	}

	#buildUpgradePathBox(x, y, active) {
		const fillColor = active ? 0x228822 : 0x003300;
		const borderColor = active ? 0x99ff99 : 0x229922;
		this.image.fillStyle(fillColor, 1);
		this.image.fillRoundedRect(x, y, 20, 20, 5);
		this.image.lineStyle(2, borderColor, 1);
		this.image.strokeRoundedRect(x, y, 20, 20, 5);
	}

	#buildMainPanel() {
		// main panel
		const graphics = this.#image;
		graphics.fillStyle(Statistics.BACKGROUND_COLOR, 1);
		graphics.fillRoundedRect(Statistics.PADDING, Statistics.PADDING, Statistics.WIDTH, this.#scene.cameras.main.height - Statistics.PADDING * 2, Statistics.PADDING * 2);
		graphics.lineStyle(4, 0x000000,1 );
		graphics.strokeRoundedRect(Statistics.PADDING, Statistics.PADDING, Statistics.WIDTH, this.#scene.cameras.main.height - Statistics.PADDING, Statistics.PADDING);
	}

	#buildPrizesPanel() {
		this.#addPrizeText(new Position(30,300), 'Prizes:');
		this.#moneyImage.setPosition(new Position(170, 270));
		this.#moneyText = this.#addPrizeText(new Position(150,300), this.#money);
		this.#starImage.setPosition(new Position(240, 270));
		this.#addPrizeText(new Position(230,300), '44');
		this.#crownImage.setPosition(new Position(310,270), this.#money);
		this.#addPrizeText(new Position(310,300), '7');
	}

	#buildEnemiesPanel() {
		const color = '#ff4444';
		this.#addStandardText(new Position(30, 185), 'Enemies Destroyed: 38', color);
		this.#addSmallText(new Position(40, 203), 'Gunners: 11', color);
		this.#addSmallText(new Position(40, 220), 'Runners: 23', color);
		this.#addSmallText(new Position(40, 235), 'Bosses: 4', color);
	}

	#addMainText(position, text) {
		return this.#addStandardText(position, text, '#ffffff');
	}

	#addPrizeText(position, text) {
		return this.#addStandardText(position, text, '#4444ff');
	}

	#addStandardText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '24px',
			fill: color
		});
	}

	#addSmallText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '20px',
			fill: color
		});
	}

	#addLargeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '30px',
			fill: color
		});
	}

	#addExtraLargeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '36px',
			fill: color
		});
	}
	updateMoney(amount) {
		this.#money += amount;
		if (this.#moneyText) {
			this.#moneyText.setText(this.#money.toString());
		}
	}
}