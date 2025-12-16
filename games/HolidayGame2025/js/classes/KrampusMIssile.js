import Missile from "./Missile.js";

export default class KrampusMissile extends Missile {

	static Preload(scene) {
		scene.load.image('krampus-missile', '../img/coal.png');
	}

	constructor(args) {
		args.spriteName = 'krampus-missile';
		super(args);
	}

}