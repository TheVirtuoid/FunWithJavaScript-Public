export default class Size {
	static SMALL = Symbol('small');
	static MEDIUM = Symbol('medium');
	static LARGE = Symbol('large');

	static SYMBOLS = [Size.SMALL, Size.MEDIUM, Size.LARGE];

	static #DATA = new Map([
		[Size.SMALL, { name: Size.SMALL.description, abbr: 'sm' }],
		[Size.MEDIUM, { name: Size.MEDIUM.description, abbr: 'md' }],
		[Size.LARGE, { name: Size.LARGE.description, abbr: 'lg' }],
	]);

	static IsSize(sizeType) {
		const sizeSymbol = typeof sizeType === 'string' ? Size.#getSymbolByAbbreviation(sizeType) : sizeType;
		return Size.SYMBOLS.includes(sizeSymbol);
	}

	static GetSize(sizeType) {
		const sizeSymbol = typeof sizeType === 'string' ? Size.#getSymbolByAbbreviation(sizeType) : sizeType;
		return structuredClone(Size.#DATA.get(sizeSymbol));
	}

	static GetSymbol(sizeType) {
		const sizeSymbol = typeof sizeType === 'string' ? Size.#getSymbolByAbbreviation(sizeType) : sizeType;
		return Size.IsSize(sizeSymbol) ? sizeSymbol : undefined;
	}

	static #getSymbolByAbbreviation(abbr) {
		const dataEntry = [...Size.#DATA.entries()].find(([key, value]) => value.abbr === abbr);
		return dataEntry ? dataEntry[0] : dataEntry;
	}




	constructor() {
		throw new Error('Size cannot be instantiated');
	}
}