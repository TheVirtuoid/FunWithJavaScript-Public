export default class Missile extends Phaser.Physics.Arcade.Sprite {
	#sprite
	#scene;

	static MISSILE_SPEED = 600;

	constructor(args = {}) {
		const { scene, x, y, spriteName, angle } = args;
		super(scene, x, y, spriteName);
		this.#scene = scene;
		this.setOrigin(0.5);
		this.setScale(0.05);
		this.setRotation(angle);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
	}

	get sprite() {
		return this.#sprite;
	}

	fire(args = {}) {
		const { x, y, angle, speed = Missile.MISSILE_SPEED } = args;
		this.setActive(true);
		this.setVisible(true);
		this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
		this.setRotation(angle);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (!this.scene.physics.world.bounds.contains(this.x, this.y)) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}