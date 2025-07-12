import EnemyType from "../enums/EnemyType.js";
import Enemy from "./Enemy.js";
import Coins from "./Ui/Coins.js";
import Star from "./Ui/Star.js";
import Crown from "./Ui/Crown.js";
import EnemyUi from "./Ui/Enemy.js";


export default class EnemyFactory {
	static CreateEnemy(args = {}) {
		const { type, position } = args;
		if (!EnemyType.TYPES.includes(type)) {
			throw new Error('Invalid enemy type');
		}
		const enemyData = EnemyType.DATABASE.get(type);
		if (!enemyData) {
			throw new Error('Enemy data not found');
		}

		const { hitPoints, speed, damage, prize } = {...enemyData, ...args};
		return new Enemy({ type, hitPoints, speed, damage, position, prize });
	}

	static CreateEnemyFromType(enemyData, scene) {
		let prize;
		const whichPrize = Math.floor(Math.random() * 100);
		if (whichPrize < 60) {
			prize = new Coins({ scene, visible: false });
			prize.create();
			prize.setAmount(Math.floor(Math.random() * 15) + 5);
		} else if (whichPrize < 90) {
			prize = new Star({ scene, visible: false });
			prize.create();
			prize.setAmount(Math.floor(Math.random() * 15) + 15);
		} else {
			prize = new Crown({ scene, visible: false });
			prize.create();
			prize.setAmount(Math.floor(Math.random() * 15) + 25);
		}
		return new Enemy({...enemyData, prize, scene });
	}

	static getData(type) {
		if (!EnemyType.TYPES.includes(type)) {
			throw new Error('Invalid enemy type');
		}
		const enemyData = EnemyType.DATABASE.get(type);
		if (!enemyData) {
			throw new Error('Enemy data not found');
		}
		return {...enemyData};
	}
}