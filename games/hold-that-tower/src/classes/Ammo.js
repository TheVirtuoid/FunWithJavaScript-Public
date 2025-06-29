export default class Ammo {

	static AMMO_TYPE_BULLET = Symbol('ammo-bullet');
	static AMMO_TYPE_MISSILE = Symbol('ammo-missile');
	static AMMO_TYPE_ENEMY = Symbol('ammo-enemy');

	static AMMO_TYPES = [
		Ammo.AMMO_TYPE_BULLET,
		Ammo.AMMO_TYPE_MISSILE,
		Ammo.AMMO_TYPE_ENEMY
	];

	#damage;
	#type;

	constructor(args = {}) {
		const { damage, type } = args;
		if (typeof damage !== 'number') {
			throw new Error('Damage must be specified');
		}
		if (!Ammo.AMMO_TYPES.includes(type)) {
			throw new Error('Invalid ammo type');
		}
		this.#damage = damage;
		this.#type = type;
	}

	get damage() {
		return this.#damage;
	}

	get type() {
		return this.#type;
	}

	adjustDamage(amount) {
		this.#damage += amount;
		this.#damage = Math.max(0, this.#damage);
	}
}