import Missile from "./Missile.js";

export default class ElfMissile extends Missile {

	static Preload(scene) {
		scene.load.image('elf-missile', '../img/lightning.png');
	}

	constructor(args = {}) {
		args.spriteName = 'elf-missile';
		super(args);
	}

}