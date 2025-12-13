import ElfMissile from "./ElfMIssile.js";
import Ship from "./Ship.js";

export default class Elfship extends Ship {

	static Preload(scene) {
		scene.load.image('elfship', '/img/elf-ship.png');
		scene.load.image('elf-missile', '/img/lightning.png');
	}

	static NAME = 'ElfShip';
	static SPEED = 150;

	constructor(args = {}) {
		args.shipName = Elfship.NAME;
		args.speed = Elfship.SPEED;
		args.spriteName = 'elfship';
		args.missileConstructor = ElfMissile;
		super(args);
	}

}