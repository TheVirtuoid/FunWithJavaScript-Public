import Gun from "../src/classes/Gun.js";
import Ammo from "../src/classes/Ammo.js";

describe('When I work with the Gun class', () => {

	it('should throw if ammo is not specified', () => {
		expect(() => new Gun()).to.throw();
	});

	it('should create the class with valid ammo', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
		const gun = new Gun({ ammo });
		expect(gun).to.be.instanceOf(Gun);
	});

	it('should have a read-only ammo property', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
		const gun = new Gun({ ammo });
		expect(gun).to.have.property('ammo').that.is.instanceOf(Ammo);
		expect(gun.ammo.damage).to.equal(10);
		expect(() => gun.ammo = new Ammo({ type: Ammo.AMMO_TYPE_MISSILE, damage: 20 })).to.throw();
	});

	it('should be able to fire the gun', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
		const gun = new Gun({ ammo });
		const firedAmmo = gun.fire();
		expect(firedAmmo).to.be.instanceOf(Ammo);
		expect(firedAmmo.type).to.equal(Ammo.AMMO_TYPE_BULLET);
		expect(firedAmmo.damage).to.equal(10);
	});
});

1. Properties:
	- damage: int
- firingRate: float (milliSeconds between shots)
- speed: int (speed of the bullet)
- position: ClockOrdinal (position on the tower). Values from 1 to 12, representing the clock face.