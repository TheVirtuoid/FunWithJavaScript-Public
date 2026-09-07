import Phaser from "phaser";
import {
	CONTROLLER_ATTACK,
	CONTROLLER_RUN,
	DOWN,
	GARZ,
	THOKK,
	LEFT,
	orcAnimation,
	orcs,
	RIGHT,
	STILL,
	UP, VORG, DAREK, swordsmanAnimation, swordsmen, WALK
} from "../../../defend-the-orc.config.js";
import Orc from "../engines/Orc.js";
import Gamepad from "../engines/Gamepad.js";
import Swordsman from "../engines/Swordsman.js";
import StateEvent from "../structures/StateEvent.js";
import * as Direction from "../../../defend-the-orc.config.js";

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

	#swordsman;

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
		swordsmen.forEach((swordsmanData, swordsman) => {
			swordsmanAnimation.forEach((anim, key) => {
				this.load.spritesheet(`${swordsman.description}-${key.description}`, `${swordsmanData.path}/${anim.img}`, anim.config);
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

		swordsmen.forEach((swordsmanData, swordsman) => {
			swordsmanAnimation.forEach((anim, key) => {
				anim.frames.forEach((frameData, direction) => {
					this.anims.create({
						key: `${swordsman.description}-${key.description}-${direction.description}-anim`,
						frames: this.anims.generateFrameNumbers(`${swordsman.description}-${key.description}`, {
							start: frameData.start,
							end: frameData.end
						}),
						frameRate: anim.frameRate,
						repeat: anim.repeat
					});
				});
			});
		});

		this.#orc = new Orc({ who: VORG, scene: this, runMultiplier: 3 });
		this.#orc.setPosition(600, 400);

		this.#swordsman = new Swordsman({ scene: this, who: DAREK });
		this.#swordsman.setPosition(800, 400);

		this.#gamepad = new Gamepad({ scene: this });
		this.#gamepad.create();

		this.events.on(Gamepad.CHARACTER_ACTION.description, (event) => {
			this.#orc.setState(event);
			this.#swordsman.setState(event, this.#orc.imagePosition);
		});

		this.events.on(Gamepad.CHARACTER_MOVEMENT.description, (event) => {
			this.#orc.updateVelocity(event);
			this.#swordsman.updateVelocity(event, this.#orc.imagePosition);
		});

	}

	update() {
		this.#gamepad.update();
		this.#swordsman.updateState(this.#orc.imagePosition);
	}

}
