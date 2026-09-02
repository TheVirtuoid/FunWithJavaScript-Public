export default class StateEvent {
	#direction;
	#movement;
	#attacking;
	#stickX;
	#stickY;

	constructor(args = {}) {
		const { attacking = null, direction = null, movement = null, stickX = null, stickY = null } = args;
		this.#direction = direction;
		this.#movement = movement;
		this.#stickX = stickX;
		this.#stickY = stickY;
		this.#attacking = attacking;
	}

	get direction() {
		return this.#direction;
	}

	get movement() {
		return this.#movement;
	}

	get stickX() {
		return this.#stickX;
	}

	get stickY() {
		return this.#stickY;
	}

	get attacking() {
		return this.#attacking;
	}

	diff(oldEvent) {
		return new StateEvent({
			attacking: this.#attacking !== oldEvent.attacking ? this.#attacking : null,
			direction: this.#direction !== oldEvent.direction ? this.#direction : null,
			movement: this.#movement !== oldEvent.movement ? this.#movement : null,
			stickX: this.#stickX !== oldEvent.stickX ? this.#stickX : null,
			stickY: this.#stickY !== oldEvent.stickY ? this.#stickY : null,
		});
	}

	toObject() {
		return {
			attacking: this.#attacking,
			direction: this.#direction,
			movement: this.#movement,
			stickX: this.#stickX,
			stickY: this.#stickY,
		}
	}

	toString() {
		return JSON.stringify(this.toObject());
	}
}