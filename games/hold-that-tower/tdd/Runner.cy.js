import Runner from '../src/classes/Runner.js';
import Prize from '../src/classes/Prize.js';
import Position from '../src/classes/Position.js';
import PrizeType from "../src/enums/PrizeType.js";
import MockScene from "./MockScene.js";

describe('Runner', () => {
	let runner;
	let mockPrize;
	let mockTower;
	let mockMissile;
	const scene = new MockScene();
	const position = new Position(0, 0);

	beforeEach(() => {
		runner = new Runner({ position, scene });
		mockPrize = new Prize({
			scene,
			value: 50,
			type: PrizeType.GUN,
			position: new Position(100, 100)
		});
		mockTower = {
			position: new Position(0, 0)
		};
		mockMissile = {
			ammo: {
				damage: 20
			}
		};
	});

	describe('And when I work with the constructor', () => {
		it('initializes with default values', () => {
			expect(runner.speed).to.equal(Runner.DEFAULT_SPEED);
			expect(runner.hitPoints).to.equal(Runner.DEFAULT_HIT_POINTS);
			expect(runner.prize).to.be.null;
			expect(runner.position).to.be.instanceOf(Position);
		});

		it('initializes with custom speed parameter', () => {
			const customSpeed = 300;
			const runner = new Runner({ scene, speed: customSpeed });
			expect(runner.speed).to.equal(customSpeed);
		});

		it('initializes with custom position parameter', () => {
			const customPosition = new Position(100, 200);
			const runner = new Runner({ scene, position: customPosition });
			expect(runner.position).to.equal(customPosition);
		});


	});

	it('reduces hit points when taking damage', () => {
		const initialHP = runner.hitPoints;
		runner.takeDamage(10);
		expect(runner.hitPoints).to.equal(initialHP - 10);
	});

	it('increases speed when upgraded', () => {
		const initialSpeed = runner.speed;
		runner.upgradeSpeed(5);
		expect(runner.speed).to.equal(initialSpeed + 5);
	});

	it('increases hit points when upgraded', () => {
		const initialHP = runner.hitPoints;
		runner.upgradeHitPoints(15);
		expect(runner.hitPoints).to.equal(initialHP + 15);
	});

	it('should pick up a prize', () => {
		runner.pickUpPrize(mockPrize);
		expect(runner.prize).to.equal(mockPrize);
	});

	it('drops prize when instructed to', () => {
		runner.pickUpPrize(mockPrize);
		const droppedPrize = runner.dropPrize();
		expect(droppedPrize).to.equal(mockPrize);
		expect(runner.prize).to.be.null;
	});

	it('does not move below zero hit points', () => {
		runner.takeDamage(Runner.DEFAULT_HIT_POINTS + 20);
		expect(runner.hitPoints).to.equal(0);
	});

	it('cannot pick up prize when already carrying one', () => {
		const firstPrize = new Prize({
			scene,
			value: 10,
			type: PrizeType.GUN,
			position: new Position(50, 50)
		});
		runner.pickUpPrize(mockPrize);
		runner.pickUpPrize(firstPrize);
		expect(runner.prize).to.equal(mockPrize);
	});

	describe('And when I take damage', () => {
		it('reduces hit points when taking damage', () => {
			const runner = new Runner({ scene });
			const initialHitPoints = runner.hitPoints;

			runner.takeDamage(5);

			expect(runner.hitPoints).to.equal(initialHitPoints - 5);
		});

		it('cannot reduce hit points below zero', () => {
			const runner = new Runner({ scene });

			runner.takeDamage(1000); // Damage exceeding hit points

			expect(runner.hitPoints).to.equal(0);
		});

		it('handles zero damage', () => {
			const runner = new Runner({ scene });
			const initialHitPoints = runner.hitPoints;

			runner.takeDamage(0);

			expect(runner.hitPoints).to.equal(initialHitPoints);
		});
	});

	describe('And when I work with the speed', () => {
		it('increases speed when upgraded', () => {
			const runner = new Runner({ scene });
			const initialSpeed = runner.speed;

			runner.upgradeSpeed(50);

			expect(runner.speed).to.equal(initialSpeed + 50);
		});

		it('handles negative speed upgrades', () => {
			const runner = new Runner({ scene });
			const initialSpeed = runner.speed;

			runner.upgradeSpeed(-10);

			expect(runner.speed).to.equal(initialSpeed - 10);
		});

		it('handles zero speed upgrade', () => {
			const runner = new Runner({ scene });
			const initialSpeed = runner.speed;

			runner.upgradeSpeed(0);

			expect(runner.speed).to.equal(initialSpeed);
		});

		it('sets speed to specific value', () => {
			const runner = new Runner({ scene });

			runner.setSpeed(400);

			expect(runner.speed).to.equal(400);
		});

		it('can set speed to zero', () => {
			const runner = new Runner({ scene });

			runner.setSpeed(0);

			expect(runner.speed).to.equal(0);
		});
	});

	describe('And when I work with the hit point upgrades', () => {
		it('increases hit points when upgraded', () => {
			const runner = new Runner({ scene });
			const initialHitPoints = runner.hitPoints;

			runner.upgradeHitPoints(5);

			expect(runner.hitPoints).to.equal(initialHitPoints + 5);
		});

		it('handles negative hit points upgrades', () => {
			const runner = new Runner({ scene });
			const initialHitPoints = runner.hitPoints;

			runner.upgradeHitPoints(-3);

			expect(runner.hitPoints).to.equal(initialHitPoints - 3);
		});

		it('handles zero hit points upgrade', () => {
			const runner = new Runner({ scene });
			const initialHitPoints = runner.hitPoints;

			runner.upgradeHitPoints(0);

			expect(runner.hitPoints).to.equal(initialHitPoints);
		});
	});

	describe('And when I work with the prize', () => {
		it('picks up prize when not carrying one', () => {
			const runner = new Runner({ scene });
			const mockPrize = { value: 10, type: 'coin' };

			runner.pickUpPrize(mockPrize);

			expect(runner.prize).to.equal(mockPrize);
		});

		it('does not pick up prize when already carrying one', () => {
			const runner = new Runner({ scene });
			const firstPrize = { value: 10, type: 'coin' };
			const secondPrize = { value: 20, type: 'gem' };

			runner.pickUpPrize(firstPrize);
			runner.pickUpPrize(secondPrize);

			expect(runner.prize).to.equal(firstPrize);
		});

		it('drops prize and returns it', () => {
			const runner = new Runner({ scene });
			const mockPrize = { value: 10, type: 'coin' };

			runner.pickUpPrize(mockPrize);
			const droppedPrize = runner.dropPrize();

			expect(droppedPrize).to.equal(mockPrize);
			expect(runner.prize).to.be.null;
		});

		it('returns null when dropping prize while not carrying one', () => {
			const runner = new Runner({ scene });

			const droppedPrize = runner.dropPrize();

			expect(droppedPrize).to.be.null;
			expect(runner.prize).to.be.null;
		});
	});
});