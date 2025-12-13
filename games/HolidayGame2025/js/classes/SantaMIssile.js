import Missile from "./Missile.js";

export default class SantaMissile extends Missile {

	static Preload(scene) {
		scene.load.image('santa-missile', '../img/red-lightning.png');
	}

	constructor(args = {}) {
		args.spriteName = 'santa-missile';
		args.speed = 600;
		super(args);
	}

}