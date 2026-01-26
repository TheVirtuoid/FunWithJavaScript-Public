import Stats from "./Stats.js";
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";
import Conveyor from "../Conveyor/Conveyor.js";

describe('Stats', function() {
	describe('constructor', () => {
		it('should create a new stats object', () => {
			const stats = new Stats();
			expect(stats).to.be.instanceOf(Stats);
			expect(stats.cash).to.equal(-1);
			expect(stats.inventory).to.exist;
			expect(stats.level).to.equal(0);
			expect(stats.cursorPosition.equals(new Vector2d(-1, -1))).to.be.true;
			expect(stats.started).to.be.false;
			expect(stats.id).to.be.a('string');
		});
	});

	describe('Properties', () => {
		let stats;
		beforeEach(() => {
			stats = new Stats();
		});

		it('should throw error if trying to change cash', () => {
			expect(() => stats.cash = 2).to.throw();
		});

		it('should throw error if trying to change inventory', () => {
			expect(() => stats.inventory = []).to.throw();
		});

		it('should throw error if trying to change level', () => {
			expect(() => stats.level = 2).to.throw();
		});

		it('should throw error if trying to change cursorPosition', () => {
			expect(() => stats.cursorPosition = new Vector2d(1, 1)).to.throw();
		});

		it('should throw error if trying to change started', () => {
			expect(() => stats.started = true).to.throw();
		});

		it('should throw error if trying to change id', () => {
			expect(() => stats.id = 'newId').to.throw();
		});
	});

	describe('Methods', () => {
		let stats;
		beforeEach(() => {
			stats = new Stats();
		});

		describe('start()', () => {
			it('should set the values to default', () => {
				stats.start();
				expect(stats.cash).to.equal(Stats.CASH_START);
				expect(stats.level).to.equal(Stats.LEVEL_START);
				expect(stats.cursorPosition.equals(Stats.CURSOR_POSITION_START)).to.be.true;
				expect([...stats.inventory.values()].every(quantity => quantity === 0)).to.be.true;
				expect(stats.started).to.be.true;
			});
		});

		describe('setCursorPosition()', () => {
			it('should throw error if position is not a Vector2d', () => {
				stats.start();
				expect( () => stats.setCursorPosition('bad')).to.throw();
			});
			/*it('should throw error if game is not in progress', () => {
				expect(() => stats.setCursorPosition(new Vector2d(1, 1))).to.throw();
			});*/
			it('should set the cursor position', () => {
				stats.start();
				stats.setCursorPosition(new Vector2d(1, 1));
				expect(stats.cursorPosition.equals(new Vector2d(1, 1))).to.be.true;
			});
		});

		describe('updateCash', () => {
			it('should throw error if argument is not a number', () => {
				stats.start();
				expect(() => stats.updateCash('bad')).to.throw();
			});
			it('should throw error if game has not started', () => {
				expect(() => stats.updateCash(100)).to.throw();
			});
			it('should update the cash', () => {
				stats.start();
				stats.updateCash(100);
				expect(stats.cash).to.equal(Stats.CASH_START + 100);
			})
		});

		describe('updateInventory()', () => {
			it('should throw error if item is not an official item', () => {
				stats.start();
				expect(() => stats.updateInventory('bad', 10)).to.throw();
			});
			it('should throw error if amount is not a number', () => {
				stats.start();
				expect(() => stats.updateInventory(Conveyor.STRAIGHT, 'bad')).to.throw();
			});
			it('should throw error if game has not started', () => {
				expect(() => stats.updateInventory(Conveyor.STRAIGHT, 10)).to.throw();
			});
			it('should update the inventory', () => {
				stats.start();
				stats.updateInventory(Conveyor.STRAIGHT, 10);
				expect(stats.inventory.get(Conveyor.STRAIGHT)).to.equal(10);
			});
		});

		describe('incrementLevel', () => {
			it('should throw error if game has not started', () => {
				expect(() => stats.incrementLevel()).to.throw();
			});
			it('should increment the level', () => {
				stats.start();
				const oldLevel = stats.level;
				stats.incrementLevel();
				expect(stats.level).to.equal(oldLevel + 1);
			});
		});
	});

	describe('Events', () => {});
})