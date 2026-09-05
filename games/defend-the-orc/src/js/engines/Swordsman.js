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

	setState(state, orcPosition) {
		const diffX = orcPosition.x - this.imagePosition.x;
		const diffY = orcPosition.y - this.imagePosition.y;
		const spin = Math.abs(diffX) - Math.abs(diffY);
		const direction = spin > 0 ? diffX > 0 ? RIGHT : LEFT : diffY > 0 ? DOWN : UP;
		const newState = new StateEvent({...state.toObject(), attacking: false, direction, stickX: diffX, stickY: diffY, movement: state.movement === IDLE ? WALK : state.movement });
		this.#state = newState;
		this.#ui.setState(newState);
	}
}