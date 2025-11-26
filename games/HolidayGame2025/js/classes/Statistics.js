export default class Statistics {
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

	#st;
	#lt;
	#bt;


	#textConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '24px',
		fixedWidth: 200,
		fill: '#dddddd',
		wordWrap: { width: 200, useAdvancedWrap: true },
		align: 'left'
	}

	#valueConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '24px',
		fixedWidth: 300,
		fill: '#dddddd',
		wordWrap: { width: 200, useAdvancedWrap: true },
		align: 'right'
	}

	#timeBonusConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '28px',
		fixedWidth: 300,
		fill: '#12dd34',
		wordWrap: { width: 400, useAdvancedWrap: true },
		align: 'right'
	}

	constructor(scene) {
		this.#scene = scene;
		this.reset();
		this.#st = this.#scene.add.text(20, 150, 'Score:', this.#textConfig);
		this.#scoreText = this.#scene.add.text(20, 150, this.score, this.#valueConfig );
		this.#lt = this.#scene.add.text(20, 190, 'Level:', this.#textConfig);
		this.#levelText = this.#scene.add.text(20, 190, this.level, this.#valueConfig );
		this.#bt = this.#scene.add.text(20, 230, 'Bonus:', this.#textConfig);
		this.#bonusText = this.#scene.add.text(20, 230, this.bonus, this.#valueConfig );

		this.#timeBonusText = this.#scene.add.text(20, 300, 'Time Bonus: ', this.#timeBonusConfig );

		this.hide();
	}

	reset() {
		this.#score = 0;
		this.#level = 1;
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
	}

	show() {
		this.#st.setVisible(true);
		this.#lt.setVisible(true);
		this.#bt.setVisible(true);
		this.#scoreText.setVisible(true);
		this.#levelText.setVisible(true);
		this.#bonusText.setVisible(true);
		this.#timeBonusText.setVisible(true);
	}

	hide() {
		this.#st.setVisible(false);
		this.#lt.setVisible(false);
		this.#bt.setVisible(false);
		this.#scoreText.setVisible(false);
		this.#levelText.setVisible(false);
		this.#bonusText.setVisible(false);
		this.#timeBonusText.setVisible(false);
	}




}