import Enemy from "./Enemy.js";
import Position from "../Position.js";

export default class EnemyGroup {
	#enemies;
	#enemiesGroup;
	#enemyToLaunch = 0;
	#enemyLastLaunchedTime = 0;
	#enemyLaunchInterval = 1000; // Launch enemy every 3 seconds
	#lastEnemyToLaunch;
	#scene;
	#tower;

	constructor(args = {}) {
		const { scene, tower } = args;
		this.#scene = scene;
		this.#tower = tower;
	}

	get group() {
		return this.#enemiesGroup;
	}

	get enemyToLaunch() {
		return this.#enemyToLaunch;
	}

	get enemyLastLaunchedTime() {
		return this.#enemyLastLaunchedTime;
	}

	get enemyLaunchInterval() {
		return this.#enemyLaunchInterval;
	}

	get lastEnemyToLaunch() {
		return this.#lastEnemyToLaunch;
	}

	get length() {
		return this.#enemies.length;
	}

	getEnemyToLaunch() {
		return this.#enemies[this.#enemyToLaunch];
	}

	buildWave(wave) {
		this.#enemyToLaunch = 0;
		this.#enemyLastLaunchedTime = 0;
		this.#enemyLaunchInterval = 1000 - (wave * 50); // Decrease interval by 50ms per wave, minimum 200ms
		if (this.#enemyLaunchInterval < 200) {
			this.#enemyLaunchInterval = 200;
		}
		this.#enemies = [];
		for (let i = 0; i < 20; i++) {
			const enemy = new Enemy({ scene: this.#scene, visible: false });
			enemy.create({ visible: false });
			this.#enemies.push(enemy);
		}
		this.#enemiesGroup = this.#scene.physics.add.group();
		this.#enemies.forEach(enemy => {
			this.#enemiesGroup.add(enemy.image);
		});
	}

	findEnemyFromImage(image) {
		return this.#enemies.find(enemy => enemy.image === image);
	}

	setForNextEnemy(enemy, time) {
		if (enemy === null) {
			this.#enemyToLaunch = -1;
		} else {
			this.#enemyToLaunch++;
			this.#enemyLastLaunchedTime = time;
			this.#lastEnemyToLaunch = enemy;
		}
	}

	setLastLaunchedTime(time) {
		this.#enemyLastLaunchedTime = this.#enemyLastLaunchedTime === 0 ? time : this.#enemyLastLaunchedTime;
	}

	scheduleNextEnemyMove(time) {
		let waveEnded = false;
		if (time > this.#enemyLastLaunchedTime + this.#enemyLaunchInterval && this.#enemyToLaunch !== -1) {
			if (this.#enemyToLaunch < this.#enemies.length) {
				const enemy = this.getEnemyToLaunch();
				waveEnded = this.moveEnemy(enemy);
				this.setForNextEnemy(enemy, time);
			} else {
				this.setForNextEnemy(null);
			}
		}
		return waveEnded;
	}

	moveEnemy(enemy) {
		let waveEnded = false;
		if (Math.random() < .5) {
			enemy.setPosition(new Position(
				Math.random() < .5 ? -100 : this.#scene.cameras.main.width + 100,
				Math.floor(Math.random() * this.#scene.cameras.main.height)
			));
		} else {
			enemy.setPosition(new Position(
				Math.floor(Math.random() * this.#scene.cameras.main.width),
				Math.random() < .5 ? -100 : this.#scene.cameras.main.height + 100
			));
		}
		enemy.setVisible(true);

		// Create a tween to move from left to right
		this.#scene.tweens.add({
			targets: enemy.image,
			x: this.#tower.x,
			y: this.#tower.y,
			duration: 5000, // Time in milliseconds to complete the animation
			ease: 'Linear', // Linear motion for consistent speed
			onComplete: () => {
				// Optional: if you want to repeat the animation or do something when done
				enemy.setVisible(false);
				if (this.#enemies.enemyToLaunch === -1 && enemy === this.#enemies.lastEnemyToLaunch) {
					console.log('WE ARE DONE WITH THIS WAVE (moveEnemy)');
					waveEnded = true;
				}
			}
		});
		return waveEnded;
	}
}