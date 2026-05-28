export default class Size {
	static SMALL = Symbol('small');
	static MEDIUM = Symbol('medium');
	static LARGE = Symbol('large');

	static SYMBOLS = [Size.SMALL, Size.MEDIUM, Size.LARGE];

	static IsSize(sizeType) {
		return Size.SYMBOLS.includes(sizeType);
	}
	
	constructor() {
		throw new Error('Size cannot be instantiated');
	}
}