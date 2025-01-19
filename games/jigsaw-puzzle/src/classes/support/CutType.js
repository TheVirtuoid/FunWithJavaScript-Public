export default class CutType {
	static NONE = Symbol();

	constructor() {
		throw new Error('CutType is a singleton and cannot be instantiated');
	}
}