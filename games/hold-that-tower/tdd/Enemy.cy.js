import EnemyType from "../src/enums/EnemyType.js";
import EnemyFactory from "../src/classes/EnemyFactory.js";
import Position from "../src/classes/Position.js";
import Enemy from "../src/classes/Enemy.js";

describe('When I work with the Enemy class', () => {
	const position = new Position(0, 0);
	const { hitPoints, speed, damage } = EnemyFactory.getData(EnemyType.GUNNER);

	let enemy;
	beforeEach(() => {
		enemy = EnemyFactory.CreateEnemy({ type: EnemyType.GUNNER, position });
	});

	describe('And when I check the creation of an enemy', () => {
		it('should create the class', () => {
			expect(enemy).to.be.an.instanceof(Enemy);
		});

		it('should have the correct properties', () => {
			expect(enemy.type).to.equal(EnemyType.GUNNER);
			expect(enemy.hitPoints).to.equal(hitPoints);
			expect(enemy.speed).to.equal(speed);
			expect(enemy.damage).to.equal(damage);
			expect(enemy.position).to.equal(position);
		});
	});

	describe('And when I work with the takeDamage method', () => {
		it('should reduce hit points by the given amount', () => {
			const initialHitPoints = enemy.hitPoints;
			const damage = 10;
			enemy.takeDamage(damage);
			expect(enemy.hitPoints).to.equal(initialHitPoints - damage);
		});

		it('should not go below zero', () => {
			const initialHitPoints = enemy.hitPoints;
			const damage = 100;
			enemy.takeDamage(damage);
			expect(enemy.hitPoints).to.equal(0);
		});

		it('should always be a positive number', () => {
			expect(() => enemy.takeDamage(-10)).to.throw();
		});
	});

	// TODO: Implement later
	xdescribe('And when I work with the move method', () => {
		it('should move towards the tower', () => {
			const initialPosition = enemy.position.clone();
			enemy.move();
			expect(enemy.position.x).to.not.equal(initialPosition.x);
			expect(enemy.position.y).to.not.equal(initialPosition.y);
		});
	});

	xdescribe('And when I work with the event emmiters', () => {
		it('should fire enemyReachedTower when the enemy reaches the tower', () => {});

		it('should fire enemyDestroyed when the enemy is destroyed', (done) => {
			enemy.on('enemyDestroyed', () => {
				expect(true).to.be.true;
				done();
			}, { once: true });
			enemy.takeDamage(100); // This should destroy the enemy
		});
	});

	xdescribe('And when I work with the event listeners', () => {})
});
