import LayoutDb from "../databases/LayoutDb/LayoutDb.js";

export default class Layout {
	#id;
	#name;
	#description;
	#layoutId;
	#layout;

	constructor(args = {}) {
		this.#id = args.id || window?.crypto.randomUUID() || '';
		this.#name = args.name || '';
		this.#description = args.description || '';
		this.#layoutId = args.layoutId || '';
		this.#layout = null;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get layoutId() {
		return this.#layoutId;
	}

	get layout() {
		return this.#layout;
	}

	getLayout(layoutId = this.#layoutId) {
		if (layoutId === this.#layoutId && this.layout) {
			return this.layout;
		}
		const newLayout = LayoutDb.getLayoutById(layoutId) || null
		if (newLayout) {
			this.#layout = newLayout;
			this.#layoutId = layoutId;
		} else {
			return undefined;
		}
		return this.layout;
	}

}