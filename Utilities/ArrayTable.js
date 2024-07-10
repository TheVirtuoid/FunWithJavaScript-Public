import Table from "./Table.js";

export default class ArrayTable {

	static extractHeaders(array, includeIndex) {
		const headers = Object.keys(array[0]);
		if (includeIndex) {
			headers.unshift('index');
		}
		return headers;
	}

	static extractData(array, includeIndex) {
		return array.map((row, index) => {
			const rowValues = Object.values(row);
			if (includeIndex) {
				rowValues.unshift(index);
			}
			return rowValues;
		});
	}

	static render(array, includeIndex = false) {
		const header = ArrayTable.extractHeaders(array, includeIndex);
		const data = ArrayTable.extractData(array, includeIndex);
		const table = new Table({ header, data });
		table.render();
	}
}