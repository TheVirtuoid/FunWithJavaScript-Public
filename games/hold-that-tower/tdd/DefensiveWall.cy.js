import Ammo from "../src/classes/Ammo.js";
import DefensiveWall from "../src/classes/DefensiveWall.js";
import AmmoType from "../src/enums/AmmoType.js";

describe('When I work with the DefensiveWall class', () => {
	let bullet = new Ammo({ type: AmmoType.BULLET, damage: 10 });
	let enemy = new Ammo({ type: AmmoType.ENEMY, damage: 15 });
	let missile = new Ammo({ type: AmmoType.MISSILE, damage: 20 });

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
			expect(wall.armor).to.equal(.5 - wall.getArmorDamage(AmmoType.BULLET));
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
			wall.upgradeArmor(.9);
		});

		it('should calculate tower damage correctly for ammoType', () => {
			const oldArmor = wall.armor;
			const towerDamage = wall.takeDamage(enemy);
			expect(towerDamage).to.equal(Math.floor(missile.damage * (1 - oldArmor)));
			expect(wall.armor).to.equal(oldArmor - wall.getArmorDamage(AmmoType.ENEMY));
		});

		it('should throw if Ammo.type is not supported', () => {
			const oldArmor = wall.armor;
			expect(() => wall.takeDamage({ type: 'testing', damage: 10})).to.throw();
		});
	});
});