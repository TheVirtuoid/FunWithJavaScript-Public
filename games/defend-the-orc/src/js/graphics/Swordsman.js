import UIEntity from "./UIEntity.js";

export default class SwordsmanUi extends UIEntity {
	constructor(args) {
		super(args);
	}

	setCollisionState(orc) {
		return this.scene.physics.overlap(this.image, orc.image);
	}
}
