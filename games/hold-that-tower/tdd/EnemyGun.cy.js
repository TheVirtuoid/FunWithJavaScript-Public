import AmmoType from "../src/enums/AmmoType.js";
import Ammo from "../src/classes/Ammo.js";
import EnemyGun from "../src/classes/EnemyGun.js";

describe('When I work with the EnemyGun class', () => {
	const ammo = new Ammo({ type: AmmoType.BULLET, damage: 10 });
	const targetPriority = .7;

	it('should create the class with the defaults', () => {
		const enemyGun = new EnemyGun({ ammo });
		expect(enemyGun.targetPriority).to.equal(EnemyGun.DEFAULT_TARGET_PRIORITY);
	});

	describe('And when I work with the targetPriority property', () => {
		it('should have a targetPriority property that is read-only', () => {
			const enemyGun = new EnemyGun({ ammo });
			expect(enemyGun).to.have.property('targetPriority').that.is.a('number');
			expect(enemyGun.targetPriority).to.equal(EnemyGun.DEFAULT_TARGET_PRIORITY);
			expect(() => enemyGun.targetPriority = 50).to.throw();
		});

		it('should set the targetPriority property', () => {
			const enemyGun = new EnemyGun({ ammo, targetPriority });
			expect(enemyGun.targetPriority).to.equal(targetPriority);
		});

		it('should set the targetPriority to 1 if value is greater than 1', () => {
			const enemyGun = new EnemyGun({ ammo, targetPriority: 1.1 });
			expect(enemyGun.targetPriority).to.equal(1);
		});

		it('should set the targetPriority to 0 if value is less than 0', () => {
			const enemyGun = new EnemyGun({ ammo, targetPriority: -1.1 });
			expect(enemyGun.targetPriority).to.equal(0);
		});

		it('should adjust the targetPriority', () => {
			const enemyGun = new EnemyGun({ ammo });
			enemyGun.adjustTargetPriority(.2);
			expect(enemyGun.targetPriority).to.equal(EnemyGun.DEFAULT_TARGET_PRIORITY + .2);
		});

		it('should not allow targetPriority to exceed 1', () => {
			const enemyGun = new EnemyGun({ ammo });
			enemyGun.adjustTargetPriority(1.5);
			expect(enemyGun.targetPriority).to.equal(1);
		});

		it('should not allow targetPriority to be less than 0', () => {
			const enemyGun = new EnemyGun({ ammo });
			enemyGun.adjustTargetPriority(-1.5);
			expect(enemyGun.targetPriority).to.equal(0);
		});
	});

	// TODO: Don't know how to test this yet
	xdescribe('And when I attempt to determine a target', () => {});
});
