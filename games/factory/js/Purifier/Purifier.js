import Mineral from "../Mineral/Mineral.js";
import Base from "../Base/Base.js";

export default class Purifier extends Base {
	static AETHERITE = Symbol('purifier-aetherite');
	static PYROTITE = Symbol('purifier-pyrotite');
	static LUMINITE = Symbol('purifier-luminite');
	static OBSIDIANITE = Symbol('purifier-obsidianite');
	static ZENITHITE = Symbol('purifier-zenithite');

	static TYPES = [
		Purifier.AETHERITE,
		Purifier.PYROTITE,
		Purifier.LUMINITE,
		Purifier.OBSIDIANITE,
		Purifier.ZENITHITE
	];

	static Has = (element) => Purifier.TYPES.includes(element);

	static SYMBOLS = new Map([
		[Purifier.AETHERITE.description, Purifier.AETHERITE],
		[Purifier.PYROTITE.description, Purifier.PYROTITE],
		[Purifier.LUMINITE.description, Purifier.LUMINITE],
		[Purifier.OBSIDIANITE.description, Purifier.OBSIDIANITE],
		[Purifier.ZENITHITE.description, Purifier.ZENITHITE]
	])


	constructor(args = {}) {
		super(args);
	}

	purify(mineral) {
		if (!(mineral instanceof Mineral)) {
			throw new Error('Purifier.purify() requires a Mineral');
		}
		mineral.purify(this.level);
	}
}