import PanelUi from '../graphics/Panel.js';

export default class Panel {

	#ui;
	#entries;

	constructor(args = {}) {
		const { entries } = args;
		this.#entries = entries;
		this.#ui = new PanelUi({ entries });
	}

	set(entry, value) {
		if (this.#entries.includes(entry)) {
			this.#ui.set(entry, value);
		}
	}
}