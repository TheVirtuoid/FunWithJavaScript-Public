import Phaser from "phaser";
import {DOWN, GARZ, LEFT, orcAnimation, orcs, RIGHT, STILL, UP} from "../../../defend-the-orc.config.js";

export default class Battleground extends Phaser.Scene {
	#pad;
	#orcDirection;

	constructor() {
		super({
			key: 'battleground'
		});
	}

	preload() {
		const orc = GARZ;
		const spriteConfig = {
			frameWidth: 64,
			frameHeight: 64,
			columnsPerRow: 6,
		};
		orcAnimation.forEach((anim, key) => {
			this.load.spritesheet(`${orc.description}-${key.description}`, `${orcs.get(orc).path}/${anim.img}`, spriteConfig);
		});
	}

	create() {
		const image = this.physics.add.sprite(600, 400, `garz-walk`);
		image.setScale(2);
		this.anims.create({
			key: `garz-walk-anim`,
			frames: this.anims.generateFrameNumbers(`garz-walk`, {
				start: 6,
				end: 11
			}),
			frameRate: 8,
			repeat: -1
		});
		image.play(`garz-walk-anim`);
		this.input.gamepad.once('connected', (pad) => {
			this.#pad = pad;
		});
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

			if (Math.abs(moveX) > 0.1 || Math.abs(moveY) > 0.1) {
				const spin = Math.abs(moveX) - Math.abs(moveY);
				this.#orcDirection = spin > 0 ? moveX > 0 ? RIGHT : LEFT : moveY > 0 ? DOWN : UP;
			} else {
				this.#orcDirection = STILL;
			}
		}
	}
}
