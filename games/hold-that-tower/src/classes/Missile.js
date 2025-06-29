export default class Missile {

	#direction;
	#position;
	#ammo;

	constructor(args = {}) {
		const { ammo, position, direction } = args;
		if (!position) {
			throw new Error('Position is required');
		}
		if (!direction) {
			throw new Error('Direction must be a number');
		}
		if (!ammo) {
			throw new Error('Ammo is required');
		}
		this.#ammo = ammo;
		this.#position = position;
		this.#direction = direction;
	}

	get ammoSpeed() {
		return this.#ammo.speed;
	}

	get ammoDamage() {
		return this.#ammo.damage;
	}

	get ammoType() {
		return this.#ammo.type;
	}

	get position() {
		return this.#position;
	}

	get direction() {
		return this.#direction;
	}

	move() {}
}