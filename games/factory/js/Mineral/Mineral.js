export default class Mineral {

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

	#type;
	#purity;
	#id;

	constructor(args = {}) {
		const { type } = args;
		if (!Mineral.Has(type)) {
			throw new Error(`Invalid mineral type: ${type}`);
		}
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#purity = 10;
	}

	get type() {
		return this.#type;
	}

	get purity() {
		return this.#purity;
	}

	get id() {
		return this.#id;
	}

	purify(level = 1) {
		console.warn('Mineral.purify() is not currently implemented');
		this.#purity += level;
	}
}