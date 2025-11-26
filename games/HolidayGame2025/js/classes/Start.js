export default class Start {
	#button;
	#gameOver;
	#scene;

	#gameOverConfig = {
		fontFamily: '"Press Start 2P"',
		fontSize: '40px',
		fixedWidth: 500,
		fill: '#dd2211',
		wordWrap: { width: 500, useAdvancedWrap: true },
		align: 'center'
	}
	constructor(scene) {
		this.#scene = scene;
		this.#gameOver = this.#scene.add.text(10, 400, 'GAME OVER', this.#gameOverConfig);
	}
}