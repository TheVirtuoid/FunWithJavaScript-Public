import Engine from "../../src/classes/Engine/Engine.js";

describe('When I create a new Engine', () => {
	it('should create no table', () => {
		const engine = new Engine();
		expect(engine.table).to.be.null;
	});
});