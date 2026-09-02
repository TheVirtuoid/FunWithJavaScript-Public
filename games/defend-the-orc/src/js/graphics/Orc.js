import {RIGHT, IDLE, RUN, WALK, LEFT, UP, DOWN, ATTACK} from "../../../defend-the-orc.config.js";
import StateEvent from "../structures/StateEvent.js";
import Phaser from "phaser";

export default class {
	#scene;
	#image;

	#lastDirection;
	#lastMovement;
	#lastStickX;
	#lastStickY;

	#state;
	#oldState;

	#who;

	constructor(args = {}) {
		const { scene, who } = args;
		this.#scene = scene;
		this.#who = who;
		this.#image = this.#scene.physics.add.sprite();
		this.#image.setScale(2);
		this.#oldState = new StateEvent({ movement: IDLE, direction: RIGHT });
		this.#lastDirection = RIGHT;
		this.#lastMovement = IDLE;
		this.#lastStickX = null;
		this.#lastStickY = null;
	}

	setPosition(x, y) {
		this.#image.x = x;
		this.#image.y = y;
	}

	setState(state) {
		// console.log(state);
		const movement = state.movement ? state.movement : this.#lastMovement;
		const direction = state.direction ? state.direction : this.#lastDirection;
		const stickX = state.stickX ? state.stickX : this.#lastStickX;
		const stickY = state.stickY ? state.stickY : this.#lastStickY;
		this.#image.play(`${this.#who.description}-${movement.description}-${direction.description}-anim`);
		this.#lastDirection = direction;
		this.#lastMovement = movement;
		this.#lastStickX = stickX;
		this.#lastStickY = stickY;
		if (state.attacking) {
			const attack = movement === WALK || movement === RUN ? `${movement.description}-${ATTACK.description}` : ATTACK.description;
			this.#image.play(`${this.#who.description}-${attack}-${direction.description}-anim`);
		}
		const speed = (movement === IDLE ? 0 : 200) * (movement === RUN ? 2 : 1);
		const velocity = new Phaser.Math.Vector2(stickX ?? 0, stickY ?? 0);
		if (velocity.lengthSq() > 0) {
			velocity.normalize().scale(speed);
		}
		this.#image.setVelocity(velocity.x, velocity.y);
	}
}