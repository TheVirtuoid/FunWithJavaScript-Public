import AmmoType from "../enums/AmmoType.js";
import BulletUi from "./Ui/Bullet.js";

export default class Ammo {
	static DEFAULT_SPEED = 1;
	static MINIMUM_SPEED = 1;// Default speed for ammo

	#damage;
	#type;
	#speed;
	#scene;
	#ui;

	constructor(args = {}) {
		const { damage, type, speed = Ammo.DEFAULT_SPEED, scene } = args;
		if (typeof damage !== 'number') {
			throw new Error('Damage must be specified');
		}
		if (!AmmoType.AMMO_TYPES.includes(type)) {
			throw new Error('Invalid ammo type');
		}
		this.#damage = damage;
		this.#type = type;
		this.#speed = Math.max(Ammo.DEFAULT_SPEED, speed);
		this.#scene = scene;
		this.#ui = new BulletUi({ scene: this.#scene, type: this.#type });
		this.#ui.create();
	}

	get damage() {
		return this.#damage;
	}

	get type() {
		return this.#type;
	}

	get speed() {
		return this.#speed;
	}

	get image() {
		return this.#ui.image;
	}

	adjustDamage(amount) {
		this.#damage += amount;
		this.#damage = Math.max(0, this.#damage);
	}

	adjustSpeed(amount) {
		this.#speed += amount;
		this.#speed = Math.max(Ammo.MINIMUM_SPEED, this.#speed);
	}
}