export default class StatCashUI {
	#dom;

	constructor(dom) {
		this.#dom = dom;
	}

	update(cash) {
		this.#dom.textContent = cash?.toString() ?? 'n/a';
	}
}