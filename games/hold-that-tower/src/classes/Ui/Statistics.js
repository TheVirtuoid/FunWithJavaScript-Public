import Position from "../Position.js";
import Star from "./Star.js";
import Crown from "./Crown.js";
import Coins from "./Coins.js";
import GameEvent from "../../enums/GameEvent.js";
import UpgradeButton from "./UpgradeButton.js";
import ButtonUpgradeType from "../../enums/ButtonUpgradeType.js";

export default class Statistics {
	static NAME = 'statistics';
	static BACKGROUND_COLOR = 0x402000;
	// static DEFAULT_FONT = 'Tiny5';
	static DEFAULT_FONT = '"Press Start 2P"';
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

	#buttonUpgradeHealth;
	#buttonAddRunner;
	#buttonAddGun;
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

	setUpgradeButtonHealthLimit(oldLimit, newLimit) {
		this.#buttonUpgradeHealth.setLimit(newLimit);
		this.#coins -= oldLimit;
		this.#coinsText.setText(this.#coins);
	}

	setUpgradeButtonAddRunner(oldLimit, newLimit) {
		this.#buttonAddRunner.setLimit(newLimit);
		this.#stars -= oldLimit;
		this.#starsText.setText(this.#stars);
	}

	setUpgradeButtonAddGun(oldLimit, newLimit) {
		this.#buttonAddGun.setLimit(newLimit);
		this.#crowns -= oldLimit;
		this.#crownsText.setText(this.#crowns);
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
		y += text.height + 10;
		text = this.#addLargeText(new Position(x, y), 'Wave:', '#88ff88');
		this.#waveText = this.#addLargeText(new Position(x + text.width + 20, y), '0', '#88ff88');
		return { x, y: y + this.#waveText.height };
	}

	#buildStatsPanel(x, y) {
		const graphics = this.#image;
		const insetX = x + Statistics.PADDING;
		const statsX = x + insetX + 230;
		const linePadding = 6;

		y+= Statistics.PADDING * 2;
		const startingY = y;
		this.#starImage.create();
		this.#crownImage.create();
		this.#coinsImage.create();

		y += Statistics.PADDING;
		this.#addMainText(new Position(insetX, y), 'Health');
		this.#healthText = this.#addMainText(new Position(statsX, y), 0);

		y += this.#healthText.height + linePadding;
		this.#addMainText(new Position(insetX,y), 'Max Health');
		this.#maxHealthText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#maxHealthText.height + linePadding;
		this.#addMainText(new Position(insetX,y), 'Gun Damage');
		this.#gunDamageText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#gunDamageText.height + linePadding;
		this.#addMainText(new Position(insetX,y), 'Runner Speed');
		this.#runnerSpeedText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#runnerSpeedText.height + linePadding;
		this.#addMainText(new Position(insetX,y), 'Gun Rot Speed');
		this.#gunRotationSpeedText = this.#addMainText(new Position(statsX,y), 0);

		y += this.#gunRotationSpeedText.height + linePadding;

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

	#buildUpgradesPanel(x, y) {
		const smallStarImage = new Star({ scene: this.#scene, scale: 0.03 });
		const smallCoinImage = new Coins({ scene: this.#scene, scale: 0.03 });
		const smallCrownImage = new Crown({ scene: this.#scene, scale: 0.03 });
		smallStarImage.create();
		smallCoinImage.create();
		smallCrownImage.create();

		y += Statistics.PADDING;
		let text = this.#addLargeText(new Position(x, y), 'Upgrades:', '#88ff88');
		y += text.height + 10;

		text = this.#addMainText(new Position(x,y), 'Restore Health');
		smallCoinImage.setPosition(new Position(x + text.width + Statistics.PADDING * 2, y + 10));
		this.#buttonUpgradeHealth = new UpgradeButton({ position: new Position(Statistics.INNER_WIDTH - 20 * 3, y ),
			scene: this.#scene,
			limit: 100,
			type: ButtonUpgradeType.HEALTH
		});
		this.#buttonUpgradeHealth.setPosition(new Position(Statistics.INNER_WIDTH - Statistics.PADDING, y ));

		y += text.height + 20;
		text = this.#addMainText(new Position(x,y), 'Add Runner');
		smallStarImage.setPosition(new Position(x + text.width + Statistics.PADDING * 2, y + 10));
		this.#buttonAddRunner = new UpgradeButton({ position: new Position(Statistics.INNER_WIDTH - 20 * 3, y ),
			scene: this.#scene,
			limit: 10,
			type: ButtonUpgradeType.RUNNER
		});
		this.#buttonAddRunner.setPosition(new Position(Statistics.INNER_WIDTH - Statistics.PADDING, y ));

		y += text.height + 20;
		text = this.#addMainText(new Position(x,y), 'Add Gun');
		smallCrownImage.setPosition(new Position(x + text.width + Statistics.PADDING * 2, y + 10));
		this.#buttonAddGun = new UpgradeButton({ position: new Position(Statistics.INNER_WIDTH - 20 * 3, y ),
			scene: this.#scene,
			limit: 1,
			type: ButtonUpgradeType.GUN
		});
		this.#buttonAddGun.setPosition(new Position(Statistics.INNER_WIDTH - Statistics.PADDING, y ));

		y += text.height + 20;
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
			fontSize: '14px',
			fill: color
		});
	}

	#addSmallText(position, text, color = '#ffffff') {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '10px',
			fill: color
		});
	}

	#addLargeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '18px',
			fill: color
		});
	}

	#addExtraLargeText(position, text, color) {
		return this.#scene.add.text(position.x, position.y, text, {
			fontFamily: Statistics.DEFAULT_FONT,
			fontSize: '20px',
			fill: color
		});
	}

	update(prize) {
		if (prize instanceof Coins) {
			this.#coins += prize.amount;
			this.#coinsText.setText(this.#coins);
			this.#buttonUpgradeHealth.update(this.#coins);
		} else if (prize instanceof Star) {
			this.#stars += prize.amount;
			this.#starsText.setText(this.#stars);
			this.#buttonAddRunner.update(this.#stars);
		} else if (prize instanceof Crown) {
			this.#crowns += prize.amount;
			this.#crownsText.setText(this.#crowns);
			this.#buttonAddGun.update(this.#crowns);
		}
	}

}