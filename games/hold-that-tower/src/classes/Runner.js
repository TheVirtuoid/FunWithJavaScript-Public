import RunnerUi from './Ui/Runner.js';

export default class Runner {
	static DEFAULT_SPEED = 200;
	static DEFAULT_HIT_POINTS = 10;

	#speed;
	#hitPoints;
	#prize;
	#position;
	#ui;

	constructor(args = {}) {
		const { position, scene, speed } = args;
		this.#hitPoints = Runner.DEFAULT_HIT_POINTS;
		this.#speed = speed || Runner.DEFAULT_SPEED;
		this.#prize = null;
		this.#position = position;
		this.#ui = new RunnerUi({ scene, visible: false });
		this.#ui.create({ visible: false });
	}

	get speed() {
		return this.#speed;
	}

	get hitPoints() {
		return this.#hitPoints;
	}

	get prize() {
		return this.#prize;
	}

	get position() {
		return this.#position;
	}

	get image() {
		return this.#ui.image;
	}

	setPosition(position) {
		this.#ui.setPosition(position);
	}

	setVisible(visible) {
		this.#ui.setVisible(visible);
	}

	takeDamage(amount) {
		this.#hitPoints = Math.max(0, this.#hitPoints - amount);
	}

	upgradeSpeed(amount) {
		this.#speed += amount;
	}

	setSpeed(speed) {
		this.#speed = speed;
	}

	upgradeHitPoints(amount) {
		this.#hitPoints += amount;
	}

	pickUpPrize(prize) {
		if (this.#prize === null) {
			this.#prize = prize;
		}
	}

	dropPrize() {
		const droppedPrize = this.#prize;
		this.#prize = null;
		return droppedPrize;
	}

}