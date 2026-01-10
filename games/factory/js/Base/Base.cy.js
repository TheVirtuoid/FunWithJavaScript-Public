import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Base from "./Base.js";

describe('Base class', () => {
	describe('constructor', () => {
		it('should construct a new instance with defaults', () => {
			const base = new Base();
			expect(base).to.be.instanceOf(Base);
			expect(base.id).to.be.a('string');
			expect(base.type).to.be.undefined;
			expect(base.level).to.equal(1);
			expect(base.position.equals(new Vector2d(0, 0))).to.be.true;
		});
	});

	describe('Properties', () => {
		let base;
		beforeEach(() => {
			base = new Base();
		})
		it('should throw error setting id', () => {
			expect(() => base.id = 'newId').to.throw();
		});
		it('should throw error setting level', () => {
			expect(() => base.level = 2).to.throw();
		});
		it('should throw error setting position', () => {
			expect(() => base.position = new Vector2d(1, 1)).to.throw();
		});

	});

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
		});

		it('should increment the level', () => {
			const level = base.level;
			base.incrementLevel();
			expect(base.level).to.equal(level + 1);
		});
	});
});