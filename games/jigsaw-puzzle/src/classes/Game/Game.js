import Table from "../Table/Table.js";
import Ui from "../Ui/Ui.js";

export default class Game {
	#table;
	#ui;

	constructor() {
		this.#table = null;
		this.#ui = null;
	}

	get table() {
		return this.#table;
	}

	get ui() {
		return this.#ui;
	}

	createTable() {
		this.#table = new Table();
		return this.#table;
	}

	createUi() {
		this.#ui = new Ui();
		return this.#ui;
	}
}