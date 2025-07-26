import EnemyType from "../src/enums/EnemyType.js";
import EnemyFactory from "../src/classes/EnemyFactory.js";
import Position from "../src/classes/Position.js";
import Enemy from "../src/classes/Enemy.js";
import EnemyUi from "../src/classes/Ui/Enemy.js";
import Prize from "../src/classes/Prize.js";
import MockScene from "./MockScene.js";
import PrizeType from "../src/enums/PrizeType.js";


describe('When I work with the Enemy class', () => {
	const scene = new MockScene();
	const position = new Position(0, 0);
	const type = EnemyType.ABYSSLORD;
	const { hitPoints, speed, damage, name } = EnemyFactory.getData(type);
	const prize = new Prize({ value: 10, type: PrizeType.GUN, position: new Position(10, 10), scene });

	let enemy;
	beforeEach(() => {
		enemy = EnemyFactory.CreateEnemy({ type, position, scene, prize, name });
	});

	describe('And when I check the creation of an enemy', () => {
		it('should create the class', () => {
			expect(enemy).to.be.an.instanceof(Enemy);
		});

		it('should have the correct properties', () => {
			expect(enemy.type).to.equal(EnemyType.ABYSSLORD);
			expect(enemy.hitPoints).to.equal(hitPoints);
			expect(enemy.speed).to.equal(speed);
			expect(enemy.damage).to.equal(damage);
			expect(enemy.position).to.equal(position);
			expect(enemy.ui).to.be.instanceof(EnemyUi);
			expect(enemy.prize).to.be.instanceof(Prize);
			expect(enemy.name).to.equal(name);
		});
	});

	describe('And when I work with the takeDamage method', () => {
		it('should reduce hit points by the given amount', () => {
			const initialHitPoints = enemy.hitPoints;
			const damage = 10;
			const hitPoints = enemy.takeDamage(damage);
			expect(hitPoints).to.equal(initialHitPoints - damage);
		});

		it('should not go below zero', () => {
			const damage = enemy.hitPoints + 10;
			enemy.takeDamage(damage);
			expect(enemy.hitPoints).to.equal(0);
		});

		it('should always be a positive number', () => {
			expect(() => enemy.takeDamage(-10)).to.throw();
		});
	});

	describe('And when I work with the setPosition method', () => {
		it('should set the position of the enemy', () => {
			const newPosition = new Position(5, 5);
			enemy.setPosition(newPosition);
			expect(enemy.position).to.equal(newPosition);
			expect(enemy.ui.position).to.equal(newPosition);
		});

		it('should throw an error if position is not an instance of Position', () => {
			expect(() => enemy.setPosition({ x: 5, y: 5 })).to.throw();
		});
	});

	describe('And when I work with the setVisible method', () => {
		it('should set the visibility of the enemy UI', () => {
			enemy.setVisible(true);
			expect(enemy.ui.visible).to.be.true;
			enemy.setVisible(false);
			expect(enemy.ui.visible).to.be.false;
		});
	});

});
