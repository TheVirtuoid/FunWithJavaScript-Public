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
		if (!Number.isInteger(cash)) {
			throw new Error('Amount must be an integer');
		}
		this.#cash = cash;
	}
}