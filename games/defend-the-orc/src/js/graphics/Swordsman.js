import UIEntity from "./UIEntity.js";

export default class SwordsmanUi extends UIEntity {

	#parent;

	constructor(args, parent) {
		super(args);
		this.#parent = parent;
	}

	setCollisionState(orc) {
		return this.scene.physics.overlap(this.image, orc.image);
	}

	setState(state) {
		super.setState(state);
	}

	animationComplete() {
		super.animationComplete();
		this.#parent.animationComplete();
	}

	checkForHit() {
		this.#parent.checkForHit();
	}
}
