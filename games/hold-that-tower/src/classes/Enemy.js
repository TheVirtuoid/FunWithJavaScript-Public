import EnemyUi from './Ui/Enemy.js';

export default class Enemy {
	#type;
	#position;
	#hitPoints;
	#damage;
	#speed;
	#ui;

	constructor(args = {}) {
		const { type, position, hitPoints, damage, speed, scene } = args;
		this.#type = type; // Type of the enemy (e.g., gunner, boss, runner)
		this.#position = position; // Position object containing x and y coordinates
		this.#hitPoints = hitPoints;
		this.#damage = damage; // Damage the enemy can inflict
		this.#speed = speed; // Speed of the enemy
		this.#ui = new EnemyUi({ scene });
	}

	get position() {
		return this.#position;
	}
	get type() {
		return this.#type;
	}
	get hitPoints() {
		return this.#hitPoints;
	}
	get damage() {
		return this.#damage;
	}
	get speed() {
		return this.#speed;
	}
	get ui() {
		return this.#ui;
	}

	takeDamage(amount) {
		if (amount < 0) {
			throw new Error('Damage amount must be a positive number');
		}
		this.#hitPoints -= amount;
		if (this.#hitPoints < 0) {
			this.#hitPoints = 0; // Ensure hit points do not go below zero
		}
	}

}