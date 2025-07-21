import GunUi from "./Ui/Gun.js";

import GunPosition from "../enums/GunPosition.js";
import Position from "./Position.js";

export default class Gun {
	static DEFAULT_FIRING_RATE = 1000; // milliseconds
	static MINIMUM_FIRING_RATE = 10; // milliseconds

	#placement;
	#ammo;
	#firingRate;
	#ui;

	constructor(args = {}) {
		const { centerX, centerY, radius, ammo, placement = GunPosition.NONE, firingRate = Gun.DEFAULT_FIRING_RATE, scene } = args;
		if (!ammo) {
			throw new Error('Ammo must be specified');
		}
		this.#ammo = ammo;
		this.#placement = placement;
		this.#firingRate = firingRate || Gun.DEFAULT_FIRING_RATE;
		this.#ui = new GunUi({ scene, placement, centerX, centerY, radius });
		this.#ui.create();
	}

	static preload(scene) {
		GunUi.preload(scene);
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
		return this.#ui.position;
	}

	get placement() {
		return this.#placement;
	}

	get firingRate() {
		return this.#firingRate;
	}

	get ui() {
		return this.#ui;
	}

	get rotation() {
		return this.#ui.rotation;
	}

	get x() {
		return this.#ui.x;
	}

	get y() {
		return this.#ui.y;
	}

	get angle() {
		return this.#ui.angle;
	}

	setAngle(angle) {
		this.#ui.setAngle(angle);
	}

	create(args = {}) {
		this.#ui.create(args);
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

	resetPosition() {
		this.#ui.resetPosition();
	}

	setPosition(position) {
		this.#ui.setPosition(position);
	}

	setRotation(rotation) {
		this.#ui.setRotation(rotation);
	}
}