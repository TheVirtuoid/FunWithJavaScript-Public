import Phaser from "phaser";
import {
	CONTROLLER_ATTACK,
	CONTROLLER_RUN,
	DOWN,
	GARZ,
	LEFT,
	orcAnimation,
	orcs,
	RIGHT,
	STILL,
	UP
} from "../../../defend-the-orc.config.js";
import Orc from "../engines/Orc.js";
import Gamepad from "../engines/Gamepad.js";

export default class Battleground extends Phaser.Scene {
	#pad;
	#orcDirection;
	#image;
	#x;
	#y;

	#orcSprinting;
	#orcIdleDirection;
	#orcAttacking;
	#orcAnimationRunning;

	#orc;
	#gamepad;

	constructor() {
		super({
			key: 'battleground'
		});
	}

	preload() {
		orcs.forEach((orcData, orc) => {
			orcAnimation.forEach((anim, key) => {
				this.load.spritesheet(`${orc.description}-${key.description}`, `${orcData.path}/${anim.img}`, anim.config);
			});
		});
	}

	create() {
		orcs.forEach((orcData, orc) => {
			orcAnimation.forEach((anim, key) => {
				anim.frames.forEach((frameData, direction) => {
					// console.log(`key: ${orc.description}-${key.description}-${direction.description}-anim`);
					this.anims.create({
						key: `${orc.description}-${key.description}-${direction.description}-anim`,
						frames: this.anims.generateFrameNumbers(`${orc.description}-${key.description}`, {
							start: frameData.start,
							end: frameData.end
						}),
						frameRate: anim.frameRate,
						repeat: anim.repeat
					});
				});
			});
		});
		this.#orc = new Orc({ who: GARZ, scene: this });
		this.#orc.setPosition(600, 400);
		// this.#orc.setState(Orc.STATE_IDLE);

		this.#gamepad = new Gamepad({ scene: this });
		this.#gamepad.create();

		this.events.on(Gamepad.CHARACTER_ACTION.description, (event) => {
			this.#orc.setState(event);
		})

		/*this.#x = 600;
		this.#y = 400;
		this.#image = this.physics.add.sprite(this.#x, this.#y);
		this.#image.setScale(2);
		this.#image.play(`garz-idle-right-anim`);
		this.input.gamepad.once('connected', (pad) => {
			this.#pad = pad;
		});
		this.#orcDirection = RIGHT;
		this.#orcSprinting = false;
		this.#orcAttacking = false;
		this.#orcAnimationRunning = false;
		this.#orcIdleDirection = RIGHT;*/
	}

	update() {
		this.#gamepad.update();
	}

/*
	update() {
		if (!this.#pad && this.input.gamepad.total > 0) {
			this.#pad = this.input.gamepad.getPad(0);
		}

		if (this.#pad) {
			this.#orcSprinting = !!this.#pad.buttons[CONTROLLER_RUN].value;
			if (this.#pad.buttons[CONTROLLER_ATTACK].value && !this.#orcAttacking) {
				if (!this.#orcAnimationRunning) {
					this.#image.once('animationcomplete', () => {
						console.log('done');
						this.#orcAttacking = false;
						this.#orcAnimationRunning = false;
					});
					console.log(`garz-attack-${this.#orcIdleDirection.description}-anim`);
					this.#image.play(`garz-attack-${this.#orcIdleDirection.description}-anim`);
					console.log('here');
					this.#orcAnimationRunning = true;
					this.#orcAttacking = true;
				}
			} else if (!this.#pad.buttons[CONTROLLER_ATTACK].value) {
				this.#orcAttacking = false;
			}
			let moveX = this.#pad.leftStick.x;
			let moveY = this.#pad.leftStick.y;

			let direction = STILL;
			if (Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1) {
				const spin = Math.abs(moveX) - Math.abs(moveY);
				direction = spin > 0 ? moveX > 0 ? RIGHT : LEFT : moveY > 0 ? DOWN : UP;
			}
			if (direction === STILL) {
				if (direction !== this.#orcDirection) {
					this.#image.play(`garz-idle-${this.#orcIdleDirection.description}-anim`);
				}
			} else if (direction !== this.#orcDirection) {
				console.log(direction, this.#orcDirection);
				this.#image.play(`garz-${this.#orcSprinting ? 'run' : 'walk'}-${direction.description}-anim`);
				this.#orcIdleDirection = direction;
			}
			this.#orcDirection = direction;
			const multiplier = this.#orcSprinting ? 1.5 : 1;
			this.#image.setVelocity(moveX * 200 * multiplier, moveY * 200 * multiplier);
		}
	}
*/
}
