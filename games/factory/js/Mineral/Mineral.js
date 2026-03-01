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

	static Has = (element) => Mineral.TYPES.includes(element);

	static HasDescription = (description) => [...Mineral.DESCRIPTIONS].some((data) => data[1] === description);

	static DESCRIPTIONS = new Map([
		[Mineral.AETHERITE, Mineral.AETHERITE.description],
		[Mineral.PYROTITE, Mineral.PYROTITE.description],
		[Mineral.LUMINITE, Mineral.LUMINITE.description],
		[Mineral.OBSIDIANITE, Mineral.OBSIDIANITE.description],
		[Mineral.ZENITHITE, Mineral.ZENITHITE.description],
	]);

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

	#oreImage;
	#pureImage;
	#depositImage;
	#oreTexture;
	#pureTexture;
	#depositTexture;


	constructor(args = {}) {
		const { type, oreTexture, pureTexture, depositTexture } = args;
		if (!Mineral.Has(type)) {
			throw new Error(`Invalid mineral type: ${type}`);
		}
		super(args);
		this.#oreTexture = oreTexture;
		this.#pureTexture = pureTexture;
		this.#depositTexture = depositTexture;
	}

	purify(level = 1) {
		console.warn('Mineral.purify() is not currently implemented');
	}

	get oreImage() {
		return this.#oreImage;
	}

	get pureImage() {
		return this.#pureImage;
	}

	get depositImage() {
		return this.#depositImage;
	}

	get oreTexture() {
		return this.#oreTexture;
	}

	get pureTexture() {
		return this.#pureTexture;
	}

	get depositTexture() {
		return this.#depositTexture;
	}


	setOreImage(oreImage) {
		this.#oreImage = oreImage;
	}

	setPureImage(pureImage) {
		this.#pureImage = pureImage;
	}

	setDepositImage(depositImage) {
		this.#depositImage = depositImage;
	}

}