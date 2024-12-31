import Table from "./Table.js";

export default class ArraySimpleTable {

	static extractHeaders(set, includeIndex = false) {
		const headers = ['Value'];
		if (includeIndex) {
			headers.unshift('Index');
		}
		return headers;
	}

	static extractData(array, includeIndex = false) {
		return array.map((row, index) => {
			const rowValues = [row];
			if (includeIndex) {
				rowValues.unshift(index);
			}
			return rowValues;
		});
	}

	static render(array, includeIndex = false) {
		const header = ArraySimpleTable.extractHeaders(array, includeIndex);
		const data = ArraySimpleTable.extractData(array, includeIndex);
		const table = new Table({ header, data });
		table.render();
	}
}