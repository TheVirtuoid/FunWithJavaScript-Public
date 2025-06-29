import Gun from "./Gun.js";

export default class EnemyGun extends Gun {
	static DEFAULT_TARGET_PRIORITY = 0.5;

	#targetPriority = EnemyGun.DEFAULT_TARGET_PRIORITY;

	constructor(args = {}) {
		super(args);
		const { targetPriority = EnemyGun.DEFAULT_TARGET_PRIORITY } = args;
		this.#targetPriority = this.#fixTargetPriority(targetPriority);
	}

	get targetPriority() {
		return this.#targetPriority;
	}

	adjustTargetPriority(amount) {
		this.#targetPriority += amount;
		this.#targetPriority = this.#fixTargetPriority(this.#targetPriority);
	}

	#fixTargetPriority(targetPriority) {
		return Math.max(0, Math.min(1, targetPriority));
	}

}