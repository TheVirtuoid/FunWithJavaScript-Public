import Bullet from "./Bullet.js";
import AmmoType from "../../enums/AmmoType.js";
import Ammo from "../Ammo.js";

export default class BulletGroup {
	#bullets;
	#bulletLastFired;
	#scene;
	#group;
	#damage;

	constructor(args = {}) {
		const { scene, damage } = args;
		this.#scene = scene;
		this.#damage = damage;
	}

	get group() {
		return this.#group;
	}

	get bulletLastFired() {
		return this.#bulletLastFired;
	}

	create() {
		this.#group = this.#scene.physics.add.group({
			name: 'bullets',
			enabled: false
		});
		this.#bullets = [];
		for (let i = 0; i < 120; i++) {
			const bullet = new Ammo({ scene: this.#scene, type: AmmoType.BULLET, damage: this.#damage });
			bullet.image.active = false;
			this.#bullets.push(bullet)
		}
		this.#group = this.#scene.physics.add.group();
		this.#bullets.forEach((bullet) => {
			this.#group.add(bullet.image);
		});
		this.#bulletLastFired = 0;
	}

	removeOffScreenBullets() {
		if (this.#group) {
			this.#group.getChildren().forEach(bullet => {
				// Remove bullets that are off-screen
				if (bullet.active && (
					bullet.x < 0 ||
					bullet.x > this.#scene.cameras.main.width ||
					bullet.y < 0 ||
					bullet.y > this.#scene.cameras.main.height
				)) {
					bullet.setActive(false).setVisible(false);
				}
			});
		}
	}

	/*fireBullet(gun, time) {
		// Get a bullet from the pool or create a new one
		const bullet = this.#group.getFirstDead();
		if (bullet) {
			const offsetX = Math.cos(gun.rotation - Math.PI/2) * 30;
			const offsetY = Math.sin(gun.rotation - Math.PI/2) * 30;
			bullet.enableBody(true, gun.x + offsetX, gun.y + offsetY, true, true);
			const bulletSpeed = 1200;
			const velocityX = Math.cos(gun.rotation - Math.PI/2) * bulletSpeed;
			const velocityY = Math.sin(gun.rotation - Math.PI/2) * bulletSpeed;
			bullet.body.setVelocity(velocityX, velocityY);
			this.#bulletLastFired = time;
		}
	}*/

	fireBullet(guns, time) {
		// Get a bullet from the pool or create a new one
		guns.forEach((gun) => {
			const bullet = this.#group.getFirstDead();
			if (bullet) {
				const offsetX = Math.cos(gun.rotation - Math.PI/2) * 30;
				const offsetY = Math.sin(gun.rotation - Math.PI/2) * 30;
				bullet.enableBody(true, gun.x + offsetX, gun.y + offsetY, true, true);
				const bulletSpeed = 1200;
				const velocityX = Math.cos(gun.rotation - Math.PI/2) * bulletSpeed;
				const velocityY = Math.sin(gun.rotation - Math.PI/2) * bulletSpeed;
				bullet.body.setVelocity(velocityX, velocityY);
				this.#bulletLastFired = time;
			}
		});
	}

	findBulletFromImage(image) {
		return this.#bullets.find(bullet => bullet.image === image);
	}

	destroy() {
		this.#bullets.forEach(bullet => {
			bullet.setVisible(false);
			bullet.destroy();
		});
	}

}