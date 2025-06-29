// Tower.cy.js
import { Tower } from '../src/Tower';
import { Gun } from '../src/Gun';
import { Runner } from '../src/Runner';
import { Ammo } from '../src/Ammo';
import { AmmoType } from '../src/enums/AmmoType';
import { ClockOrdinal } from '../src/enums/ClockOrdinal';

describe('When I work with the Tower class', () => {
	let tower;

	beforeEach(() => {
		tower = new Tower();
	});

	describe('Initial properties', () => {
		it('should have initial health of 100', () => {
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH);
		});

		it('should have initial maxHealth of 100', () => {
			expect(tower.maxHealth).to.equal(Tower.DEFAULT_MAX_HEALTH);
		});

		it('should start with 1 gun at position 12', () => {
			expect(tower.guns.length).to.equal(1);
			expect(tower.guns[0].position).to.equal(Gun.Gun.POSITION_TWELVE);
		});

		it('should start with 1 runner', () => {
			expect(tower.runners.length).to.equal(1);
		});

		it('should have defensive wall with 0% armor', () => {
			expect(tower.defensiveWall.armor).to.equal(0);
		});

		it('should have turretSpinSpeed of 90 degrees per second', () => {
			expect(tower.turretSpinSpeed).to.equal(90);
		});
	});

	describe('takeDamage', () => {
		it('should reduce tower health by the damage amount', () => {
			tower.takeDamage(20);
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH - 20);
		});

		it('should not reduce health below 0', () => {
			tower.takeDamage(120);
			expect(tower.health).to.equal(0);
		});

		it('should emit gameOver event when health reaches 0', (done) => {
			let gameOverEmitted = false;
			tower.on('gameOver', () => {
				expect(true).to.be.true;
				done();
			}, { once: true });
			tower.takeDamage(120);
		});
	});

	describe('upgradeMaximumHealth', () => {
		it('should increase maximum health by given amount', () => {
			tower.upgradeMaximumHealth(50);
			expect(tower.maxHealth).to.equal(Tower.DEFAULT_MAX_HEALTH + 50);
		});

		it('should not affect current health', () => {
			tower.upgradeMaximumHealth(50);
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH);
		});
	});

	describe('upgradeHealth', () => {
		it('should increase current health by given amount', () => {
			tower.upgradeHealth(10);
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH + 10);
		});

		it('should not increase health above maxHealth', () => {
			tower.upgradeHealth(20);
			expect(tower.health).to.equal(Tower.DEFAULT_MAX_HEALTH);
		});

		it('should handle increased maxHealth correctly', () => {
			tower.upgradeMaximumHealth(50);
			tower.upgradeHealth(30);
			expect(tower.health).to.equal(Tower.DEFAULT_HEALTH + 30);
		});
	});

	describe('addGun', () => {
		it('should add a new gun at the specified position', () => {
			const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
			const gun = new Gun({ ammo, position: Gun.POSITION_ONE });
			tower.addGun(gun);

			expect(tower.guns.length).to.equal(2);
			expect(tower.guns[1]).to.equal(gun);
			expect(gun.position).to.equal(Gun.POSITION_ONE);
		});

		it('should not allow adding gun at a position that already has a gun', () => {
			const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
			const gun = new Gun({ ammo, position: Gun.POSITION_TWELVE });

			expect(() => tower.addGun(gun)).to.throw();
		});

		it('should not allow adding more than 12 guns', () => {
			const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });

			// Add 11 more guns to reach the limit of 12
			for (const position of Gun.POSITIONS) {
				if (position !== Gun.POSITION_TWELVE) { // Skip position 12 as it already has a gun
					const gun = new Gun({ ammo, position });
					tower.addGun(gun);
				}
			}

			const extraGun = new Gun({ ammo, position: Gun.POSITION_TWELVE });
			expect(() => tower.addGun(extraGun)).to.throw();
		});
	});

	describe('upgradeDefensiveWallArmor', () => {
		it('should increase defensive wall armor by given amount', () => {
			tower.upgradeDefensiveWallArmor(0.1);
			expect(tower.armor).to.equal(0.1);
		});

		it('should accumulate armor upgrades', () => {
			tower.upgradeDefensiveWallArmor(0.2);
			tower.upgradeDefensiveWallArmor(0.3);
			expect(tower.armor).to.equal(0.5);
		});

		it('should not allow armor to exceed 1.0', () => {
			tower.upgradeDefensiveWallArmor(0.7);
			tower.upgradeDefensiveWallArmor(0.4);
			expect(tower.armor).to.equal(1.0);
		});
	});

	xdescribe('addRunner', () => {
		it('should add a new runner to the tower', () => {
			const runner = new Runner(15, 30);
			tower.addRunner(runner);

			expect(tower.runners.length).to.equal(2);
			expect(tower.runners[1]).to.equal(runner);
		});
	});

	xdescribe('upgradeRunnersSpeed', () => {
		it('should increase speed for all runners', () => {
			const initialSpeed = tower.runners[0].speed;
			const runner2 = new Runner(15, 30);
			tower.addRunner(runner2);

			tower.upgradeRunnersSpeed(5);

			expect(tower.runners[0].speed).to.equal(initialSpeed + 5);
			expect(tower.runners[1].speed).to.equal(20);
		});
	});

	xdescribe('upgradeRunnersHitPoints', () => {
		it('should increase hit points for all runners', () => {
			const initialHitPoints = tower.runners[0].hitPoints;
			const runner2 = new Runner(15, 30);
			tower.addRunner(runner2);

			tower.upgradeRunnersHitPoints(10);

			expect(tower.runners[0].hitPoints).to.equal(initialHitPoints + 10);
			expect(tower.runners[1].hitPoints).to.equal(40);
		});
	});

	describe('Event listeners', () => {
		describe('onEnemyReachedTower', () => {
			it('should reduce tower health when enemy reaches tower', () => {
				const enemy = { damageInflicted: 15 };
				tower.onEnemyReachedTower(enemy);

				expect(tower.health).to.equal(85);
			});
		});

		describe('onMissileHit', () => {
			it('should reduce tower health when hit by missile', () => {
				const missile = { damage: 25 };
				tower.onMissileHit(missile);

				expect(tower.health).to.equal(75);
			});

			it('should apply damage reduction from defensive wall', () => {
				tower.upgradeDefensiveWallArmor(0.5); // 50% damage reduction
				const missile = { damage: 30 };

				tower.onMissileHit(missile);

				// Expect damage to be reduced by 50%
				expect(tower.health).to.equal(85);
			});
		});
	});
});