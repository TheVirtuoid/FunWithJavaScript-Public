import Engine from "../../src/classes/Engine/Engine.js";
import Table from "../../src/classes/Table/Table.js";
import CutType from "../../src/classes/support/CutType.js";

describe('When I send communications to the Table', () => {
	let engine;
	let table;
	beforeEach(() => {
		engine = new Engine();
		table = engine.addTable();
	});

	it('should create a new Table', () => {
		expect(table).to.be.instanceOf(Table);
	});

	it('should NOT expect a notification if the move was valid', () => {});

	it('should except an updated position if the move was invalid', () => {});

	it('should get the number of pieces', () => {});

});