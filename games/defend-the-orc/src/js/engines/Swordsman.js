import {DOWN, IDLE, LEFT, RIGHT, swordsmen, UP, WALK} from "../../../defend-the-orc.config.js";
import SwordsmanUi from './../graphics/Swordsman.js';
import StateEvent from "../structures/StateEvent.js";

export default class Swordsman {

	static STATE_IDLE = Symbol('state-idle');
	static STATE_ATTACKING = Symbol('state-attacking');
	static STATE_MOVING = Symbol('state-moving');

	static states = [Swordsman.STATE_ATTACKING, Swordsman.STATE_IDLE, Swordsman.STATE_MOVING];

	#who;
	#scene;
	#ui;
	#x;
	#y;
	#state;

	constructor(args = {}) {
		const { who, scene } = args;
		if (![...swordsmen.keys()].includes(who)) {
			throw new Error(`Invalid swordsman: ${who}`);
		}
		this.#scene = scene;
		this.#who = who;
		this.#ui = new SwordsmanUi({ scene, who, scale: 2, walkSpeed: 150 });
	}

	get scene() {
		return this.#scene;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	get state() {
		return this.#state?.toObject();
	}

	get imagePosition() {
		return { x: this.#ui.imagePosition.x, y: this.#ui.imagePosition.y };
	}

	setPosition(x, y) {
		this.#x = x;
		this.#y = y;
		this.#ui.setPosition(this.x, this.y);
	}

	setState(state, directionChange) {
		this.#state = state;
		this.#ui.setState(state, directionChange);
	}

	updateVelocity(state, orcPosition) {
		const stickX = orcPosition.x - this.imagePosition.x;
		const stickY = orcPosition.y - this.imagePosition.y;
		const newState = new StateEvent( { ...state, stickX, stickY, actualX: stickX, actualY: stickY } );
		console.log(stickX, stickY, newState.actualX, newState.actualY);
		this.#ui.updateVelocity(newState);
	}

	updateState(orcPosition) {
		const stickX = orcPosition.x - this.imagePosition.x;
		const stickY = orcPosition.y - this.imagePosition.y;
		const spin = Math.abs(stickX) - Math.abs(stickY);
		const direction = spin > 0 ? stickX > 0 ? RIGHT : LEFT : stickY > 0 ? DOWN : UP;
		const movement = this.state?.movement === IDLE ? WALK : this.state?.movement;
		const attacking = false;
		if (this.state) {
			if (direction !== this.state.direction) {
				const newState = new StateEvent({
					attacking,
					direction,
					stickX,
					stickY,
					movement,
					activeX: stickX,
					activeY: stickY,
				});
				this.setState(newState, direction !== this.state.direction);
			} else if (stickX !== this.state.stickX || stickY !== this.state.stickY) {
				this.#ui.updateVelocity(this.state);
			}
		}

	}
}