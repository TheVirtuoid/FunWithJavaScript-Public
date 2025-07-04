export default class Enemy {
	#type;
	#position;
	#hitPoints;
	#damage;
	#speed;

	constructor(args = {}) {
		const { type, position, hitPoints, damage, speed } = args;
		this.#type = type; // Type of the enemy (e.g., gunner, boss, runner)
		this.#position = position; // Position object containing x and y coordinates
		this.#hitPoints = hitPoints;
		this.#damage = damage; // Damage the enemy can inflict
		this.#speed = speed; // Speed of the enemy

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