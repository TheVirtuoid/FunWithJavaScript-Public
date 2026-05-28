export default class Money {

	static PLATINUM = Symbol('platinum');
	static GOLD = Symbol('gold');
	static ELECTRUM = Symbol('electrum');
	static SILVER = Symbol('silver');
	static COPPER = Symbol('copper');

	static SYMBOLS = [Money.PLATINUM, Money.GOLD, Money.ELECTRUM, Money.SILVER, Money.COPPER];

	static #DATA = new Map([
		[Money.PLATINUM, { name: 'Platinum piece', abbr: 'pp', exchangeRate: [5, 'gp'] }],
		[Money.GOLD, { name: 'Gold piece', abbr: 'gp', exchangeRate: [10, 'sp'] }],
		[Money.ELECTRUM, { mame: 'Electrum piece', abbr: 'ep', exchangeRate: [5, 'sp'] }],
		[Money.SILVER, { name: "Silver piece", abbr: 'sp', exchangeRate: [5, 'cp'] }],
		[Money.COPPER, { name: "Copper piece", abbr: 'cp', exchangeRate: [1, null]}]
	]);

	static GetMoney(moneyType) {
		const moneySymbol = typeof moneyType === 'string' ? Money.#getSymbolByAbbreviation(moneyType) : moneyType;
		return structuredClone(Money.#DATA.get(moneySymbol));
	}

	static #getSymbolByAbbreviation(abbr) {
		const dataEntry = [...Money.#DATA.entries()].find(([key, value]) => value.abbr === abbr);
		return dataEntry ? dataEntry[0] : dataEntry;
	}

	static IsMoney(moneyType) {
		const moneySymbol = typeof moneyType === 'string' ? Money.#getSymbolByAbbreviation(moneyType) : moneyType;
		return Money.SYMBOLS.includes(moneySymbol);
	}

	static GetExchangeRate(amount, typeFrom, typeTo) {
		const symbolFrom = typeof typeFrom === 'string' ? Money.#getSymbolByAbbreviation(typeFrom) : typeFrom;
		const symbolTo = typeof typeTo === 'string' ? Money.#getSymbolByAbbreviation(typeTo) : typeTo;
		if (!Money.IsMoney(symbolFrom) || !Money.IsMoney(symbolTo)) {
			return undefined;
		}
		if (symbolFrom === symbolTo) {
			return amount;
		}
		const rateFromToBase = Money.#getConversionToBase(symbolFrom);
		const rateToToBase = Money.#getConversionToBase(symbolTo);
		if (rateFromToBase === null || rateToToBase === null) {
			return undefined;
		}
		return (amount * rateFromToBase) / rateToToBase;
	}

	// This "walks" the tree of #DATA exchange rates to get the value in CP only.q
	static #getConversionToBase(symbol) {
		let currentSymbol = symbol;
		let conversionFactor = 1;

		while (currentSymbol !== null) {
			const data = Money.#DATA.get(currentSymbol);
			if (!data) {
				return null;
			}

			const [rate, nextAbbr] = data.exchangeRate;
			conversionFactor *= rate;
			currentSymbol = nextAbbr === null ? null : Money.#getSymbolByAbbreviation(nextAbbr);
		}
		return conversionFactor;
	}

	constructor() {
		throw new Error('Money cannot be instantiated');
	}
}