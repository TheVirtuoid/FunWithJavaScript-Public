import Enemy from "./Enemy.js";
import Position from "../Position.js";
import Waves from "../Waves.js";
import EnemyType from "../../enums/EnemyType.js";
import EnemyFactory from "../EnemyFactory.js";
import AmmoType from "../../enums/AmmoType.js";
import Ammo from "../Ammo.js";
import GameEvent from "../../enums/GameEvent.js";

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

	buildWave(nextWave) {
		const wave = Waves.DATABASE[nextWave - 1];
		this.#enemyToLaunch = 0;
		this.#enemyLastLaunchedTime = 0;
		this.#enemyLaunchInterval = wave.frequency;
		if (this.#enemyLaunchInterval < 200) {
			this.#enemyLaunchInterval = 200;
		}
		this.#enemies = [];
		for (let i = 0; i < wave.numEnemies; i++) {
			const enemyNumber = Math.random();
			let accumulatedChange = wave.chances[0];
			let index = 0;
			while (index < 20 && enemyNumber > accumulatedChange && wave.chances[index] !== 0) {
				index++;
				accumulatedChange += wave.chances[index];
			}
			const type = EnemyType.TYPES[index];
			const theEnemy = EnemyType.DATABASE.get(type);
			const hitPoints = theEnemy.hitPoints + Math.floor(Math.random() * 10) - 5;
			const realEnemy = EnemyFactory.CreateEnemyFromType({ ...theEnemy, hitPoints, type }, this.#scene);
			const enemy = new Enemy({ scene: this.#scene, visible: false });
			enemy.create({ visible: false });
			// this.#enemies.push(enemy);
			this.#enemies.push(realEnemy);
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
		if (time > this.#enemyLastLaunchedTime + this.#enemyLaunchInterval && this.#enemyToLaunch !== -1) {
			if (this.#enemyToLaunch < this.#enemies.length) {
				const enemy = this.getEnemyToLaunch();
				this.moveEnemy(enemy);
				this.setForNextEnemy(enemy, time);
			} else {
				this.setForNextEnemy(null);
			}
		}
	}

	moveEnemy(enemy) {
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
			onUpdate: () => {
				enemy.updateHealthBarPosition(enemy.image.x, enemy.image.y);
			},
			onComplete: () => {
				GameEvent.Emit(GameEvent.ENEMY_REACHED_TOWER, enemy);
			}
		});
	}

	destroy() {
		this.#enemies.forEach(enemy => {
			if (enemy.image) {
				this.#scene.tweens.getTweensOf(enemy.image).forEach(tween => {
					tween.stop();
				});
			}
			enemy.setVisible(false);
			enemy.destroy();
		});
		this.#enemies = [];
		this.#enemyToLaunch = -1;
		this.#lastEnemyToLaunch = null;
	}

}