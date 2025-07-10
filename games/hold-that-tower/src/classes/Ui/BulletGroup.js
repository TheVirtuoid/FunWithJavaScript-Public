export default class BulletGroup {
	#bullets;
	#bulletLastFired;
	#scene;

	constructor(args = {}) {
		const { scene } = args;
		this.#scene = scene;
	}

	get group() {
		return this.#bullets;
	}

	get bulletLastFired() {
		return this.#bulletLastFired;
	}

	create() {
		this.#bullets = this.#scene.physics.add.group({
			name: 'bullets',
			enabled: false
		});
		this.#bullets.createMultiple({
			key: 'bullet',
			quantity: 20,
			active: false,
			visible: false,
			setScale: { x: 0.25, y: 0.25 },
		});
		this.#bulletLastFired = 0;
	}

	removeOffScreenBullets() {
		if (this.#bullets) {
			this.#bullets.getChildren().forEach(bullet => {
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

	fireBullet(gun, time) {
		// Get a bullet from the pool or create a new one
		const bullet = this.#bullets.getFirstDead();
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
	}
}