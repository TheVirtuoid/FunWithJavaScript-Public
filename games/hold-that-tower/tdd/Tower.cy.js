// games/hold-that-tower/tdd/Tower.test.js
import Tower from '../src/classes/Tower.js';
import Gun from '../src/classes/Gun.js';
import DefensiveWall from '../src/classes/DefensiveWall.js';
import GunPosition from "../src/enums/GunPosition.js";
import Ammo from "../src/classes/Ammo.js";
import AmmoType from "../src/enums/AmmoType.js";
import TowerUI from '../src/classes/Ui/Tower.js';
import MockScene from "./MockScene.js";
import Position from "../src/classes/Position.js";
import GameEvent from "../src/enums/GameEvent.js";

describe('Tower', () => {
	let tower;
	let emitSpy;
	const mockScene = new MockScene();
	const ammo = new Ammo({ scene: mockScene, type: AmmoType.BULLET, damage: 10 });
	const superAmmo = new Ammo({ scene: mockScene, type: AmmoType.BULLET, damage: 1000 });
	GameEvent.Setup(mockScene);

	beforeEach(() => {
		tower = new Tower({ scene: mockScene, position: new Position(100, 100) });
		cy.spy(mockScene.events, 'emit').as('emitSpy');
	});

	it('initializes with default values', () => {
		expect(tower.health).to.equal(Tower.DEFAULT_HEALTH);
		expect(tower.maxHealth).to.equal(Tower.DEFAULT_MAX_HEALTH);
		expect(tower.guns.length).to.equal(1);
		expect(tower.guns[0].placement).to.equal(GunPosition.TWELVE);
		expect(tower.runners.length).to.equal(1);
		expect(tower.defensiveWall.armor).to.equal(DefensiveWall.DEFAULT_ARMOR);
		expect(tower.turretRotationSpeed).to.equal(Tower.DEFAULT_TURRET_ROTATION_SPEED);
		expect(tower.ui).to.be.instanceOf(TowerUI);
	});

	it('reduces health when taking damage', () => {
		tower.takeDamage(ammo);
		expect(tower.health).to.equal(Tower.DEFAULT_HEALTH - ammo.damage);
	});

	it('emits gameOver event when health reaches zero', () => {
		tower.takeDamage(superAmmo);
		expect(tower.health).to.equal(0);
		cy.get('@emitSpy').should('have.been.calledWith', GameEvent.GAME_OVER);
	});

	it('cannot reduce health below zero', () => {
		tower.takeDamage(superAmmo);
		expect(tower.health).to.equal(0);
	});

	it('increases maximum health when upgraded', () => {
		tower.upgradeMaximumHealth(50);
		expect(tower.maxHealth).to.equal(150);
	});

	it('increases current health when upgraded', () => {
		tower.takeDamage(ammo);

		tower.upgradeHealth(5);
		expect(tower.health).to.equal(Tower.DEFAULT_HEALTH - ammo.damage + 5);
	});

	it('does not increase health above maximum when upgraded', () => {
		tower.takeDamage(ammo);
		tower.upgradeHealth(50);
		expect(tower.health).to.equal(tower.maxHealth);
	});

	it('adds a new gun', () => {
		const gun = new Gun({ ammo: { damage: 10 }, scene: mockScene });
		tower.addGun();
		expect(tower.guns.length).to.equal(2);
	});

	it('upgrades defensive wall armor', () => {
		tower.upgradeDefensiveWallArmor(0.3);
		expect(tower.defensiveWall.armor).to.equal(DefensiveWall.DEFAULT_ARMOR + 0.3);
	});

	it('adds a new runner', () => {
		tower.addRunner();
		expect(tower.runners.length).to.equal(2);
	});

	it('upgrades speed for all runners', () => {
		tower.addRunner();
		const initialSpeeds = tower.runners.map((runner) => runner.speed);

		tower.upgradeRunnersSpeed(10);
		tower.runners.forEach((runner, index) => {
			expect(runner.speed).to.equal(initialSpeeds[index] + 10);
		});
	});

	it('upgrades hit points for all runners', () => {
		tower.addRunner();
		const initialHitPoints = tower.runners.map((runner) => runner.hitPoints);

		tower.upgradeRunnersHitPoints(5);
		tower.runners.forEach((runner, index) => {
			expect(runner.hitPoints).to.equal(initialHitPoints[index] + 5);
		});
	});

	it('takes reduced damage when defensive wall has armor', () => {
		const originalHealth = tower.health;
		tower.upgradeDefensiveWallArmor(0.5);

		tower.takeDamage(ammo);
		expect(originalHealth - tower.health).to.be.lessThan(ammo.damage);
	});

	describe('And when I use the setters', () => {

		it('sets maximum health without affecting current health when appropriate', () => {
			tower.setMaxHealth(150);
			expect(tower.maxHealth).to.equal(150);
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH); // Should remain unchanged
		});

		it('sets health within maximum health bounds', () => {
			tower.setHealth(50);
			expect(tower.health).to.equal(50);
		});

		it('caps health at maximum when setting above max', () => {
			tower.setHealth(tower.maxHealth + 1);
			expect(tower.health).to.equal(tower.maxHealth);
		});

		it('sets turret rotation speed', () => {
			tower.setTurretRotationSpeed(0.08);
			expect(tower.turretRotationSpeed).to.equal(0.08);
		});
	});

	describe('And when I wan to get data from the UI', () => {
		// Test UI property delegation
		it('returns x coordinate from UI', () => {
			expect(tower.x).to.equal(tower.ui.x);
		});

		it('returns y coordinate from UI', () => {
			expect(tower.y).to.equal(tower.ui.y);
		});

		it('returns radius from UI', () => {
			expect(tower.radius).to.equal(tower.ui.radius);
		});

		it('returns image from UI', () => {
			expect(tower.image).to.equal(tower.ui.image);
		});
	});

	describe('And when I work with the gun', () => {
		it('resets existing gun positions when adding new gun', () => {
			const originalGun = tower.guns[0];
			cy.spy(originalGun, 'resetPosition');

			tower.addGun();

			expect(originalGun.resetPosition).to.have.been.called;
		});

		it('places guns in correct positions based on placement order', () => {
			tower.addGun(); // Should be at position 1
			tower.addGun(); // Should be at position 2

			expect(tower.guns[0].placement).to.equal(GunPosition.PLACEMENT_ORDER[0]);
			expect(tower.guns[1].placement).to.equal(GunPosition.PLACEMENT_ORDER[1]);
			expect(tower.guns[2].placement).to.equal(GunPosition.PLACEMENT_ORDER[2]);
		});
	});

	describe('And finnally, more on the runners', () => {
		it('upgrades multiple runners correctly', () => {
			tower.addRunner();
			tower.addRunner();

			const initialSpeeds = tower.runners.map(r => r.speed);
			const initialHitPoints = tower.runners.map(r => r.hitPoints);

			tower.upgradeRunnersSpeed(5);
			tower.upgradeRunnersHitPoints(10);

			tower.runners.forEach((runner, index) => {
				expect(runner.speed).to.equal(initialSpeeds[index] + 5);
				expect(runner.hitPoints).to.equal(initialHitPoints[index] + 10);
			});
		});
	});
});