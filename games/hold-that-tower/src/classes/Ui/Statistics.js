import Position from "../Position.js";
import Star from "./Star.js";
import Crown from "./Crown.js";
import Coins from "./Coins.js";
import GameEvent from "../../enums/GameEvent.js";

export default class Statistics {
	static NAME = 'statistics';
	static BACKGROUND_COLOR = 0x402000;
	static DEFAULT_FONT = 'Tiny5';
	static WIDTH = 360;
	static PADDING = 10;
	static INNER_WIDTH = Statistics.WIDTH - Statistics.PADDING * 2;
	static LINE_GAP = 8;

	#graphics;

	#scene;
	#image;

	#coins;
	#coinsText;

	#stars;
	#starsText;

	#crowns;
	#crownsText;

	#healthText;

	#maxHealthText;

	#runnerSpeedText;
	#runnerSpeed;

	#gunDamage;
	#gunDamageText;
	#gunRotationSpeedText;
	#gunRotationSpeed;

	#starImage;
	#crownImage;
	#coinsImage;

	#updateButtonHealth;
	#updateButtonRunner;
	#updateButtonGun;

	#waveText;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
		this.#coins = 0;
		this.#stars = 0;
		this.#crowns = 0;
		this.#starImage = new Star({ scene: this.#scene});
		this.#crownImage = new Crown({ scene: this.#scene});
		this.#coinsImage = new Coins({ scene: this.#scene});
	}

	get scene() {
		return this.#scene;
	}

	get image() {
		return this.#image;
	}

	setWave(wave) {
		this.#waveText.setText(wave);
	}

	setHealth(health) {
		const text = health.toFixed(0);
		this.#healthText.setText(health);
	}

	setMaxHealth(maxHealth) {
		const text = maxHealth.toFixed(0);
		this.#maxHealthText.setText(maxHealth);
	}

	setGunDamage(damage) {
		const text = damage.toFixed(2);
		this.#gunDamageText.setText(text);
	}

	setRunnerSpeed(speed) {
		const text = speed.toFixed(0);
		this.#runnerSpeedText.setText(text);
	}

	setGunRotationSpeed(speed) {
		const text = speed.toFixed(3);
		this.#gunRotationSpeedText.setText(text);
	}

	create() {
		this.#image = this.#scene.add.graphics();
		let x, y;

		({ x, y } = this.#buildMainPanel());
		({ x, y } = this.#buildHeaderPanel(x, y));
		({ x, y } = this.#buildStatsPanel(x, y));
		({ x, y } = this.#buildUpgradesPanel(x, y));
	}

	#buildMainPanel() {
		const graphics = this.#image;
		graphics.fillStyle(Statistics.BACKGROUND_COLOR, 1);
		graphics.fillRoundedRect(Statistics.PADDING, Statistics.PADDING, Statistics.WIDTH, this.#scene.cameras.main.height - Statistics.PADDING * 2, Statistics.PADDING * 2);
		graphics.lineStyle(4, 0x000000,1 );
		graphics.strokeRoundedRect(Statistics.PADDING, Statistics.PADDING, Statistics.WIDTH, this.#scene.cameras.main.height - Statistics.PADDING * 2, Statistics.PADDING * 2);
		return { x: Statistics.PADDING * 2, y: Statistics.PADDING * 2 };
	}

	#buildHeaderPanel(x, y) {
		let text = this.#addExtraLargeText(new Position(x, y), 'Hold That Tower!', '#ffffff');
		y += text.height;
		this.#addLargeText(new Position(x, y), 'Wave:', '#88ff88');
		this.#waveText = this.#addLargeText(new Position(x + text.width + 20, y), '0', '#88ff88');
		return { x, y: y + this.#waveText.height };
	}

	#buildStatsPanel(x, y) {
		const graphics = this.#image;
		const insetX = x + Statistics.PADDING;
		const statsX = x + insetX + 200;

		y+= Statistics.PADDING * 2;
		const startingY = y;
		this.#starImage.create();
		this.#crownImage.create();
		this.#coinsImage.create();

		y += Statistics.PADDING * 2;
		this.#addMainText(new Position(insetX, y), 'Health');
		this.#healthText = this.#addMainText(new Position(statsX, y), 0);

		y += this.#healthText.height;
		this.#addMainText(new Position(insetX,y), 'Max Health');
		this.#maxHealthText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#maxHealthText.height;
		this.#addMainText(new Position(insetX,y), 'Gun Damage');
		this.#gunDamageText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#gunDamageText.height;
		this.#addMainText(new Position(insetX,y), 'Runner Speed');
		this.#runnerSpeedText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#runnerSpeedText.height;
		this.#addMainText(new Position(insetX,y), 'Gun Rotation Speed');
		this.#gunRotationSpeedText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#gunRotationSpeedText.height;

		({ x, y } = this.#buildPrizesPanel(x, y));

		graphics.lineStyle(2, 0xffffff,1);
		y += Statistics.PADDING;
		graphics.strokeRoundedRect(x, startingY, Statistics.INNER_WIDTH, y - startingY, 20);

		return { x, y }
	}

	#buildPrizesPanel(x, y) {
		y += Statistics.PADDING * 4;
		const insetX = x + Statistics.PADDING;
		this.#coinsImage.setPosition(new Position(insetX + 150, y));
		this.#starImage.setPosition(new Position(insetX + 220, y));
		this.#crownImage.setPosition(new Position(insetX + 290, y));

		y += (this.#coinsImage.image.height * this.#coinsImage.image.scale) - Statistics.PADDING * 2 + 5;
		this.#addPrizeText(new Position(insetX, y), 'Prizes:');
		this.#coinsText = this.#addPrizeText(new Position(insetX + 130,y), 0);
		this.#starsText = this.#addPrizeText(new Position(insetX + 200,y), 0);
		this.#crownsText = this.#addPrizeText(new Position(insetX + 270,y), 0);

		y += this.#coinsText.height;
		return { x, y }
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

	#addSmallText(position, text, color = '#ffffff') {
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

	update(prize) {
		if (prize instanceof Coins) {
			this.#coins += prize.amount;
			this.#coinsText.setText(this.#coins);
		} else if (prize instanceof Star) {
			this.#stars += prize.amount;
			this.#starsText.setText(this.#stars);
		} else if (prize instanceof Crown) {
			this.#crowns += prize.amount;
			this.#crownsText.setText(this.#crowns);
		}
	}

	updateButtons(coins, stars, crowns) {
		if (this.#updateButtonHealth) {
			this.#updateButtonHealth.setText(coins.toString());
			this.#updateButtonHealth.setDisabled(coins < 500);
		}
		if (this.#updateButtonRunner) {
			this.#updateButtonRunner.setText(stars.toString());
			this.#updateButtonRunner.setDisabled(stars < 100);
		}
		if (this.#updateButtonGun) {
			this.#updateButtonGun.setText(crowns.toString());
			this.#updateButtonGun.setDisabled(crowns < 50);
		}

	}

	#buildUpgradesPanel(x, y) {
		const smallStarImage = new Star({ scene: this.#scene, scale: 0.05 });
		// this.#crownImage = new Crown({ scene: this.#scene});
		// this.#coinsImage = new Coins({ scene: this.#scene});
		smallStarImage.create();

		y += Statistics.PADDING;
		let text = this.#addLargeText(new Position(x, y), 'Upgrades:', '#88ff88');
		y += text.height;

		text = this.#addMainText(new Position(x,y), 'Restore Full Health');
		smallStarImage.setPosition(new Position(x + text.width + Statistics.PADDING * 2, y + 10));
		this.#updateButtonHealth = this.#buildButton(new Position(Statistics.INNER_WIDTH - 20 * 3, y ), 500, false);

		console.log(this.#updateButtonHealth);
		// this.#gunDamageText = this.#addMainText(new Position(statsX,y), 0);


		return { x, y }
	}

	#updateButton(buttonToChange, amount, disabled = true) {
		const { text, button } = buttonToChange;
		const backgroundColor = disabled ? 0x660000 : 0x006600;
		const foregroundColor = disabled ? '#666666' : '#ffffff';
		const lineColor = disabled ? 0x666666 : 0xffffff;
		button.setFillStyle(0x006600, 1);
		button.setStrokeStyle(2, 0xffffff);
		text.setFill('#ffffff');
		button.setInteractive();
	}

	#buildButton(position, value, disabled = true) {
		const buttonText = value.toString();
		const { x, y } = position;
		const newButton = this.#updateButton()
		const backgroundColor = disabled ? 0x660000 : 0x006600;
		const foregroundColor = disabled ? '#666666' : '#ffffff';
		const lineColor = disabled ? 0x666666 : 0xffffff;
		const gx = x - Statistics.PADDING;
		const gy = y - Statistics.PADDING / 2;
		const gw = 20 * buttonText.length;
		const gh = 20 + Statistics.PADDING;
		const r = 4;

		const button = this.#scene.add.rectangle(
			gx,
			gy,
			gw,
			gh,
			backgroundColor,
			1
		)
			.setOrigin(0, 0)
			.setStrokeStyle(2, lineColor);
		if (!disabled) {
			button.setInteractive();
		}
		const text = this.#addSmallText(position, value, foregroundColor);
		// rectangle.setFillStyle(0xffff00, 1);


		/*const selectedText = this.#addStandardFreeText(new Position(bx + 19, by + 5), 'Select', '#ffffff');
		selectedBox.setInteractive();
		selectedBox.once('pointerdown', () => {
			GameEvent.Emit(GameEvent.CARD_SELECTED, this.#parent);
		});
		this.#parts.push(card, title, description, icon, selectedBox, selectedText);*/


		return { text, button };
	}
}