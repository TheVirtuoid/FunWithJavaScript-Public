import Table from "../Table/Table.js";
import Ui from "../Ui/Ui.js";
import GameStatus from "./GameStatus.js";
import Statistics from "../Statistics/Statistics.js";

export default class Game {

	static EVENT_NEW_GAME = Symbol('new-game');
	static EVENT_EXIT_GAME = 'exit-game';
	static EVENT_CANCEL_GAME = Symbol('cancel-game');
	static EVENT_START_GAME = Symbol('start-game');
	static EVENT_PAUSE_GAME = Symbol('pause-game');
	static EVENT_CONTINUE_GAME = Symbol('continue-game');
	static EVENT_PIECE_DRAGGED = Symbol('piece-dragged');
	static EVENT_PIECE_DROPPED = Symbol('piece-dropped');

	#table;
	#ui;
	#statistics;

	constructor() {
		this.#table = null;
		this.#ui = new Ui(this);
		this.render(GameStatus.BEGIN);
	}

	get table() {
		return this.#table;
	}

	get ui() {
		return this.#ui;
	}

	get statistics() {
		return this.#statistics;
	}

	createTable() {
		this.#table = new Table();
		return this.#table;
	}

	createUi() {
		this.#ui = new Ui();
		return this.#ui;
	}

	render(status) {
		switch (status) {
			case GameStatus.BEGIN:
				this.#statistics = new Statistics();
				return this.#ui.render(status);
		}
	}
}