import Position from "../src/classes/Position.js";
import PrizeType from "../src/enums/PrizeType.js";
import Prize from "../src/classes/Prize.js";

describe('When I work with the Runner class', () => {
	let runner;
	const speed = 2;
	const hitPoints = 1;
	const position = new Position(0, 0);
	const prize = new Prize({ type: PrizeType.GUN, value: 10 });

	beforeEach(() => {
		runner = new Runner({ speed, hitPoints, position })
	});
});

/*

### Runner
1. Properties:
	- speed: int
- hitPoints: int
- prize: Prize (optional, prize being carried)
- position: Position
2. Methods:
	- takeDamage(amount: int): Reduces the runner's hit points by the given amount.
- upgradeSpeed(amount: int): Increases the runner's speed.
- upgradeHitPoints(amount: int): Increases the runner's hit points.
- moveToPrize(prize: Prize): Moves the runner to the prize's location (known from Tower.onEnemyDestroyed event);
- returnToTower(): Returns to the tower with the collected prize.
- dropPrize(): Drops the prize if the runner is destroyed or cannot carry it.
3. Event Emitters:
	- runnerDestroyed: Emitted when an enemy destroys a runner. Drops prize and returns the prize so another runner can pick it up.
- runnerReturned: Emitted when a runner returns to the tower with a prize.
4. Event Listeners:
	- onMissileHit: Triggered when a missile hits the runner.
	*/
