import Asteroid from "./Asteroid.js";
import GameEvent from "./GameEvent.js";

export default class AsteroidGroup {
	#scene;
	#krampus;
	#space;
	#asteroids;
	#physicsGroup;

	#asteroidsPhysicsGroup;

	#numStart = 4;

	constructor(args = {}) {
		const { scene, krampus, space, asteroidsPhysicsGroup } = args;
		this.#scene = scene;
		this.#krampus = krampus;
		this.#space = space;
		this.#asteroids = new Set();
		this.#asteroidsPhysicsGroup = asteroidsPhysicsGroup;
	}

	addKrampus(krampus) {
		this.#krampus = krampus;
	}

	removeKrampus() {
		this.#krampus = null;
	}

	getSprites() {
		return [ ...this.#asteroids.values()].map(asteroid => asteroid.sprite);
	}

	addAsteroid(x, y, scale) {
		const randomize = x === Number.POSITIVE_INFINITY || y === Number.POSITIVE_INFINITY;
		const newAsteroid = new Asteroid(this.#scene);
		if (randomize) {
			const spawnPos = this.#findNonOverlappingPosition({
				asteroidRadius: 60,           // approximate; tweak if needed
				minDistanceFromKrampus: 120,  // how far from Krampus
				edgePadding: 40               // don't spawn right on the edges
			});
			x = spawnPos.x;
			y = spawnPos.y;
		}
		newAsteroid.create({
			scale,
			x,
			y
		});
		this.#asteroids.add(newAsteroid);
		return newAsteroid;
	}

	remove(sprite) {
		let hitAsteroid = null;
		for (const asteroid of this.#asteroids) {
			if (asteroid.sprite === sprite) {
				hitAsteroid = asteroid;
				break;
			}
		}
		if (!hitAsteroid) return;
		if (hitAsteroid.scale !== Asteroid.SCALE_SMALL) {
			const newScale = hitAsteroid.scale === Asteroid.SCALE_LARGE ? Asteroid.SCALE_MEDIUM : Asteroid.SCALE_SMALL;
			for (let i = 0; i < 2; i++) {
				const asteroid = this.addAsteroid(hitAsteroid.sprite.x, hitAsteroid.sprite.y, newScale);
				this.#asteroidsPhysicsGroup.add(asteroid.sprite);
				asteroid.setPhysicsAttributes();
			}
		}
		sprite.destroy();
		this.#asteroids.delete(hitAsteroid);
		if (this.#asteroids.size === 0) {
			GameEvent.Emit(GameEvent.LEVEL_COMPLETE);
		}
	}

	removeAll() {
		for (const asteroid of this.#asteroids) {
			asteroid.sprite.destroy();
		}
		this.#asteroids.clear();
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