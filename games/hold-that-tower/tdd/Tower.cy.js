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
});