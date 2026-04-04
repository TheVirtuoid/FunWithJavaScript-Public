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
		this.#cash = Math.round(cash);
	}
}