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
	#currentBonus;

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
		this.#scene.add.text(20, 150, 'Score:', this.#textConfig);
		this.#scoreText = this.#scene.add.text(20, 150, this.score, this.#valueConfig );
		this.#scene.add.text(20, 190, 'Level:', this.#textConfig);
		this.#levelText = this.#scene.add.text(20, 190, this.level, this.#valueConfig );
		this.#scene.add.text(20, 230, 'Bonus:', this.#textConfig);
		this.#bonusText = this.#scene.add.text(20, 230, this.bonus, this.#valueConfig );

		this.#timeBonusText = this.#scene.add.text(20, 300, 'Time Bonus: ', this.#timeBonusConfig );
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

}