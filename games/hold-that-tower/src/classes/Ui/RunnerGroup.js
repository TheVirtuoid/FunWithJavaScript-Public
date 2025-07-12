import Position from "../Position.js";
import Runner from "./../Runner.js";

export default class RunnerGroup {
	#scene;
	#runners;
	#runnersGroup;
	#tower;
	#statistics;

	constructor(args = {}) {
		const { scene, tower, statistics } = args;
		this.#scene = scene;
		this.#tower = tower;
		this.#statistics = statistics;
	}

	scheduleNextRunner(prizesDropped) {
		const runnerData = this.#selectNextRunner();
		if (runnerData) {
			const prize = prizesDropped.shift();
			this.#moveRunner(runnerData, prize);
		}
	}

	buildWave(wave) {
		this.#runnersGroup = this.#scene.physics.add.group();
		this.#runners = [];
		// TODO: Get number of runners from stats
		for (let i = 0; i < 1; i++) {
			const runner = new Runner({ scene: this.#scene, visible: false });
			const runnerData = {
				running: false,
				runner,
				eliminated: false
			};
			this.#runners.push(runnerData);
		}
	}

	#moveRunner(runnerData, prize) {
		const { runner } = runnerData;
		runner.setPosition(new Position(this.#tower.x, this.#tower.y));
		runner.setVisible(true);
		const distanceToPrize = Phaser.Math.Distance.Between(
			this.#tower.x,
			this.#tower.y,
			prize.x,
			prize.y
		);
		const duration = (distanceToPrize / runner.speed) * 1000;
		this.#scene.tweens.add({
			targets: runner.image,
			x: prize.x,
			y: prize.y,
			duration,
			ease: 'Linear',
			onComplete: () => {
				prize.setVisible(false);
				this.#scene.tweens.add({
					targets: runner.image,
					x: this.#tower.x,
					y: this.#tower.y,
					duration,
					ease: 'Linear',
					onComplete: () => {
						runner.setVisible(false);
						runnerData.running = false;
						this.#statistics.update(prize);
					}
				});
			}
		});
	}

	#selectNextRunner() {
		const nextRunner = this.#runners.find(runner => !runner.running && !runner.eliminated);
		if (nextRunner) {
			nextRunner.running = true;
			return nextRunner;
		}
		return null;
	}
}