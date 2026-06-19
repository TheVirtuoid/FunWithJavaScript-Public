import {readSchemaProperties} from "../Utilities/utilities.js";

const properties = readSchemaProperties('./databases/schemas/RaceData.schema.json');

export default class RaceData {

	#data = {};

	constructor(data) {
		properties.forEach((property) => {
			const { key, type } = property;
			Object.defineProperty(this, key, {
				get: function() {
					return this.#data[key];
				},
				enumerable: true
			});
			if (data && data[key]) {
				if (type === 'null' && data[key] === null) this.#data[key] = null;
				else if (type === 'array' && Array.isArray(data[key])) this.#data[key] = data[key];
				else if (type === typeof data[key]) this.#data[key] = data[key];
			}
		});
	}
}