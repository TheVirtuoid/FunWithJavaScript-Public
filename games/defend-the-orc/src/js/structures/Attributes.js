import Attribute from "./Attribute.js";
import {attributes, isAttribute} from "../../../defend-the-orc.config.js";

export default class Attributes {
	#data;

	constructor(args = []) {
		this.#data = new Map();
		args.forEach(([id, value]) => {
			if (isAttribute(id)) {
				const name = attributes.get(id).name;
				this.#data.set(id, new Attribute({ id, name, value }));
			}
		});
	}

	getValue(id) {
		return this.#data.get(id)?.value;
	}

	setValue(id, value) {
		const attribute = this.#data.get(id);
		if (attribute) {
			attribute.setValue(value);
			this.#data.set(id, attribute);
			return value;
		}
	}
}