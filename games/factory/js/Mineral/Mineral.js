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

	constructor() {
		throw new Error('Cannot instantiate abstract class');
	}
}