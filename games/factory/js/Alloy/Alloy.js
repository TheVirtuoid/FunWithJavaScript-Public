import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Alloy extends Base {

	static IGNISIUM = Symbol('ignisium');
	static PHOTONIUM = Symbol('photonium');
	static VOIDTISSIUM = Symbol('voidtissium');
	static SOLTARIUM = Symbol('soltarium');
	static MAGNANIUM = Symbol('magnanium');
	static ETHERIUM = Symbol('etherium');
	static STARFORGE = Symbol('starforge');

	static TYPES = [
		Alloy.IGNISIUM,
		Alloy.PHOTONIUM,
		Alloy.VOIDTISSIUM,
		Alloy.SOLTARIUM,
		Alloy.MAGNANIUM,
		Alloy.ETHERIUM,
		Alloy.STARFORGE
	];

	static #INGREDIENTS = new Map([
		[Alloy.IGNISIUM, new Map([[Mineral.AETHERITE, 3], [Mineral.PYROTITE, 1]])],
		[Alloy.PHOTONIUM, new Map([[Mineral.AETHERITE, 5], [Mineral.LUMINITE, 1]])],
		[Alloy.VOIDTISSIUM, new Map([[Mineral.AETHERITE, 7], [Mineral.OBSIDIANITE, 1]])],
		[Alloy.SOLTARIUM, new Map([[Mineral.PYROTITE, 2], [Mineral.LUMINITE, 1]])],
		[Alloy.MAGNANIUM, new Map([[Mineral.PYROTITE, 4], [Mineral.OBSIDIANITE, 1]])],
		[Alloy.ETHERIUM, new Map([[Mineral.LUMINITE, 9], [Mineral.ZENITHITE, 1]])],
		[Alloy.STARFORGE, new Map([[Mineral.PYROTITE, 12], [Mineral.LUMINITE, 7], [Mineral.ZENITHITE, 1]])]
	]);

/*	static PRICE_PURIFIED = new Map([
		[Alloy.IGNISIUM, (Mineral.PRICE_PURIFIED.get(Mineral.AETHERITE) * 3 + Mineral.PRICE_PURIFIED.get(Mineral.PYROTITE) * 1) * 1.5],
		[Alloy.PHOTONIUM, (Mineral.PRICE_PURIFIED.get(Mineral.AETHERITE) * 5 + Mineral.PRICE_PURIFIED.get(Mineral.LUMINITE) * 1) * 1.5],
		[Alloy.VOIDTISSIUM, (Mineral.PRICE_PURIFIED.get(Mineral.AETHERITE) * 7 + Mineral.PRICE_PURIFIED.get(Mineral.OBSIDIANITE) * 1) * 1.5],
		[Alloy.SOLTARIUM, (Mineral.PRICE_PURIFIED.get(Mineral.PYROTITE) * 2 + Mineral.PRICE_PURIFIED.get(Mineral.LUMINITE) * 1) * 1.5],
		[Alloy.MAGNANIUM, (Mineral.PRICE_PURIFIED.get(Mineral.PYROTITE) * 4 + Mineral.PRICE_PURIFIED.get(Mineral.OBSIDIANITE) * 1) * 1.5],
		[Alloy.ETHERIUM, (Mineral.PRICE_PURIFIED.get(Mineral.LUMINITE) * 9 + Mineral.PRICE_PURIFIED.get(Mineral.ZENITHITE) * 1) * 1.5],
		[Alloy.STARFORGE, (Mineral.PRICE_PURIFIED.get(Mineral.PYROTITE) * 12 + Mineral.PRICE_PURIFIED.get(Mineral.LUMINITE) * 7 + Mineral.PRICE_PURIFIED.get(Mineral.ZENITHITE * 1)) * 1.5],
	]);*/

	#activeImage;

	static Has(element) {
		return Alloy.TYPES.includes(element);
	}

	static Ingredients(alloy) {
		if (Alloy.Has(alloy)) {
			return Alloy.#INGREDIENTS.get(alloy);
		}
	}

	constructor(args = {}) {
		const { type } = args;
		if (!Alloy.Has(type)) {
			throw new Error(`Invalid alloy type: ${type}`);
		}
		super(args);
	}

	get activeImage() {
		return this.#activeImage;
	}

	setActiveImage(activeImage) {
		this.#activeImage = activeImage;
	}
}