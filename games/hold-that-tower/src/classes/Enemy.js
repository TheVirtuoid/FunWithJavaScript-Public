import EnemyUi from './Ui/Enemy.js';
import Position from "./Position.js";

export default class Enemy {
	#type;
	#position;
	#hitPoints;
	#damage;
	#speed;
	#ui;
	#prize;
	#maxHitPoints;
	#name;

	constructor(args = {}) {
		const { type, position, hitPoints, damage, speed, scene, prize, name } = args;
		this.#type = type; // Type of the enemy (e.g., gunner, boss, runner)
		this.#position = position; // Position object containing x and y coordinates
		this.#hitPoints = hitPoints;
		this.#maxHitPoints = hitPoints;
		this.#damage = damage; // Damage the enemy can inflict
		this.#speed = speed; // Speed of the enemy
		this.#ui = new EnemyUi({ scene, type, name });
		this.#ui.create({ visible: false });
		this.#prize = prize;
		this.#name = name;
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
	get prize() {
		return this.#prize;
	}
	get image() {
		return this.#ui.image;
	}
	get name() {
		return this.#name;
	}

	takeDamage(amount) {
		if (amount < 0) {
			throw new Error('Damage amount must be a positive number');
		}
		this.#hitPoints -= amount;
		if (this.#hitPoints < 0) {
			this.#hitPoints = 0; // Ensure hit points do not go below zero
		}
		this.#ui.updateHealthBar(this.#hitPoints, this.#maxHitPoints);
		return this.#hitPoints;
	}

	setPosition(position) {
		if (!(position instanceof Position)) {
			throw new Error('Position must be an instance of Position class');
		}
		this.#position = position;
		this.#ui.setPosition(position);
	}

	setVisible(visible) {
		if (typeof visible !== 'boolean') {
			throw new Error('Visible must be a boolean value');
		}
		this.#ui.setVisible(visible);
	}

	destroy() {
		this.#ui.destroy();
	}

	updateHealthBarPosition(x, y) {
		this.#ui.updateHealthBarPosition(x, y);
	}

}