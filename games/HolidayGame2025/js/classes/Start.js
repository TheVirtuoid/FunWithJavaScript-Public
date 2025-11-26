export default class Start {
	#pressStart;
	#gameOver;
	#startingLevelText;
	#scene;

	#gameOverConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '40px',
		fixedWidth: 450,
		fill: '#dd2211',
		wordWrap: { width: 450, useAdvancedWrap: true },
		align: 'center'
	}

	#startingLevelConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '18px',
		fixedWidth: 400,
		fill: '#12dd45',
		wordWrap: { width: 400, useAdvancedWrap: true },
		align: 'center'
	}

	constructor(scene) {
		this.#scene = scene;
		this.#gameOver = this.#scene.add.text(10, 400, 'GAME OVER', this.#gameOverConfig);
		this.#pressStart = this.#scene.add.text(10, 500, 'Press "Y" on controller to start', {...this.#gameOverConfig, fontSize: '20px', fill: '#1234dd' });
		this.#startingLevelText = this.#scene.add.text(10, 250, '', this.#startingLevelConfig );
		this.#startingLevelText.setVisible(false);

		this.show();
	}

	show() {
		this.#gameOver.setVisible(true);
		this.#pressStart.setVisible(true);
	}

	hide() {
		this.#gameOver.setVisible(false);
		this.#pressStart.setVisible(false);
	}

	startCountdown() {
		this.#startingLevelText.setVisible(true);
		let countDown = 5;
		const countdownTimer = setInterval(() => {
			this.#startingLevelText.setText(`Starting Level in ${countDown}`);
			countDown--;
			if (countDown <= 0) {
				clearInterval(countdownTimer);
				this.#startingLevelText.setVisible(false);
			}
		});
	}

}