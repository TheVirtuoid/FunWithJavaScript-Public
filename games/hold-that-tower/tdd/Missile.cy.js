import Position from "../src/classes/Position.js";
import Ammo from "../src/classes/Ammo.js";
import AmmoType from "../src/enums/AmmoType.js";
import Missile from "../src/classes/Missile.js";

describe('When I work with the Missile class', () => {
	const ammo = new Ammo({ type: AmmoType.MISSILE, damage: 20, speed: 2 })
	const direction = new Position(1,  0);
	const position = new Position (0, 0);

	it('should create the class', () => {
		const missile = new Missile({ ammo, direction, position });
		expect(missile).to.be.an.instanceof(Missile);
	});

	it('should throw error if direction is not specified', () => {
		expect(() => new Missile({ ammo, position })).to.throw();
	});
	it('should throw error if ammo is not specified', () => {
		expect(() => new Missile({ direction, position })).to.throw();
	});
	it('should throw error if position is not specified', () => {
		expect(() => new Missile({ ammo, direction })).to.throw();
	});

	describe('And when I work with the properties', () => {
		let missile;
		beforeEach(() => {
			missile = new Missile({ ammo, direction, position });
		});
		it('should have a read-only ammoSpeed property', () => {
			expect(missile.ammoSpeed).to.equal(ammo.speed);
			expect(() => missile.ammoSpeed = 10).to.throw();
		});

		it('should NOT have an ammo property', () => {
			expect(missile).to.not.have.property('ammo');
		});

		it('should have a read-only direction property', () => {
			expect(missile.direction).to.be.an.instanceof(Position);
			expect(missile.direction.x).to.equal(1);
			expect(missile.direction.y).to.equal(0);
			expect(() => missile.direction = new Position(0, 1)).to.throw();
		});

		it('should have a read-only position property', () => {
			expect(missile.position).to.be.an.instanceof(Position);
			expect(missile.position.x).to.equal(0);
			expect(missile.position.y).to.equal(0);
			expect(() => missile.position = new Position(1, 1)).to.throw();
		});

		it('should have a read-only ammoDamage property', () => {
			expect(missile.ammoDamage).to.equal(ammo.damage);
			expect(() => missile.ammoDamage = 30).to.throw();
		});

		it('should have a read-only ammoType property', () => {
			expect(missile.ammoType).to.equal(ammo.type);
			expect(() => missile.ammoType = AmmoType.BULLET).to.throw();
		});
	});

	// TODO Not sure how to implament moving. This may be figured out when graphics are implemented
	xdescribe('And when I work with methods', () => {
		it('should move the missile', () => {});
	});

	// TODO NOt sure how to test this yet
	xdescribe('And when I work with events', () => {
		it('should send an event when it hits something', () => {});
		it('should receive an event that it was hit', () => {});
	});
});

