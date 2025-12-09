import Asteroid from "./Asteroid.js";

export default class AsteroidGroup {
	#scene;
	#krampus;
	#space;
	#asteroids;
	#physicsGroup;

	#numStart = 4;

	constructor(args = {}) {
		const { scene, krampus, space } = args;
		this.#scene = scene;
		this.#krampus = krampus;
		this.#space = space;
		this.#asteroids = new Set();
		this.#physicsGroup = this.#scene.physics.add.group({
			bounceX: 1,
			bounceY: 1,
			colliderWorldBounds: false
		});
	}

	addKrampus(krampus) {
		this.#krampus = krampus;
	}

	removeKrampus() {
		this.#krampus = null;
	}

	generate(number = this.#numStart) {
		for (let i = 0; i < number; i++) {
			const asteroid = new Asteroid(this);
			const spawnPos = this.#findNonOverlappingPosition({
				asteroidRadius: 60,
				minDistanceFromKrampus: 120,
				edgePadding: 40
			});
			asteroid.create({
				scale: Asteroid.SCALE_LARGE,
				x: spawnPos.x,
				y: spawnPos.y
			});
			this.#physicsGroup.add(asteroid.sprite);
			this.#asteroids.add(asteroid);
		}
	}

	#findNonOverlappingPosition(options) {
		const {
			asteroidRadius,
			minDistanceFromKrampus,
			edgePadding
		} = options;

		const minX = this.#space.left + edgePadding;
		const maxX = this.#space.right - edgePadding;
		const minY = this.#space.top + edgePadding;
		const maxY = this.#space.bottom - edgePadding;

		const maxAttempts = 50;
		for (let attempt = 0; attempt < maxAttempts; attempt++) {
			const x = Phaser.Math.Between(minX, maxX);
			const y = Phaser.Math.Between(minY, maxY);
			let valid = true;

			// 1) Not too close to Krampus
			const distToKrampus = Phaser.Math.Distance.Between(x, y, this.#krampus.x, this.#krampus.y);
			if (distToKrampus < this.#krampus.displayRadius + minDistanceFromKrampus) {
				valid = false;
			}

			// 2) Not overlapping any already-created asteroid
			if (valid) {
				for (const existing of this.#asteroids) {
					const sprite = existing.sprite;
					if (!sprite) continue;

					// For squares, we check X and Y overlap separately (AABB check)
					// We treat 'asteroidRadius' as the half-width of the new asteroid
					const existingHalfWidth = sprite.displayWidth / 2;
					const existingHalfHeight = sprite.displayHeight / 2;

					const dx = Math.abs(x - sprite.x);
					const dy = Math.abs(y - sprite.y);

					// Check overlap on both axes with a 10px buffer
					if (dx < asteroidRadius + existingHalfWidth + 10 &&
						dy < asteroidRadius + existingHalfHeight + 10) {
						valid = false;
						break;
					}
				}
			}

			if (valid) {
				return { x, y };
			}
		}

		// If we can't find a perfect spot, just fall back to center
		return {
			x: (minX + maxX) / 2,
			y: (minY + maxY) / 2
		};
	}
}