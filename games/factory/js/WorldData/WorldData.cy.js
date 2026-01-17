import WorldData from "./WorldData.js";
import Extractor from "../Extractor/Extractor.js";
import Purifier from "../Purifier/Purifier.js";

describe("WorldData", function() {
	it('should create a new WorldData', () => {
		const worldData = new WorldData();
		expect(worldData).to.be.instanceOf(WorldData);
		expect(WorldData.IsEmpty(worldData)).to.be.true;
		expect(worldData.ground).to.be.null;
		expect(worldData.building).to.be.null;
	});

	it('sohuld throw error if ground specified is not groundtype', () => {
		expect(() => new WorldData({ ground: 'bad' })).to.throw();
	});

	it('should create a worldData with the ground set', () => {
		const worldData = new WorldData({ ground: WorldData.GROUND_NORMAL });
		expect(worldData.ground).to.equal(WorldData.GROUND_NORMAL);
	});

	describe('Properties', () => {
		let worldData;
		beforeEach(() => {
			worldData = new WorldData();
		})
		it('should throw error trying to change ground', () => {
			expect(() => worldData.ground = 'new ground').to.throw();
		});
		it('should throw error trying to change building', () => {
			expect(() => worldData.building = 'new building').to.throw();
		});
	})

	describe('Methods', () => {
		let worldData;
		beforeEach(() => {
			worldData = new WorldData();
		});
		describe('addBuilding()', () => {
			it('should throw error if building is not a BuildingType', () => {
				expect(() => worldData.addBuilding('bad')).to.throw();
			});

			it('should add the building to the worldData', () => {
				worldData.addBuilding(Extractor.AETHERITE);
				expect(worldData.building).to.equal(Extractor.AETHERITE);
			});

			it('should throw error if there is already a building there', () => {
				worldData.addBuilding(Extractor.AETHERITE);
				expect(() => worldData.addBuilding(Purifier.AETHERITE)).to.throw();
			});
		});
	})


})