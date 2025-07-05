// games/hold-that-tower/tdd/Tower.test.js
import Tower from '../src/classes/Tower.js';
import Gun from '../src/classes/Gun.js';
import Runner from '../src/classes/Runner.js';
import DefensiveWall from '../src/classes/DefensiveWall.js';
import GunPosition from "../src/enums/GunPosition.js";
import Ammo from "../src/classes/Ammo.js";
import AmmoType from "../src/enums/AmmoType.js";
import TowerUI from '../src/classes/Ui/Tower.js';

describe('Tower', () => {
	let tower;
	const ammo = new Ammo({ type: AmmoType.BULLET, damage: 10 });
	const superAmmo = new Ammo({ type: AmmoType.BULLET, damage: 1000 });
	const mockScene = {};

	beforeEach(() => {
		tower = new Tower({ scene: mockScene });
	});

	it('initializes with default values', () => {
		expect(tower.health).to.equal(Tower.DEFAULT_HEALTH);
		expect(tower.maxHealth).to.equal(Tower.DEFAULT_MAX_HEALTH);
		expect(tower.guns.length).to.equal(1);
		expect(tower.guns[0].position).to.equal(GunPosition.TWELVE);
		expect(tower.runners.length).to.equal(1);
		expect(tower.defensiveWall.armor).to.equal(DefensiveWall.DEFAULT_ARMOR);
		expect(tower.turretSpinSpeed).to.equal(Tower.DEFAULT_TURRET_SPIN_SPEED);
		expect(tower.ui).to.be.instanceOf(TowerUI);
	});

	it('reduces health when taking damage', () => {
		tower.takeDamage(ammo);
		expect(tower.health).to.equal(Tower.DEFAULT_HEALTH - ammo.damage);
	});

	xit('emits gameOver event when health reaches zero', () => {
		const gameOverSpy = jest.fn();
		tower.on('gameOver', gameOverSpy);

		tower.takeDamage(100);
		expect(tower.health).to.equal(0);
		expect(gameOverSpy).toHaveBeenCalled();
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

	it('adds a new gun at specified position', () => {
		const gun = new Gun({ ammo: { damage: 10 } });
		tower.addGun(gun, GunPosition.THREE);

		expect(tower.guns.length).to.equal(2);
		expect(tower.guns.some((gun) => gun.position === GunPosition.THREE)).to.be.true;
	});

	it('rejects adding a gun to an occupied position', () => {
		const gun1 = new Gun({ ammo: { damage: 10 } });
		const gun2 = new Gun({ ammo: { damage: 10 } });
		tower.addGun(gun1, GunPosition.THREE);
		tower.addGun(gun2, GunPosition.THREE);
		expect(tower.guns.length).to.equal(2);
		expect(tower.guns.some((gun) => gun === gun1)).to.be.true;
		expect(tower.guns.some((gun) => gun === gun2)).to.be.false;
	});

	it('rejects adding more than 12 guns', () => {
		GunPosition.POSITIONS.forEach((position) => {
			if (position !== GunPosition.NONE) {
				tower.addGun(new Gun({ ammo: { damage: 10 } }), position);
			}
		});

		const extraGun = new Gun({ ammo: { damage: 10 } });
		tower.addGun(extraGun, GunPosition.SEVEN);

		expect(tower.guns.length).to.equal(12);
		expect(tower.guns.some((gun) => gun === extraGun)).to.be.false;
	});

	it('upgrades defensive wall armor', () => {
		tower.upgradeDefensiveWallArmor(0.3);
		expect(tower.defensiveWall.armor).to.equal(DefensiveWall.DEFAULT_ARMOR + 0.3);
	});

	it('adds a new runner', () => {
		const newRunner = new Runner();
		tower.addRunner(newRunner);

		expect(tower.runners.length).to.equal(2);
		expect(tower.runners.some((runner) => runner === newRunner)).to.be.true;
	});

	it('upgrades speed for all runners', () => {
		tower.addRunner(new Runner());
		const initialSpeeds = tower.runners.map((runner) => runner.speed);

		tower.upgradeRunnersSpeed(10);
		tower.runners.forEach((runner, index) => {
			expect(runner.speed).to.equal(initialSpeeds[index] + 10);
		});
	});

	it('upgrades hit points for all runners', () => {
		tower.addRunner(new Runner());
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

	// TODO: fix events
	/*it('handles enemy reached tower event', () => {
		const enemy = { damage: 15 };
		tower.onEnemyReachedTower(enemy);

		expect(tower.health).to.equal(85);
	});*/

	/*it('handles missile hit event', () => {
		const missile = { ammo: { damage: 25 } };
		tower.onMissileHit(missile);

		expect(tower.health).to.equal(75);
	});*/
});