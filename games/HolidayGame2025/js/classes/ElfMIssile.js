export default class ElfMissile extends Phaser.Physics.Arcade.Sprite {
	#sprite
	#scene;

	static Preload(scene) {
		scene.load.image('elf-missile', '../img/lightning.png');
	}

	constructor(scene, x, y, angle) {
		super(scene, x, y, 'elf-missile');
		this.#scene = scene;
		this.setOrigin(0.5);
		this.setScale(0.05);
	}

	get sprite() {
		return this.#sprite;
	}

	fire(x, y, angle, speed = 600) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);

		// Calculate velocity based on angle
		// The gunAngle in KrampusScene seems to be in radians
		this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);

		// Optional: rotate sprite to match direction
		this.setRotation(angle);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		// Check bounds
		if (!this.scene.physics.world.bounds.contains(this.x, this.y)) {
			this.setActive(false);
			this.setVisible(false);
			// Alternatively: this.destroy(); if you don't want pooling
		}
	}
}