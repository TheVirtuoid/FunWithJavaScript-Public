import Ship from "./Ship.js";
import SantaMissile from "./SantaMIssile.js";

export default class Santa extends Ship {

	static Preload(scene) {
		scene.load.image('santaship', '/img/santa.png');
		scene.load.image('santa-missile', '/img/red-lightning.png');
	}

	static NAME = 'SantaShip';
	static SPEED = 300;

	constructor(args = {}) {
		args.shipName = Santa.NAME;
		args.speed = Santa.SPEED;
		args.spriteName = 'santaship';
		args.missileConstructor = SantaMissile;
		super(args);
	}

}