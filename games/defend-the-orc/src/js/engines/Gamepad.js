import {
	CONTROLLER_ATTACK,
	CONTROLLER_RUN,
	IDLE,
	DOWN,
	LEFT,
	RIGHT,
	STILL,
	UP, WALK, RUN, ATTACK
} from "../../../defend-the-orc.config.js";
import StateEvent from "../structures/StateEvent.js";

export default class Gamepad {

	static CHARACTER_ACTION = Symbol('character-action');

	#scene;
	#pad;
	#oldEvent;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
	}

	create() {
		this.#oldEvent = new StateEvent({ direction: null, movement: null, stickX: null, stickY: null });
	}

	update() {
		if (!this.#pad && this.#scene.input.gamepad.total > 0) {
			this.#pad = this.#scene.input.gamepad.getPad(0);
		}
		if (this.#pad) {
			const { x: moveX, y: moveY } = this.#pad.leftStick;
			const running = !!this.#pad.buttons[CONTROLLER_RUN].value;
			const attacking = !!this.#pad.buttons[CONTROLLER_ATTACK].value;
			const movement = (Math.abs(moveX) + Math.abs(moveY)) / 2 <= 0.1 ? IDLE : running ? RUN : WALK;
			let direction = null;
			if (Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1) {
				const spin = Math.abs(moveX) - Math.abs(moveY);
				direction = spin > 0 ? moveX > 0 ? RIGHT : LEFT : moveY > 0 ? DOWN : UP;
			}
			const gamepadEvent = new StateEvent({ attacking, direction, movement, stickX: moveX, stickY: moveY });
			const eventToSend = gamepadEvent.diff(this.#oldEvent);
			// we don't check the sticks on purpose
			if (eventToSend.direction !== null || eventToSend.movement !== null || eventToSend.attacking !== null) {
				this.#scene.events.emit(Gamepad.CHARACTER_ACTION.description, eventToSend);
			}
			this.#oldEvent = gamepadEvent;
		}
	}
}