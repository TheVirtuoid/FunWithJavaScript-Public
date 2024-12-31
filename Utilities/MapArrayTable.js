import Table from "./Table.js";

export default class MapArrayTable {

	static extractHeaders(array, includeIndex) {
		// const headers = Object.keys(array[0]);
		const headers = ['Key', 'Data'];
		if (includeIndex) {
			headers.unshift('index');
		}
		return headers;
	}

	static extractData(array, includeIndex) {
		return array.map((row, index) => {
			// const rowValues = Object.values(row);
			const rowValues = [row[0], JSON.stringify(row[1])];
			if (includeIndex) {
				rowValues.unshift(index);
			}
			return rowValues;
		});
	}

	static render(array, includeIndex = false) {
		const header = MapArrayTable.extractHeaders(array, includeIndex);
		const data = MapArrayTable.extractData(array, includeIndex);
		const table = new Table({ header, data });
		table.render();
	}
}