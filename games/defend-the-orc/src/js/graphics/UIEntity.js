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

	#animationUpdateHandle;

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
		this.#animationUpdateHandle = this.#animationUpdate.bind(this);
		this.setState(this.#lastState);
	}

	get scale() {
		return this.#scale;
	}

	get image() {
		return this.#image;
	}

	get scene() {
		return this.#scene;
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

	// NOTE: Any overrides MUST call super.animationComplete() so that proper event cleanup can occur
	animationComplete() {
		this.#image.off('animationupdate', this.#animationUpdateHandle);
	}

	checkForHit() {}

	// state documentation
	//		runnning (boolean) - if the RUNNING button is pressed
	//		direction (enum) - the direction entity is facing
	//		moving (enum) - WALK, RUN or IDLE
	//		attacking (boolean) - if the ATTACK button is pressed
	//		attckInProcess (boolean) - if there is an attack swing underway

	setState(state) {
		const movement = state.movement ? state.movement : this.#lastState.movement;
		const direction = state.direction ? state.direction : this.#lastState.direction;
		const attackInProcess = state.attackInProcess ? state.attackInProcess : this.#lastState.attackInProcess;
		const x = state.x ? state.x : this.#lastState.x;
		const y = state.y ? state.y : this.#lastState.y;
		if (!this.#lastState.attackInProcess) {
			this.#image.play(`${this.#who.description}-${movement.description}-${direction.description}-anim`);
			this.#lastState = new StateEvent({ movement, direction, attackInProcess, x, y });
			if (state.attacking) {
				this.#lastState.setAttackInProcess();
				let attack = movement === WALK || movement === RUN ? `${movement.description}-${ATTACK.description}` : ATTACK.description;
				if (!this.#scene.anims.exists(attack)) {
					attack = ATTACK.description;
				}
				this.#image.play(`${this.#who.description}-${attack}-${direction.description}-anim`);
				this.#image.once(`animationcomplete`, (event) => {
					this.#image.play(`${this.#who.description}-${movement.description}-${direction.description}-anim`);
					this.#lastState = new StateEvent({ movement, direction, attackInProcess: false, x, y });
					this.animationComplete();
				});
				this.#image.on('animationupdate', this.#animationUpdateHandle);
			}
		}
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

	#animationUpdate(animation, frame) {
		const totalFrames = animation.frames.length;
		const halfwayPoint = Math.floor(totalFrames / 2);
		if (frame.index === halfwayPoint) {
			this.checkForHit();
		}
	}

}