import WorldData from "./WorldData.js";

describe("WorldData", function() {
	it('should create a new WorldData', () => {
		const worldData = new WorldData();
		expect(worldData).to.be.instanceOf(WorldData);
		expect(WorldData.IsEmpty(worldData)).to.be.true;
		expect(worldData.ground).to.be.null;
		expect(worldData.building).to.be.null;
	});

	it('should add a building', () => {});


})