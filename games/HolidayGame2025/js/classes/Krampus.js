import KrampusMissile from "./KrampusMIssile.js";

export default class Krampus {

	#scene;
	#sprite;
	#radius;
	#displayRadius;
	#missiles;
	#gun;
	#gunAngle;
	#missilesPhysicsGroup;

	static Preload(scene) {
		scene.load.image('krampus', '/img/krampus.png');
		KrampusMissile.Preload(scene);
	}

	static NAME = 'Krampus';

	constructor(args = {}) {
		const { scene, x, y, missilesPhysicsGroup } = args;
		this.#scene = scene;

		this.#sprite = this.#scene.physics.add.sprite(x, y, 'krampus');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.075);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.body.setCollideWorldBounds(true);
		this.#displayRadius = this.#sprite.displayWidth / 2;
		// Krampus Gun
		this.#gun = this.#scene.add.graphics();
		this.#gun.fillStyle(0xffffff, 1); // color, alpha
		this.#gun.fillCircle(0, 0, 4);
		this.#gunAngle = (-Math.PI / 2) + ((12 * 2 * Math.PI) / 12);
		const gunPosition = this.#getGunPositionOnCircle();
		this.#gun.setPosition(gunPosition.x, gunPosition.y);
		this.#sprite.name = Krampus.NAME;
		this.#missilesPhysicsGroup = missilesPhysicsGroup;
	}

	setPhysicsAttributes() {
		this.#sprite.body.setDamping(true);
		this.#sprite.body.setDrag(.5, .5);
		this.#sprite.body.setMaxVelocity(400, 400);
	}

	setAcceleration(x, y) {
		this.#sprite.body?.setAcceleration(x, y);
	}

	setInvisible() {
		this.#sprite.setVisible(false);
		this.#gun.setVisible(false);
	}

	setVisible() {
		this.#sprite.setVisible(true);
		this.#gun.setVisible(true);
	}

	setPosition(x, y) {
		this.#sprite.setPosition(x, y);
	}

	fireMissile() {
		const gunPos = this.#getGunPositionOnCircle();
		const missile = new KrampusMissile({ scene: this.#scene, x: this.x, y: this.y });
		this.#missilesPhysicsGroup.add(missile);
		missile.fire({ x: gunPos.x, y: gunPos.y, angle: this.#gunAngle });
	}

	get x() {
		return this.#sprite.x;
	}

	get y() {
		return this.#sprite.y;
	}

	get height() {
		return this.#sprite.height;
	}

	get width() {
		return this.#sprite.width;
	}

	get displayHeight() {
		return this.#sprite.displayHeight;
	}

	get displayWidth() {
		return this.#sprite.displayWidth;
	}

	get radius() {
		return this.#radius;
	}

	get displayRadius() {
		return this.#displayRadius;
	}

	get sprite() {
		return this.#sprite;
	}

	get missiles() {
		return this.#missiles;
	}

	get gunAngle() {
		return this.#gunAngle;
	}

	get name() {
		return this.#sprite.name;
	}

	#getGunPositionOnCircle() {
		return {
			x: this.x + this.displayRadius * Math.cos(this.#gunAngle),
			y: this.y + this.displayRadius * Math.sin(this.#gunAngle)
		};
	}

	processGunRotation(gamepad) {
		if (gamepad?.rightStick) {
			const { x:gunRotation} = gamepad.rightStick;
			if (gunRotation !== 0) {
				const direction = gunRotation > 0 ? 1 : -1;
				this.#gunAngle += direction * .075;
				const gunPosition = this.#getGunPositionOnCircle();
				this.#gun.setPosition(gunPosition.x, gunPosition.y);
			}
		}
	}

	updateGunPosition() {
		this.#gun.setPosition(this.x, this.y - this.displayRadius);
		const gunPosition = this.#getGunPositionOnCircle();
		this.#gun.setPosition(gunPosition.x, gunPosition.y);
	}

	destroy() {
		this.#sprite.destroy();
		this.#gun.destroy();
	}

}