import Table from "./Table.js";

export default class SetTable {

	static extractHeaders(set) {
		return ['Value'];
	}

	static extractData(set) {
		const data = [...set.values()];
		return data.map((value) => [value]);
	}

	static render(set) {
		const header = SetTable.extractHeaders(set);
		const data = SetTable.extractData(set);
		const table = new Table({ header, data });
		table.render();
	}
}