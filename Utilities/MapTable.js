import Table from "./Table.js";

export default class MapTable {

	static extractHeaders(map) {
		return ['Key', 'Value'];
	}

	static extractData(map) {
		const keys = [...map.keys()];
		return keys.map((key) => {
			const value = map.get(key);
			return [key, typeof value === 'object' ? JSON.stringify(value) : value];
		});
	}

	static render(map) {
		const header = MapTable.extractHeaders(map);
		const data = MapTable.extractData(map);
		const table = new Table({ header, data });
		table.render();
	}
}