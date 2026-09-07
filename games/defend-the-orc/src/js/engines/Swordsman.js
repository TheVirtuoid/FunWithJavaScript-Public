import { DOWN, LEFT, RIGHT, swordsmen, UP, WALK } from "../../../defend-the-orc.config.js";
import SwordsmanUi from './../graphics/Swordsman.js';
import StateEvent from "../structures/StateEvent.js";
import Phaser from "phaser";

export default class Swordsman {

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
		const x = orcPosition.x - this.imagePosition.x;
		const y = orcPosition.y - this.imagePosition.y;
		const newState = new StateEvent( { ...state, x, y } );
		this.#ui.updateVelocity(newState);
	}

	updateState(orcPosition) {
		const x = orcPosition.x - this.imagePosition.x;
		const y = orcPosition.y - this.imagePosition.y;


		// move swordsman
		const vector = new Phaser.Math.Vector2(x, y).normalize();
		const velocityState = new StateEvent({ x: vector.x, y: vector.y });
		this.#ui.updateVelocity(velocityState);

		const spin = Math.abs(x) - Math.abs(y);
		const direction = spin > 0 ? x > 0 ? RIGHT : LEFT : y > 0 ? DOWN : UP;
		// const movement = this.state?.movement === IDLE ? WALK : this.state?.movement;
		const movement = WALK;
		const attacking = false;
		if (this.state) {
			if (direction !== this.state.direction) {
				const newState = new StateEvent({
					attacking,
					direction,
					movement,
					x,
					y
				});
				this.setState(newState, direction !== this.state.direction);
			}
		}

	}
}