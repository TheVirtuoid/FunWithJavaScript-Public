import {RIGHT, IDLE, RUN, WALK, ATTACK} from "../../../defend-the-orc.config.js";
import StateEvent from "../structures/StateEvent.js";
import Phaser from "phaser";

export default class UIEntity{
	#scene;
	#image;
	#lastState;
	#who;
	#scale;
	#walkSpeed;
	#runMultiplier;

	constructor(args = {}) {
		const { scene, who, scale = 2, walkSpeed = 200, runMultiplier = 2 } = args;
		this.#scene = scene;
		this.#who = who;
		this.#image = this.#scene.physics.add.sprite();
		this.#scale = scale;
		this.#image.setScale(scale);
		this.#lastState = new StateEvent({ movement: IDLE, direction: RIGHT, stickX: null, stickY: null });
		this.#walkSpeed = walkSpeed;
		this.#runMultiplier = runMultiplier;
		this.setState(this.#lastState);
	}

	get scale() {
		return this.#scale;
	}

	get walkSpeed() {
		return this.#walkSpeed;
	}

	get runMultiplier() {
		return this.#runMultiplier;
	}

	get imagePosition() {
		return { x: this.#image.x, y: this.#image.y };
	}

	setPosition(x, y) {
		this.#image.x = x;
		this.#image.y = y;
	}

	setScale(scale) {
		this.#scale = scale;
		this.#image.setScale(scale);
	}

	setWalkSpeed(speed) {
		this.#walkSpeed = speed;
	}

	setRunMultiplier(runMultiplier) {
		this.#runMultiplier = runMultiplier;
	}

	setState(state) {
		const movement = state.movement ? state.movement : this.#lastState.movement;
		const direction = state.direction ? state.direction : this.#lastState.direction;
		const x = state.x ? state.x : this.#lastState.x;
		const y = state.y ? state.y : this.#lastState.y;
		this.#image.play(`${this.#who.description}-${movement.description}-${direction.description}-anim`);
		/*const square = this.#scene.add.rectangle(
			this.#image.x, this.#image.y,
			this.#image.width,
			this.#image.height
		);
		square.setStrokeStyle(1, 0x00ff00, 1.0);
		square.setFillStyle();
		square.setOrigin(.5, .6);*/
		this.#lastState = new StateEvent({ movement, direction, x, y });
		if (state.attacking) {
			let attack = movement === WALK || movement === RUN ? `${movement.description}-${ATTACK.description}` : ATTACK.description;
			if (!this.#scene.anims.exists(attack)) {
				attack = ATTACK.description;
			}
			this.#image.play(`${this.#who.description}-${attack}-${direction.description}-anim`);
		}
		this.updateVelocity(this.#lastState);
	}

	updateVelocity(state) {
		const speed = state.movement === IDLE ? 0 : this.#walkSpeed * (state.running ? this.#runMultiplier : 1);
		const { x, y } = state;
		const velocity = new Phaser.Math.Vector2(x, y);
		if (velocity.lengthSq() > 0) {
			velocity.normalize().scale(speed);
		}
		this.#image.setVelocity(velocity.x, velocity.y);
	}
}