import KrampusMissile from "./KrampusMIssile.js";
import GameEvent from "./GameEvent.js";

export default class Krampus {

	#scene;
	#sprite;
	#radius;
	#displayRadius;
	#missiles;
	#gun;
	#gunAngle;
	#asteroidMissileCollider

	static Preload(scene) {
		scene.load.image('krampus', '/img/krampus.png');
		KrampusMissile.Preload(scene);
	}

	constructor(scene, x, y) {
		this.#scene = scene;

		this.#sprite = this.#scene.physics.add.sprite(x, y, 'krampus');
		this.#sprite.setOrigin(0.5);
		this.#sprite.setScale(0.075);
		this.#radius = this.#sprite.width / 2;
		this.#sprite.body.setCircle(this.#radius, this.#sprite.width * .5 - this.#radius, this.#sprite.height * .5 - this.#radius);
		this.#sprite.body.setCollideWorldBounds(true);
		// Enable damping so drag is applied smoothly
		this.#sprite.body.setDamping(false);
		// Drag acts like friction; tune these values
		this.#sprite.body.setDrag(100, 100);
		// Limit maximum speed
		this.#sprite.body.setMaxVelocity(400, 400);
		this.#displayRadius = this.#sprite.displayWidth / 2;
		this.#missiles = this.#scene.physics.add.group({
			classType: KrampusMissile,
			maxSize: 30,
			runChildUpdate: true
		});
		// Krampus Gun
		this.#gun = this.#scene.add.graphics();
		this.#gun.fillStyle(0xffffff, 1); // color, alpha
		this.#gun.fillCircle(0, 0, 4);
		this.#gunAngle = (-Math.PI / 2) + ((12 * 2 * Math.PI) / 12);
		const gunPosition = this.#getGunPositionOnCircle();
		this.#gun.setPosition(gunPosition.x, gunPosition.y);
	}

	setAcceleration(x, y) {
		this.#sprite.body?.setAcceleration(x, y);
	}

	addAsteroidCollider(asteroids, event) {
		this.#asteroidMissileCollider = this.#scene.physics.add.collider(
			this.#missiles,
			asteroids,
			this.#onMissileHitAsteroid,
			null,
			this.#scene
		);
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

	/*destroy() {
		this.#asteroidMissileCollider?.destroy();
		this.#missiles.destroy(true);
		this.#gun.destroy();
		this.#sprite.destroy();
	}*/

	#onMissileHitAsteroid(missile, asteroid) {
		GameEvent.Emit(GameEvent.KRAMPUS_MISSILE_HIT_ASTEROID, missile, asteroid);
	}

	fireMissile() {
		const gunPos = this.#getGunPositionOnCircle();
		const missile = this.#missiles.get(gunPos.x, gunPos.y, 'krampus-missile');
		if (missile) {
			missile.fire(gunPos.x, gunPos.y, this.#gunAngle);
		}
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
				this.#gunAngle += direction * .03;
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


}