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

	static NAMES = new Map([
		[Mineral.AETHERITE, `mineral-${ Mineral.AETHERITE.description }`],
		[Mineral.PYROTITE, `mineral-${ Mineral.PYROTITE.description }`],
		[Mineral.LUMINITE, `mineral-${ Mineral.LUMINITE.description }`],
		[Mineral.OBSIDIANITE, `mineral-${ Mineral.OBSIDIANITE.description }`],
		[Mineral.ZENITHITE, `mineral-${ Mineral.ZENITHITE.description }`],
	]);

	static SYMBOLS = new Map([
		[`mineral-${ Mineral.AETHERITE.description }`, Mineral.AETHERITE],
		[`mineral-${ Mineral.PYROTITE.description }`, Mineral.PYROTITE],
		[`mineral-${ Mineral.LUMINITE.description }`, Mineral.LUMINITE],
		[`mineral-${ Mineral.OBSIDIANITE.description }`, Mineral.OBSIDIANITE],
		[`mineral-${ Mineral.ZENITHITE.description }`, Mineral.ZENITHITE],
	]);

	static PRICE_RAW = new Map([
		[Mineral.AETHERITE, 1],
		[Mineral.PYROTITE, 2],
		[Mineral.LUMINITE, 4],
		[Mineral.OBSIDIANITE, 8],
		[Mineral.ZENITHITE, 16],
	]);

	static PRICE_PURIFIED = new Map([
		[Mineral.AETHERITE, 4],
		[Mineral.PYROTITE, 8],
		[Mineral.LUMINITE, 16],
		[Mineral.OBSIDIANITE, 32],
		[Mineral.ZENITHITE, 64],
	])

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