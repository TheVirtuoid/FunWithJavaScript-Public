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

	getButtonUpgradeHealth() {
		return this.#ui.getButtonUpgradeHealth();
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

	setGunDamage(damage) {
		this.#ui.setGunDamage(damage);
	}

	setRunnerSpeed(speed) {
		this.#ui.setRunnerSpeed(speed);
	}

	setGunRotationSpeed(speed) {
		this.#ui.setGunRotationSpeed(speed);
	}

	setUpgradeButtonHealthLimit(oldLimit, newLimit) {
		this.#ui.setUpgradeButtonHealthLimit(oldLimit, newLimit);
	}

	setUpgradeButtonAddRunner(oldLimit, newLimit) {
		this.#ui.setUpgradeButtonAddRunner(oldLimit, newLimit);
	}

	setUpgradeButtonAddGun(oldLimit, newLimit) {
		this.#ui.setUpgradeButtonAddGun(oldLimit, newLimit);
	}

	update(prize) {
		this.#ui.update(prize);
	}
}