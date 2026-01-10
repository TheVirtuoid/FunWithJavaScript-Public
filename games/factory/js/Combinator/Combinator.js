import Alloy from "../Alloy/Alloy.js";
import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Combinator extends Base {

	#capacity;
	#inventory;

	constructor(args = {}) {
		const { type } = args;
		if (!Alloy.Has(type)) {
			throw new Error('Invalid alloy type provided');
		}
		super(args);
		this.#capacity = 100;
		this.#inventory = new Map();
	}

	get capacity() {
		return this.#capacity;
	}

	get inventorySize() {
		return [...this.#inventory].reduce((accumulator, [mineral, count]) => accumulator + count, 0);
	}

	combine(minerals) {
		if (!Array.isArray(minerals)) {
			throw new Error('Combinator.combine() requires an array of minerals');
		}
		if (minerals.some(mineral => !Mineral.Has(mineral))) {
			throw new Error('Invalid minerals provided');
		}
		if (this.inventorySize + minerals.length > this.capacity) {
			throw new Error('Inventory full');
		}
		minerals.forEach(mineral => {
			const count = this.#inventory.get(mineral) ?? 0;
			this.#inventory.set(mineral, count + 1);
		});
		const alloyRecipe = Alloy.Ingredients(this.type);
		if ([...alloyRecipe].every(([mineral, count]) => this.#inventory.get(mineral) >= count)) {
			[...alloyRecipe].forEach(([mineral, count]) => this.#inventory.set(mineral, this.#inventory.get(mineral) - count));
			// TODO: Purity
			return new Alloy({ type: this.type, purity: 0 });
		} else {
			return undefined;
		}
	}
}