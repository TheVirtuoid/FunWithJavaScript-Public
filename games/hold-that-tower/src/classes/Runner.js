export default class Runner {
	static DEFAULT_SPEED = 1000;
	static DEFAULT_HIT_POINTS = 10;

	#speed;
	#hitPoints;
	#prize;
	#position;

	constructor(args = {}) {
		const { position } = args;
		this.#hitPoints = Runner.DEFAULT_HIT_POINTS;
		this.#speed = Runner.DEFAULT_SPEED;
		this.#prize = null;
		this.#position = position;
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

	takeDamage(amount) {
		this.#hitPoints = Math.max(0, this.#hitPoints - amount);
	}

	upgradeSpeed(amount) {
		this.#speed += amount;
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