export default class CutType {
	static NONE = Symbol();
	static SQUARE = Symbol();

	static get values() {
		return [
			CutType.NONE,
			CutType.SQUARE,
		];
	}

	static valid(cutType) {
		return CutType.values.includes(cutType);
	}

	constructor() {
		throw new Error('CutType is a singleton and cannot be instantiated');
	}

}