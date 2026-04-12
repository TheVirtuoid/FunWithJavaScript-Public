import Base from "../Base/Base.js";

export default class Mineral extends Base{

	static AETHERITE = Symbol('aetherite');
	static PYROTITE = Symbol('pyrotite');
	static LUMINITE = Symbol('luminite');
	static OBSIDIANITE = Symbol('obsidianite');
	static ZENITHITE = Symbol('zenithite');

	static ORE_PARENT_EXTRACTOR = Symbol('ore_parent_extractor');
	static ORE_PARENT_PURIFIER = Symbol('ore_parent_purifier');

	static TYPES = [
		Mineral.AETHERITE,
		Mineral.PYROTITE,
		Mineral.LUMINITE,
		Mineral.OBSIDIANITE,
		Mineral.ZENITHITE
	];

	static Has = (element) => Mineral.TYPES.includes(element);

	#oreImage;
	#depositImage;
	#oreTexture;
	#pureTexture;
	#depositTexture;

	#activeImage;

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

	get oreImage() {
		return this.#oreImage;
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

	get activeImage() {
		return this.#activeImage;
	}

	setActiveImage(activeImage) {
		this.#activeImage = activeImage;
	}

	setOreImage(oreImage) {
		this.#oreImage = oreImage;
	}

	setDepositImage(depositImage) {
		this.#depositImage = depositImage;
	}

}