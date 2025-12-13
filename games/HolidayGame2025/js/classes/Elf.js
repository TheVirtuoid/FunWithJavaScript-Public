import ElfMissile from "./ElfMIssile.js";
import Ship from "./Ship.js";

export default class Elf extends Ship {

	static Preload(scene) {
		scene.load.image('elfship', '/img/elf-ship.png');
		scene.load.image('elf-missile', '/img/lightning.png');
	}

	static NAME = 'ElfShip';
	static SPEED = 150;

	constructor(args = {}) {
		args.shipName = Elf.NAME;
		args.speed = Elf.SPEED;
		args.spriteName = 'elfship';
		args.missileConstructor = ElfMissile;
		super(args);
	}

}