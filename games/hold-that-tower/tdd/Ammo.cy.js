import Ammo from "../src/classes/Ammo.js";
import AmmoType from "../src/enums/AmmoType.js";
import MockScene from "./MockScene.js";


describe('When I work with the Ammo class', () => {
	const scene = new MockScene();
	let options = { scene, type: AmmoType.BULLET, damage: 10 };

	it('should throw if damage is not specified', () => {
		expect(() => new Ammo({ scene, type: AmmoType.BULLET })).to.throw();
	});

	it('should throw if type is not specified', () => {
		expect(() => new Ammo({ scene, damage: 10 })).to.throw();
	});

	it('should create the class', () => {
		const ammo = new Ammo(options);
		expect(ammo).to.be.instanceOf(Ammo);
		expect(ammo.damage).to.equal(10);
		expect(ammo.speed).to.equal(Ammo.DEFAULT_SPEED);
	});

	describe('When I work with the damage property', () => {
		it('should have a damage property that is read-only', () => {
			const ammo = new Ammo(options);
			expect(ammo).to.have.property('damage').that.is.a('number');
			expect(ammo.damage).to.equal(10);
			expect(() => ammo.damage = 5).to.throw();
		});

		it('should be able to adjust the damage', () => {
			const ammo = new Ammo(options);
			ammo.adjustDamage(5);
			expect(ammo.damage).to.equal(15);
		});

		it('should not allow damage to go below 0', () => {
			const ammo = new Ammo(options);
			ammo.adjustDamage(-20);
			expect(ammo.damage).to.equal(0);
		});

	});

	describe('And when I work with the type property', () => {
		it('should have a type property that is read-only', () => {
			const ammo = new Ammo(options);
			expect(ammo).to.have.property('type');
			expect(typeof ammo.type).to.equal('symbol');
			expect(ammo.type).to.equal(AmmoType.BULLET);
			expect(() => ammo.type = 'bad').to.throw();
		});

		it('should be able to create any AMMOTYPE ammo', () => {
			const ammo = new Ammo({ scene, type: AmmoType.BULLET, damage: 10 });
			expect(ammo.type).to.equal(AmmoType.BULLET);
			expect(ammo.damage).to.equal(10);
		});

		it('should throw on invalid type', () => {
			expect(() => new Ammo({ scene, type: 'invalid', damage: 10 })).to.throw();
		});
	});

	describe('And when I work with the speed property', () => {
		it('should have a speed property that is read-only', () => {
			const ammo = new Ammo(options);
			expect(ammo).to.have.property('speed').that.is.a('number');
			expect(ammo.speed).to.equal(Ammo.DEFAULT_SPEED);
			expect(() => ammo.speed = 500).to.throw();
		});

		it('should allow adjusting the speed', () => {
			const ammo = new Ammo(options);
			ammo.adjustSpeed(5);
			expect(ammo.speed).to.equal(Ammo.DEFAULT_SPEED + 5);
		});

		it('should not let speed to below minimum', () => {
			const ammo = new Ammo(options);
			ammo.adjustSpeed(-1000);
			expect(ammo.speed).to.equal(Ammo.MINIMUM_SPEED);
		})
	});



});