import Gun from "../src/classes/Gun.js";
import Ammo from "../src/classes/Ammo.js";

describe('When I work with the Gun class', () => {
	const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
	const position = Gun.POSITION_TWELVE;
	const args = { ammo, position };

	it('should throw if ammo is not specified', () => {
		expect(() => new Gun({ position })).to.throw();
	});

	it('should throw if position is not specified', () => {
		expect(() => new Gun({ ammo })).to.throw();
	});

	it('should create the class', () => {
		const gun = new Gun({ ammo, position });
		expect(gun).to.be.instanceOf(Gun);
		expect(gun.firingRate).to.equal(Gun.DEFAULT_FIRING_RATE);
	});

	it('should have a read-only ammo property', () => {
		const gun = new Gun({ ammo, position });
		expect(gun).to.have.property('ammo').that.is.an.instanceOf(Ammo);
		expect(() => gun.ammo = new Ammo({ type: Ammo.AMMO_TYPE_MISSILE, damage: 20 })).to.throw();
	});

	it('should have a firingRate property that is read-only', () => {
		const gun = new Gun({ ammo, position, firingRate: 500 });
		expect(gun).to.have.property('firingRate').that.is.a('number');
		expect(gun.firingRate).to.equal(500);
		expect(() => gun.firingRate = 300).to.throw();
	});

	it('should adjust the firing rate', () => {
		const gun = new Gun({ ammo, position, firingRate: 500 });
		gun.adjustFiringRate(-200);
		expect(gun.firingRate).to.equal(300);
	});

	it('should adjust the firing rate and never go below minimum', () => {
		const gun = new Gun({ ammo, position, firingRate: 500 });
		gun.adjustFiringRate(-500);
		expect(gun.firingRate).to.equal(Gun.MINIMUM_FIRING_RATE);
	});


});
