import Mineral from "../Mineral/Mineral.js";

export default class Alloy {

	static IGNISIUM = Symbol('Ignisium');
	static PHOTONIUM = Symbol('Photonium');
	static VOIDTISSUM = Symbol('Voidtissium');
	static SOLTARIUM = Symbol('Soltarium');
	static MAGNANIUM = Symbol('Magnanium');
	static ETHERIUM = Symbol('Etherium');
	static STARFORGE = Symbol('Starforge');

	static TYPES = [
		Alloy.IGNISIUM,
		Alloy.PHOTONIUM,
		Alloy.VOIDTISSUM,
		Alloy.SOLTARIUM,
		Alloy.MAGNANIUM,
		Alloy.ETHERIUM,
		Alloy.STARFORGE
	];

	static #INGREDIENTS = new Map([
		[Alloy.IGNISIUM, new Map([[Mineral.AETHERITE, 3], [Mineral.PYROTITE, 1]])],
		[Alloy.PHOTONIUM, new Map([[Mineral.AETHERITE, 5], [Mineral.LUMINITE, 1]])],
		[Alloy.VOIDTISSUM, new Map([[Mineral.AETHERITE, 7], [Mineral.OBSIDIANITE, 1]])],
		[Alloy.SOLTARIUM, new Map([[Mineral.PYROTITE, 2], [Mineral.LUMINITE, 1]])],
		[Alloy.MAGNANIUM, new Map([[Mineral.PYROTITE, 4], [Mineral.OBSIDIANITE, 1]])],
		[Alloy.ETHERIUM, new Map([[Mineral.LUMINITE, 9], [Mineral.ZENITHITE, 1]])],
		[Alloy.STARFORGE, new Map([[Mineral.PYROTITE, 12], [Mineral.LUMINITE, 7], [Mineral.ZENITHITE, 1]])]
	]);

	static Has(element) {
		return Alloy.TYPES.includes(element);
	}

	static Ingredients(alloy) {
		if (!Alloy.Has(alloy)) {
			throw new Error(`Invalid alloy type: ${alloy}`);
		}
		return Alloy.#INGREDIENTS.get(alloy);
	}

	#type;
	#purity;
	#id;

	constructor(args = {}) {
		const { type, purity } = args;
		if (!Alloy.Has(type)) {
			throw new Error(`Invalid alloy type: ${type}`);
		}
		if (isNaN(purity) || (purity < 0 || purity > 100)) {
			throw new Error(`Invalid alloy purity: ${purity}`);
		}
		this.#id = window.crypto.randomUUID();
		this.#type = type;
		this.#purity = purity;
	}

	get id() {
		return this.#id;
	}

	get type() {
		return this.#type;
	}

	get purity() {
		return this.#purity;
	}
}