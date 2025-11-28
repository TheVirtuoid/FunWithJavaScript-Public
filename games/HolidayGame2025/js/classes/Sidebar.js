import GameEvent from "./GameEvent.js";

export default class Sidebar {
	#score;
	#level;
	#bonus;
	#scene;

	#scoreText;
	#levelText;
	#bonusText;
	#timeBonusText;

	#bonusInterval;

	#startingLevelText;

	#sidebarTitle;
	#sidebarTagline;

	#scoreTitle;
	#levelTitle;
	#bonusTitle;

	#leftInset = 450;

	#gameOver;
	#pressStart;
	#startingCountdownText;


	#textConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '24px',
		fixedWidth: this.#leftInset / 2,
		fill: '#dddddd',
		wordWrap: { width: this.#leftInset / 2, useAdvancedWrap: true },
		align: 'left'
	}

	#valueConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '24px',
		fixedWidth: this.#leftInset / 3 * 2,
		fill: '#dddddd',
		wordWrap: { width: this.#leftInset / 2, useAdvancedWrap: true },
		align: 'right'
	}

	#timeBonusConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '20px',
		fixedWidth: this.#leftInset / 3 * 2,
		fill: '#12dd34',
		wordWrap: { width: this.#leftInset, useAdvancedWrap: true },
		align: 'right'
	}

	#gameOverConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '40px',
		fixedWidth: this.#leftInset,
		fill: '#dd2211',
		wordWrap: { width: this.#leftInset, useAdvancedWrap: true },
		align: 'center'
	}

	#startingLevelConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '18px',
		fixedWidth: this.#leftInset,
		fill: '#12dd45',
		wordWrap: { width: this.#leftInset, useAdvancedWrap: true },
		align: 'center'
	}

	constructor(scene) {
		this.#scene = scene;
		this.reset();
		this.draw();
		this.drawScore();
		this.drawBonusTimer();
		this.drawGameOver();
		this.hideScore();
		this.hideBonusTimer();
	}

	reset() {
		this.#score = 0;
		this.#level = 0;
		this.#bonus = 0;
	}

	get score() {
		return this.#score;
	}

	get level() {
		return this.#level;
	}

	get bonus() {
		return this.#bonus;
	}

	get leftInset() {
		return this.#leftInset;
	}

	incrementScore(amount) {
		this.#score += amount;
		this.#scoreText.setText(this.#score);
	}

	incrementLevel(amount) {
		this.#level += amount;
		this.#levelText.setText(this.#level);
	}

	incrementBonus(amount) {
		this.#bonus += amount;
		this.#bonusText.setText(this.#bonus);
	}

	startBonusTimer() {
		this.#bonus = 30 * this.#level;
		this.#bonusText.setText(this.#bonus);
		this.#bonusInterval = setInterval(() => {
			this.incrementBonus(-this.#level);
			if (this.#bonus <= 0) {
				clearInterval(this.#bonusInterval);
			}
		}, 1000);
	}

	stopBonusTimer() {
		clearInterval(this.#bonusInterval);
		this.incrementScore(this.#bonus);
		this.showBonusTimer();
	}

	showScore() {
		this.#scoreTitle.setVisible(true);
		this.#levelTitle.setVisible(true);
		this.#bonusTitle.setVisible(true);
		this.#scoreText.setVisible(true);
		this.#levelText.setVisible(true);
		this.#bonusText.setVisible(true);
		// this.#timeBonusText.setVisible(true);
	}

	hideScore() {
		this.#scoreTitle.setVisible(false);
		this.#levelTitle.setVisible(false);
		this.#bonusTitle.setVisible(false);
		this.#scoreText.setVisible(false);
		this.#levelText.setVisible(false);
		this.#bonusText.setVisible(false);
		// this.#timeBonusText.setVisible(false);
	}

	drawScore() {
		this.#scoreTitle = this.#scene.add.text(20, 150, 'Score:', this.#textConfig);
		this.#scoreText = this.#scene.add.text(20, 150, this.score, this.#valueConfig );
		this.#levelTitle = this.#scene.add.text(20, 190, 'Level:', this.#textConfig);
		this.#levelText = this.#scene.add.text(20, 190, this.level, this.#valueConfig );
		this.#bonusTitle = this.#scene.add.text(20, 230, 'Bonus:', this.#textConfig);
		this.#bonusText = this.#scene.add.text(20, 230, this.bonus, this.#valueConfig );
		this.#scoreTitle.setDepth(2);
		this.#levelTitle.setDepth(2);
		this.#bonusTitle.setDepth(2);
		this.#scoreText.setDepth(2);
		this.#levelText.setDepth(2);
		this.#bonusText.setDepth(2);
	}

	drawBonusTimer() {
		this.#timeBonusText = this.#scene.add.text(20, 300, `Time Bonus: ${this.#bonus}`, this.#timeBonusConfig );
		this.#timeBonusText.setDepth(2);
	}

	showBonusTimer() {
		this.#timeBonusText.setText(`Time Bonus: ${this.#bonus}`);
		this.#timeBonusText.setVisible(true);
	}

	hideBonusTimer() {
		this.#timeBonusText.setVisible(false);
	}

	draw() {
		const { width: cameraWidth, height: cameraHeight } = this.#scene.cameras.main;
		const sidebar = this.#scene.add.rectangle(0, 0, this.#leftInset, cameraHeight, 0x1a1a2e);
		sidebar.setOrigin(0, 0);
		sidebar.setDepth(1);

		this.#sidebarTitle = this.#scene.add.text(10, 10, 'Krampus-oid', {
			fontFamily: '"Press Start 2P"',
			fontSize: '38px',
			fill: '#bb2222'
		});

		this.#sidebarTagline = this.#scene.add.text(10, 70, 'Help Krampus save Christmas from Santa and his elves!', {
			fontFamily: '"Press Start 2P"',
			fontSize: '14px',
			fixedWidth: 400,
			fill: '#aabbcc',
			wordWrap: { width: 400, useAdvancedWrap: true },
			align: 'center'
		});

		this.#sidebarTitle.setDepth(2);
		this.#sidebarTagline.setDepth(2);
	}

	drawGameOver() {
		this.#gameOver = this.#scene.add.text(10, 400, 'GAME OVER', this.#gameOverConfig);
		this.#pressStart = this.#scene.add.text(10, 500, 'Press "Y" on controller to start', {...this.#gameOverConfig, fontSize: '20px', fill: '#1234dd' });
		this.#startingCountdownText = this.#scene.add.text(5, 250, `Starting Level in 5`, this.#startingLevelConfig );
		this.#gameOver.setDepth(2);
		this.#pressStart.setDepth(2);
		this.#startingCountdownText.setDepth(2);
		this.#startingCountdownText.setVisible(false);
	}

	hideGameOver() {
		this.#gameOver.setVisible(false);
		this.#pressStart.setVisible(false);
	}

	showGameOver() {
		this.#gameOver.setVisible(true);
		this.#pressStart.setVisible(true);
	}

	startCountdown() {
		let countDown = 5;
		this.#startingCountdownText.setText(`Starting Level ${this.level} in ${countDown}`);
		this.#startingCountdownText.setVisible(true);
		const countdownTimer = setInterval(() => {
			countDown--;
			this.#startingCountdownText.setText(`Starting Level ${this.level} in ${countDown}`);
			if (countDown <= 0) {
				clearInterval(countdownTimer);
				this.#startingCountdownText.setVisible(false);
				GameEvent.Emit(GameEvent.LEVEL_STARTED);
			}
		}, 1000);
	}




}