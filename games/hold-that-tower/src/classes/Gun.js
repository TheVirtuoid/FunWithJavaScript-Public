export default class Gun {
	static DEFAULT_FIRING_RATE = 1000; // milliseconds

	static POSITION_ONE = Symbol('position-one');
	static POSITION_TWO = Symbol('position-two');
	static POSITION_THREE = Symbol('position-three');
	static POSITION_FOUR = Symbol('position-four');
	static POSITION_FIVE = Symbol('position-five');
	static POSITION_SIX = Symbol('position-six');
	static POSITION_SEVEN = Symbol('position-seven');
	static POSITION_EIGHT = Symbol('position-eight');
	static POSITION_NINE = Symbol('position-nine');
	static POSITION_TEN = Symbol('position-ten');
	static POSITION_ELEVEN = Symbol('position-eleven');
	static POSITION_TWELVE = Symbol('position-twelve');

	static MINIMUM_FIRING_RATE = 10; // milliseconds

	#position;
	#ammo;
	#firingRate;

	constructor(args = {}) {
		const { ammo, position, firingRate } = args;
		if (!ammo) {
			throw new Error('Ammo must be specified');
		}
		if (!position) {
			throw new Error('Position must be specified');
		}
		this.#ammo = args.ammo;
		this.#position = args.position;
		this.#firingRate = firingRate || Gun.DEFAULT_FIRING_RATE;
	}

	get ammo() {
		return this.#ammo;
	}

	get position() {
		return this.#position;
	}

	get firingRate() {
		return this.#firingRate;
	}

	adjustFiringRate(amount) {
		this.#firingRate += amount;
		this.#firingRate = Math.max(Gun.MINIMUM_FIRING_RATE, this.#firingRate);
	}
}