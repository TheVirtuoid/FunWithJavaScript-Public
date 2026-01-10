export default class Mineral {

	static AETHERITE = Symbol('aetherite');
	static PYROTITE = Symbol('pyrotite');
	static LUMINUM = Symbol('luminum');
	static OBSIDIANITE = Symbol('obsidianite');
	static ZENITHIUM = Symbol('zenithium');

	static TYPES = [
		Mineral.AETHERITE,
		Mineral.PYROTITE,
		Mineral.LUMINUM,
		Mineral.OBSIDIANITE,
		Mineral.ZENITHIUM
	];

	static Has(element) {
		return Mineral.TYPES.includes(element);
	}

	#type;
	#purity;

	constructor(args = {}) {
		const { type } = args;
		if (!Mineral.Has(type)) {
			throw new Error(`Invalid mineral type: ${type}`);
		}
		this.#type = type;
		this.#purity = 10;
	}

	get type() {
		return this.#type;
	}

	get purity() {
		return this.#purity;
	}
}