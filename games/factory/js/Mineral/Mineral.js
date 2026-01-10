import Base from "../Base/Base.js";

export default class Mineral extends Base{

	static AETHERITE = Symbol('aetherite');
	static PYROTITE = Symbol('pyrotite');
	static LUMINITE = Symbol('luminite');
	static OBSIDIANITE = Symbol('obsidianite');
	static ZENITHITE = Symbol('zenithite');

	static TYPES = [
		Mineral.AETHERITE,
		Mineral.PYROTITE,
		Mineral.LUMINITE,
		Mineral.OBSIDIANITE,
		Mineral.ZENITHITE
	];

	static Has(element) {
		return Mineral.TYPES.includes(element);
	}

	#purity;

	constructor(args = {}) {
		const { type } = args;
		if (!Mineral.Has(type)) {
			throw new Error(`Invalid mineral type: ${type}`);
		}
		super(args);
		this.#purity = 10;
	}

	get purity() {
		return this.#purity;
	}

	purify(level = 1) {
		console.warn('Mineral.purify() is not currently implemented');
		this.#purity += level;
	}
}