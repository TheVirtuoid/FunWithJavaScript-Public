import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Base from "./Base.js";

describe('Base class', () => {
	describe('constructor', () => {
		it('should construct a new instance with defaults', () => {
			const base = new Base();
			expect(base).to.be.instanceOf(Base);
			expect(base.id).to.be.a('string');
			expect(base.type).to.be.undefined;
			expect(base.position.equals(new Vector2d(0, 0))).to.be.true;
		});
	});

	describe('Properties', () => {});

	describe('Methods', () => {
		let base;
		beforeEach(() => {
			base = new Base();
		});

		it('should throw exception if setPosition is not sent a Vector2d', () => {
			expect(() => base.setPosition('bad')).to.throw();
		});

		it('should set the position', () => {
			const newPosition = new Vector2d(1, 1);
			base.setPosition(newPosition);
			expect(base.position.equals(newPosition)).to.be.true;
		})
	});
});