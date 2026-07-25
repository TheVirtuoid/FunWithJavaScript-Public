export default class Wacker {
	#power;
	#speed;
	#range;
	#durability;
	#weedsCut;

	#position;

	constructor() {
		this.#power = 1;
		this.#speed = 1;
		this.#range = 1;
		this.#durability = 10;
		this.#weedsCut = new Map();
		this.#position = null;
	}

	get power() {
		return this.#power;
	}

	get speed() {
		return this.#speed;
	}

	get range() {
		return this.#range;
	}

	get durability() {
		return this.#durability;
	}

	get weedsCut() {
		return [...this.#weedsCut.entries()].map(([type, count]) => ({ type, count }));
	}

	get position() {
		return { x: this.#position.x, y: this.#position.y };
	}

	adjustPower(amount) {
		this.#power += amount;
	}

	adjustSpeed(amount) {
		this.#speed += amount;
	}

	adjustRange(amount) {
		this.#range += amount;
	}

	adjustDurability(amount) {
		this.#durability += amount;
	}

	addWeed(weed) {
		const count = this.#weedsCut.get(weed.type) || 0;
		this.#weedsCut.set(weed.type, count + 1);
	}

	setPosition(position) {
		this.#position = position;
	}
}