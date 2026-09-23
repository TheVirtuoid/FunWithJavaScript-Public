import Phaser from "phaser";
import {
	orcAnimation,
	orcs,
	VORG, DAREK, swordsmanAnimation, swordsmen, IDLE
} from "../../../defend-the-orc.config.js";
import Orc from "../engines/Orc.js";
import Gamepad from "../engines/Gamepad.js";
import Swordsman from "../engines/Swordsman.js";
import StateEvent from "../structures/StateEvent.js";

export default class Battleground extends Phaser.Scene {
	#orc;
	#gamepad;

	#swordsman;
	#enemyGroup;
	#orcGroup;

	#enemies;

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
		this.#enemies = [];
		this.#orcGroup = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
			runChildUpdate: true
		});
		this.#enemyGroup = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Sprite,
			runChildUpdate: true
		});
		orcs.forEach((orcData, orc) => {
			orcAnimation.forEach((anim, key) => {
				anim.frames.forEach((frameData, direction) => {
					const keyName = `${orc.description}-${key.description}-${direction.description}`;
					this.anims.create({
						key: `${keyName}-anim`,
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
					const keyName = `${swordsman.description}-${key.description}-${direction.description}`;
					this.anims.create({
						key: `${keyName}-anim`,
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
		this.#orcGroup.add(this.#orc.image);

		this.#swordsman = new Swordsman({ scene: this, who: DAREK });
		this.#swordsman.image.data = this.#swordsman;
		this.#swordsman.setPosition(800, 400);
		this.#enemyGroup.add(this.#swordsman.image);

		this.#enemies.push(this.#swordsman);

		this.#gamepad = new Gamepad({ scene: this });
		this.#gamepad.create();

		this.events.on(Gamepad.CHARACTER_ACTION.description, (event) => {
			this.#orc.setState(event);
			this.#enemies.forEach((enemy) => {
				enemy.updateState(this.#orc);
			});
		});

		this.events.on(Gamepad.CHARACTER_MOVEMENT.description, (event) => {
			this.#orc.updateVelocity(event);
			this.#enemies.forEach((enemy) => {
				enemy.updateVelocity(event, this.#orc);
			});
		});
	}

	update() {
		this.#gamepad.update();
		this.#enemies.forEach((enemy) => enemy.updateState(this.#orc));
	}

}
