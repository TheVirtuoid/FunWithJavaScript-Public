import Phaser from "phaser";
import {DOWN, GARZ, LEFT, orcAnimation, orcs, RIGHT, STILL, UP} from "../../../defend-the-orc.config.js";

export default class Battleground extends Phaser.Scene {
	#pad;
	#orcDirection;
	#image;
	#x;
	#y;

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
		this.#x = 600;
		this.#y = 400;
		this.#image = this.physics.add.sprite(this.#x, this.#y);
		this.#image.setScale(2);
		this.#image.play(`garz-idle-right-anim`);
		this.input.gamepad.once('connected', (pad) => {
			this.#pad = pad;
		});
		this.#orcDirection = RIGHT;
	}

	update() {
		if (!this.#pad && this.input.gamepad.total > 0) {
			this.#pad = this.input.gamepad.getPad(0);
		}

		if (this.#pad) {
			/*if (this.pad.A) {
				console.log("A button pressed!");
			}*/
			let moveX = this.#pad.leftStick.x;
			let moveY = this.#pad.leftStick.y;

			let direction = STILL;
			if (Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1) {
				const spin = Math.abs(moveX) - Math.abs(moveY);
				direction = spin > 0 ? moveX > 0 ? RIGHT : LEFT : moveY > 0 ? DOWN : UP;
			}
			if (direction === STILL) {
				// this.#image.anims.stop();
				this.#image.play(`garz-idle-${this.#orcDirection.description}-anim`);

			} else if (direction !== this.#orcDirection) {
				this.#image.anims.stop();
				this.#image.play(`garz-walk-${direction.description}-anim`);
				this.#orcDirection = direction;
			}
			if (direction === DOWN) {
				this.#y += 1;
			} else if (direction === LEFT) {
				this.#x -= 1;
			} else if (direction === RIGHT) {
				this.#x += 1;
			} else if (direction === UP) {
				this.#y += -1;
			}
			this.#image.x = this.#x;
			this.#image.y = this.#y;
		}
	}
}
