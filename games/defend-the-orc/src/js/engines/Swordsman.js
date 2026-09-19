import {ATTACK, DOWN, IDLE, LEFT, RIGHT, swordsmen, UP, WALK} from "../../../defend-the-orc.config.js";
import SwordsmanUi from './../graphics/Swordsman.js';
import StateEvent from "../structures/StateEvent.js";
import Phaser from "phaser";
import {Vector3} from "@babylonjs/core";

export default class Swordsman {

	#who;
	#scene;
	#ui;
	#x;
	#y;
	#state;

	#engaged;
	#attacking;

	constructor(args = {}) {
		const { who, scene } = args;
		if (![...swordsmen.keys()].includes(who)) {
			throw new Error(`Invalid swordsman: ${who}`);
		}
		this.#scene = scene;
		this.#who = who;
		this.#ui = new SwordsmanUi({ scene, who, scale: 2, walkSpeed: 150 });
		this.#engaged = false;
		this.#attacking = false;
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

	get engaged() {
		return this.#engaged;
	}

	get imagePosition() {
		return { x: this.#ui.imagePosition.x, y: this.#ui.imagePosition.y };
	}

	get image() {
		return this.#ui.image;
	}

	setEngaged(value) {
		this.#engaged = value;
	}

	setPosition(x, y) {
		this.#x = x;
		this.#y = y;
		this.#ui.setPosition(this.x, this.y);
	}

	setState(state) {
		this.#state = state;
		this.#ui.setState(state);
	}

	updateVelocity(state, orc) {
		const x = orc.imagePosition.x - this.imagePosition.x;
		const y = orc.imagePosition.y - this.imagePosition.y;
		const newState = new StateEvent( { ...state, x, y } );
		this.#ui.updateVelocity(newState);
	}

	updateState(orc) {
		let x = orc.imagePosition.x - this.imagePosition.x;
		let y = orc.imagePosition.y - this.imagePosition.y;
		const spin = Math.abs(x) - Math.abs(y);
		const direction = spin > 0 ? x > 0 ? RIGHT : LEFT : y > 0 ? DOWN : UP;
		let attacking = false;
		let movement = WALK;
		// move swordsman
		const collisionState = this.#ui.setCollisionState(orc);
		// console.log(collisionState, this.#attacking, this.state?.attacking);
		if (collisionState && !this.#attacking && !this.state?.attacking) {
			x = 0;
			y = 0;
			movement = WALK;
			attacking = true;
			this.#attacking = true;
		}
		const vector = new Phaser.Math.Vector2(x, y).normalize();
		const velocityState = new StateEvent({ x: vector.x, y: vector.y, movement });
		this.#ui.updateVelocity(velocityState);

		// change direction
		if (this.state) {
			if (direction !== this.state.direction || movement !== this.state.movement || attacking !== this.state.attacking) {
				// console.log('-set', attacking, direction, movement, x, y, this.state.movement);
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