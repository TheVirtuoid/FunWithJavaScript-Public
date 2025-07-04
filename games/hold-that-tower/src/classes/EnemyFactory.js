import EnemyType from "../enums/EnemyType.js";
import Enemy from "./Enemy.js";

const database = new Map([
	[EnemyType.GUNNER, { hitPoints: 10, speed: 5, damage: 20 }],
	[EnemyType.RUNNER, { hitPoints: 5, speed: 10, damage: 40 }],
	[EnemyType.BOSS, { hitPoints: 100, speed: 2, damage: 60 }],
]);

export default class EnemyFactory {
	static CreateEnemy(args = {}) {
		const { type, position } = args;
		if (!EnemyType.TYPES.includes(type)) {
			throw new Error('Invalid enemy type');
		}
		const enemyData = database.get(type);
		if (!enemyData) {
			throw new Error('Enemy data not found');
		}

		const { hitPoints, speed, damage } = {...enemyData, ...args};
		return new Enemy({ type, hitPoints, speed, damage, position });
	}

	static getData(type) {
		if (!EnemyType.TYPES.includes(type)) {
			throw new Error('Invalid enemy type');
		}
		const enemyData = database.get(type);
		if (!enemyData) {
			throw new Error('Enemy data not found');
		}
		return {...enemyData};
	}
}