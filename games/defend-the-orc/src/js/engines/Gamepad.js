import {
	CONTROLLER_ATTACK,
	CONTROLLER_RUN,
	IDLE,
	DOWN,
	LEFT,
	RIGHT,
	UP, WALK, RUN
} from "../../../defend-the-orc.config.js";
import StateEvent from "../structures/StateEvent.js";

export default class Gamepad {

	static CHARACTER_ACTION = Symbol('character-action');
	static CHARACTER_MOVEMENT = Symbol('character-movement');

	#scene;
	#pad;
	#oldEvent;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
	}

	create() {
		this.#oldEvent = new StateEvent();
	}

	update() {
		if (!this.#pad && this.#scene.input.gamepad.total > 0) {
			this.#pad = this.#scene.input.gamepad.getAll()[0];
		}
		if (this.#pad) {
			const { x, y } = this.#pad.leftStick;
			const running = !!this.#pad.buttons[CONTROLLER_RUN].value;
			const attacking = !!this.#pad.buttons[CONTROLLER_ATTACK].value;
			const movement = (Math.abs(x) + Math.abs(y)) / 2 <= 0.1 ? IDLE : running ? RUN : WALK;
			let direction = null;
			if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
				const spin = Math.abs(x) - Math.abs(y);
				direction = spin > 0 ? x > 0 ? RIGHT : LEFT : y > 0 ? DOWN : UP;
			}
			const gamepadEvent = new StateEvent({ attacking, direction, movement, running, x, y });
			const eventToSend = gamepadEvent.diff(this.#oldEvent);
			if (eventToSend.direction !== null || eventToSend.movement !== null || eventToSend.attacking !== null) {
				this.#scene.events.emit(Gamepad.CHARACTER_ACTION.description, eventToSend);
			}
			this.#scene.events.emit(Gamepad.CHARACTER_MOVEMENT.description, eventToSend);
			this.#oldEvent = gamepadEvent;
		}
	}
}