import Ammo from "../src/classes/Ammo.js";
import DefensiveWall from "../src/classes/DefensiveWall.js";

describe('When I work with the DefensiveWall class', () => {
	let bullet = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
	let enemy = new Ammo({ type: Ammo.AMMO_TYPE_ENEMY, damage: 15 });
	let missile = new Ammo({ type: Ammo.AMMO_TYPE_MISSILE, damage: 20 });

	it('should create the class', () => {
		const wall = new DefensiveWall();
		expect(wall).to.be.instanceOf(DefensiveWall);
	});

	it('should have an armor property that is read-only', () => {
		const wall = new DefensiveWall();
		expect(wall).to.have.property('armor').that.is.a('number');
		expect(wall.armor).to.equal(0);
		expect(() => wall.armor = 5).to.throw();
	});

	describe('When I work with methods', () => {
		let wall;
		beforeEach(() => {
			wall = new DefensiveWall();
		});

		it('should be able to upgrade the armor', () => {
			wall.upgradeArmor(.5);
			expect(wall.armor).to.equal(.5);
		});

		it('armor should never exceed 1', () => {
			wall.upgradeArmor(1.5);
			expect(wall.armor).to.equal(1);
		});

		it('should be able to take damage', () => {
			wall.upgradeArmor(.5);
			wall.takeDamage(bullet);
			expect(wall.armor).to.equal(.5 - DefensiveWall.ARMOR_DAMAGE_BULLET);
		});

		it('armor should not go below 0', () => {
			wall.upgradeArmor(.01);
			wall.takeDamage(enemy);
			expect(wall.armor).to.equal(0);
		});
	});

	describe('When I determine actual tower and armor damage', () => {
		let wall;
		beforeEach(() => {
			wall = new DefensiveWall();
			wall.upgradeArmor(.5);
		});

		it('should calculate tower damage correctly for bullet', () => {
			const oldArmor = wall.armor;
			const towerDamage = wall.takeDamage(bullet);
			expect(towerDamage).to.equal(Math.floor(bullet.damage * oldArmor));
			expect(wall.armor).to.equal(oldArmor - DefensiveWall.ARMOR_DAMAGE_BULLET);
		});

		it('should calculate tower damage correctly for missile', () => {
			const oldArmor = wall.armor;
			const towerDamage = wall.takeDamage(missile);
			expect(towerDamage).to.equal(Math.floor(missile.damage * oldArmor));
			expect(wall.armor).to.equal(oldArmor - DefensiveWall.ARMOR_DAMAGE_MISSILE);
		});

		it('should calculate tower damage correctly for enemy', () => {
			const oldArmor = wall.armor;
			const towerDamage = wall.takeDamage(enemy);
			expect(towerDamage).to.equal(Math.floor(enemy.damage * oldArmor));
			expect(wall.armor).to.equal(oldArmor - DefensiveWall.ARMOR_DAMAGE_ENEMY);
		});

		it('should throw if Ammo.type is not supported', () => {
			const oldArmor = wall.armor;
			expect(() => wall.takeDamage({ type: 'testing', damage: 10})).to.throw();
		});
	});
});