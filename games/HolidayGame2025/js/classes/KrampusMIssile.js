import Missile from "./MIssile.js";

export default class KrampusMissile extends Missile {
	#sprite

	static Preload(scene) {
		scene.load.image('krampus-missile', '../img/coal.png');
	}

	constructor(scene, x, y, angle) {
		super(scene, x, y, 'krampus-missile');
	}

}