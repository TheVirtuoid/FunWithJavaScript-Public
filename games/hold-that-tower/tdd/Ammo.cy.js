import Ammo from "../src/classes/Ammo.js";


describe('When I work with the Ammo class', () => {
	let options = { type: Ammo.AMMO_TYPE_BULLET, damage: 10 };

	it('should throw if damage is not specified', () => {
		expect(() => new Ammo({ type: Ammo.AMMO_TYPE_BULLET })).to.throw();
	});

	it('should throw if type is not specified', () => {
		expect(() => new Ammo({ damage: 10 })).to.throw();
	});

	it('should create the class', () => {
		const ammo = new Ammo(options);
		expect(ammo).to.be.instanceOf(Ammo);
	});

	it('should have a damage property that is read-only', () => {
		const ammo = new Ammo(options);
		expect(ammo).to.have.property('damage').that.is.a('number');
		expect(ammo.damage).to.equal(10);
		expect(() => ammo.damage = 5).to.throw();
	});

	it('should have a type property that is read-only', () => {
		const ammo = new Ammo(options);
		expect(ammo).to.have.property('type');
		expect(typeof ammo.type).to.equal('symbol');
		expect(ammo.type).to.equal(Ammo.AMMO_TYPE_BULLET);
		expect(() => ammo.type = 'bad').to.throw();
	});

	it('should be able to create a "bullet" ammo', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_BULLET, damage: 10 });
		expect(ammo.type).to.equal(Ammo.AMMO_TYPE_BULLET);
		expect(ammo.damage).to.equal(10);
	});

	it('should be able to create a "missile" ammo', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_MISSILE, damage: 20 });
		expect(ammo.type).to.equal(Ammo.AMMO_TYPE_MISSILE);
		expect(ammo.damage).to.equal(20);
	});

	it('should be able to create a "enemy" ammo', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_ENEMY, damage: 15 });
		expect(ammo.type).to.equal(Ammo.AMMO_TYPE_ENEMY);
		expect(ammo.damage).to.equal(15);
	});

	it('should throw on invalid type', () => {
		expect(() => new Ammo({ type: 'invalid', damage: 10 })).to.throw();
	});

	it('should be able to adjust the damage', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_ENEMY, damage: 15 });
		ammo.adjustDamage(5);
		expect(ammo.damage).to.equal(20);
	});

	it('should not allow damage to go below 0', () => {
		const ammo = new Ammo({ type: Ammo.AMMO_TYPE_ENEMY, damage: 15 });
		ammo.adjustDamage(-20);
		expect(ammo.damage).to.equal(0);
	});
});