import Ground from "./Ground.js";
import Tower from "./Tower.js";
import Runner from "./Runner.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import Gun from "./Gun.js";
import Coins from "./Coins.js";
import Star from "./Star.js";
import Crown from "./Crown.js";

export default class HoldThatTower extends Phaser.Scene {
	constructor() {
		super({
			key: 'HoldThatTower',
			active: true
		});
	}

	preload() {
		Ground.preload(this);
		Tower.preload(this);
		Runner.preload(this);
		Enemy.preload(this);
		Bullet.preload(this);
		Gun.preload(this);
		Coins.preload(this);
		Star.preload(this);
		Crown.preload(this);	// Load assets here
	}

	create() {
		// Initialize game elements here
	}

	update() {
		// Game logic goes here
	}
}