export default class ElfMissile extends Phaser.Physics.Arcade.Sprite {
	#scene;

	static Preload(scene) {
		scene.load.image('elf-missile', '../img/lightning.png');
	}

	constructor(scene, x, y, angle) {
		super(scene, x, y, 'elf-missile');
		this.#scene = scene;
		this.setOrigin(0.5);
		this.setScale(0.05);
		this.setRotation(angle);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body.setAllowGravity(false);
	}

	fire(x, y, angle, speed = 600) {
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