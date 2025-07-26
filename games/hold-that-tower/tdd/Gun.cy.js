import Gun from "../src/classes/Gun.js";
import Ammo from "../src/classes/Ammo.js";
import GunPosition from "../src/enums/GunPosition.js";
import AmmoType from "../src/enums/AmmoType.js";
import GunUi from "../src/classes/Ui/Gun.js";
import MockScene from "./MockScene.js";

describe('When I work with the Gun class', () => {
	const scene = new MockScene();
	const ammo = new Ammo({ scene, type: AmmoType.BULLET, damage: 10 });
	const position = GunPosition.TWELVE;
	const firingRate = 500;

	it('should throw if ammo is not specified', () => {
		expect(() => new Gun()).to.throw();
	});

	it('should create the class', () => {
		const gun = new Gun({ ammo, scene });
		expect(gun).to.be.instanceOf(Gun);
		expect(gun.firingRate).to.equal(Gun.DEFAULT_FIRING_RATE);
		expect(gun.ammoDamage).to.equal(ammo.damage);
		expect(gun.placement).to.equal(GunPosition.NONE);
		expect(gun.ammoSpeed).to.equal(Ammo.DEFAULT_SPEED);
		expect(gun.ammoType).to.equal(AmmoType.BULLET);
		expect(gun.ui).to.be.instanceof(GunUi);
	});

	describe('When I work with the ammo', () => {
		it('should NOT have an ammo property', () => {
			const gun = new Gun({ ammo, scene });
			expect(gun).to.not.have.property('ammo');
		});

		it('should have an read-only ammoType property', () => {
			const gun = new Gun({ ammo, scene });
			expect(gun).to.have.property('ammoType');
			expect(() => gun.ammoType = AmmoType.MISSILE).to.throw();
		});

		it('should be able to replace the ammo', () => {
			const gun = new Gun({ ammo, scene });
			const newAmmo = new Ammo({ type: AmmoType.MISSILE, damage: 20, scene });
			gun.replaceAmmo(newAmmo);
			expect(gun.ammoDamage).to.equal(newAmmo.damage);
			expect(gun.ammoSpeed).to.equal(newAmmo.speed);
			expect(gun.ammoType).to.equal(newAmmo.type);
		});

		describe('And when I work with the ammoDamage property', () => {
			it('should be not be able to set the ammoDamage directly', () => {
				const gun = new Gun({ ammo, scene });
				expect(gun).to.have.property('ammoDamage').that.is.a('number');
				expect(gun.ammoDamage).to.equal(10);
				expect(() => gun.ammoDamage = 20).to.throw();
			});

			it('should adjust the ammoDamage', () => {
				const gun = new Gun({ ammo, scene });
				gun.adjustAmmoDamage(5);
				expect(gun.ammoDamage).to.equal(15);
			});
		});

		describe('And when I work with the ammoSpeed property', () => {
			it('should have an ammoSpeed property that is read-only', () => {
				const gun = new Gun({ ammo, scene });
				expect(gun).to.have.property('ammoSpeed').that.is.a('number');
				expect(gun.ammoSpeed).to.equal(Ammo.DEFAULT_SPEED);
				expect(() => gun.ammoSpeed = 100).to.throw();
			});

			it('should adjust the ammoSpeed', () => {
				const gun = new Gun({ ammo, scene });
				gun.adjustAmmoSpeed(50);
				expect(gun.ammoSpeed).to.equal(Ammo.DEFAULT_SPEED + 50);
			});
		});

		describe('And when I work with the firingRate property', () => {
			it('should have a firingRate property that is read-only', () => {
				const gun = new Gun({ ammo, scene, firingRate });
				expect(gun).to.have.property('firingRate').that.is.a('number');
				expect(gun.firingRate).to.equal(500);
				expect(() => gun.firingRate = 300).to.throw();
			});

			it('should adjust the firing rate', () => {
				const gun = new Gun({ ammo, scene, position, firingRate });
				gun.adjustFiringRate(-200);
				expect(gun.firingRate).to.equal(300);
			});

			it('should adjust the firing rate and never go below minimum', () => {
				const gun = new Gun({ ammo, scene, position, firingRate });
				gun.adjustFiringRate(-500);
				expect(gun.firingRate).to.equal(Gun.MINIMUM_FIRING_RATE);
			});
		});

	});
});
