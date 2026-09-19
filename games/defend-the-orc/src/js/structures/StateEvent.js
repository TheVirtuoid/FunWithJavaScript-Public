export default class StateEvent {
	#direction;
	#movement;
	#attacking;
	#running;
	#attackInProcess;
	#x;
	#y;

	constructor(args = {}) {
		const {
			attacking = null,
			direction = null,
			movement = null,
			running = false,
			attackInProcess = false,
			x = 0,
			y = 0
		} = args;
		this.#direction = direction;
		this.#movement = movement;
		this.#attacking = attacking;
		this.#running = running;
		this.#attackInProcess = attackInProcess;
		this.#x = x;
		this.#y = y;
	}

	get direction() {
		return this.#direction;
	}

	get movement() {
		return this.#movement;
	}

	get attacking() {
		return this.#attacking;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get running() {
		return this.#running;
	}

	get attackInProcess() {
		return this.#attackInProcess;
	}

	setAttackInProcess() {
		this.#attackInProcess = true;
	}

	clearAttackInProcess() {
		this.#attackInProcess = false;
	}

	diff(oldEvent) {
		return new StateEvent({
			attacking: this.#attacking !== oldEvent.attacking ? this.#attacking : null,
			direction: this.#direction !== oldEvent.direction ? this.#direction : null,
			movement: this.#movement !== oldEvent.movement ? this.#movement : null,
			running: this.#running,
			attackInProcess: this.#attackInProcess !== oldEvent.attackInProcess ? this.#attackInProcess: null,
			x: this.#x,
			y: this.#y
		});
	}

	toObject() {
		return {
			attacking: this.#attacking,
			direction: this.#direction,
			movement: this.#movement,
			running: this.#running,
			attackInProcess: this.#attackInProcess,
			x: this.#x,
			y: this.#y
		}
	}

	toString() {
		return JSON.stringify(this.toObject());
	}

}