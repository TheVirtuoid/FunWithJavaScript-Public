export default class StatCash {
	#cash;

	constructor(args = {}) {
		const { cash = 0 } = args;
		this.setCash(cash);
	}

	get cash() {
		return this.#cash;
	}

	setCash(cash) {
		if (typeof cash !== 'number') {
			throw new Error('StatCash.setCash requires a number');
		}
		this.#cash = cash;
	}
}