import StatisticsUi from './ui/Statistics.js';

export default class Statistics {
	#scene;
	#ui;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
		this.#ui = new StatisticsUi({ scene: this.#scene });
	}

	create() {
		this.#ui.create();
	}

	setWave(wave) {
		this.#ui.setWave(wave);
	}

	setHealth(health) {
		this.#ui.setHealth(health);
	}

	setMaxHealth(maxHealth) {
		this.#ui.setMaxHealth(maxHealth);
	}

	update(prize) {
		this.#ui.update(prize);
	}
}