import GunUi from "./Ui/Gun.js";

import GunPosition from "../enums/GunPosition.js";

export default class Gun {
	static DEFAULT_FIRING_RATE = 1000; // milliseconds
	static MINIMUM_FIRING_RATE = 10; // milliseconds

	#position;
	#ammo;
	#firingRate;
	#ui;

	constructor(args = {}) {
		const { ammo, position = GunPosition.NONE, firingRate = Gun.DEFAULT_FIRING_RATE, scene } = args;
		if (!ammo) {
			throw new Error('Ammo must be specified');
		}
		this.#ammo = ammo;
		this.#position = position;
		this.#firingRate = firingRate || Gun.DEFAULT_FIRING_RATE;
		this.#ui = new GunUi({ scene });
	}

	get ammoDamage() {
		return this.#ammo.damage;
	}

	get ammoSpeed() {
		return this.#ammo.speed;
	}

	get ammoType() {
		return this.#ammo.type;
	}

	get position() {
		return this.#position;
	}

	get firingRate() {
		return this.#firingRate;
	}
	get ui() {
		return this.#ui;
	}

	adjustFiringRate(amount) {
		this.#firingRate += amount;
		this.#firingRate = Math.max(Gun.MINIMUM_FIRING_RATE, this.#firingRate);
	}

	adjustAmmoDamage(amount) {
		this.#ammo.adjustDamage(amount);
	}

	adjustAmmoSpeed(amount) {
		this.#ammo.adjustSpeed(amount);
	}

	replaceAmmo(ammo) {
		if (!ammo) {
			throw new Error('Ammo must be specified');
		}
		this.#ammo = ammo;
	}

	setPosition(position) {
		if (!GunPosition.POSITIONS.includes(position)) {
			throw new Error('Invalid gun position');
		}
		if (this.#position !== GunPosition.NONE) {
			throw new Error('Gun position is already set and cannot be changed');
		}
		this.#position = position;
	}
}