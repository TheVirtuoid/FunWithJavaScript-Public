export default class StatCursorPositionUI {
	#dom;

	constructor(dom) {
		this.#dom = dom;
	}

	update(statCursorPosition) {
		this.#dom.textContent = statCursorPosition?.toString() ?? 'n/a';
	}
}