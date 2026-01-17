import World from "./World.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import WorldData from "../WorldData/WorldData.js";

describe("World", function() {
	it('should create the world', () => {
		const world = new World();
		expect(world).to.be.instanceOf(World);
		expect(world.unitWidth).to.equal(World.UNIT_WIDTH);
		expect(world.unitHeight).to.equal(World.UNIT_HEIGHT);
		expect(world.unitSize).to.equal(World.UNIT_SIZE);
		expect(world.id).to.be.a('string');
	});

	describe('Properties', () => {
		let world;
		beforeEach(() => {
			world = new World();
		})

		it('should throw error if trying to change unitWidth', () => {
			expect(() => world.unitWidth = 2).to.throw();
		});
		it('should throw error if trying to change unitHeight', () => {
			expect(() => world.unitHeight = 2).to.throw();
		});
		it('should throw error if trying to change unitSize', () => {
			expect(() => world.unitSize = 2).to.throw();
		});
		it('should throw error if trying to change id', () => {
			expect(() => world.id = 'newId').to.throw();
		});
	});

	describe('Methods', () => {
		let world;
		beforeEach(() => {
			world = new World();
		});

		describe('getPosition()', () => {
			it('should throw error if argument is not a Vector2d', () => {
				expect(() => world.getPosition('bad')).to.throw();
			});

			it('should get the data for the a position in the world', () => {
				const data = world.getPosition(new Vector2d(1, 1));
				expect(data).to.be.instanceOf(WorldData);
			});

			it('should return undefined if the position is not in the world', () => {
				expect(world.getPosition(new Vector2d(-1, -1))).to.be.undefined;
			});

		});
	});
})