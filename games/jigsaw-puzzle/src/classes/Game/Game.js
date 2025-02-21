import Table from "../Table/Table.js";
import Ui from "../Ui/Ui.js";
import GameStatus from "./GameStatus.js";
import Statistics from "../Statistics/Statistics.js";
import ImageDb from "../ImageDb/ImageDb.js";

const imageDb = new Map([
	['beach', []],
	['landscape', []],
	['insects', []],
	['cities', []]
]);

const images = new Map([
	['beach', [{ url: 'src/images/beach-418742_1280.jpg' }, { url: '/images/beach-6292382_1280.jpg' }]],
	['landscape', [{ url: '/images/mountains-8451480_1280.jpg' }]],
	['insects', [{ url: '/images/butterfly-7954767_1280.jpg' }]],
	['cities', [{ url: '/images/london-7965770_1280.jpg' }]]
]);

export default class Game {

	static EVENT_NEW_GAME = Symbol('new-game');
	static EVENT_EXIT_GAME = 'exit-game';
	static EVENT_CANCEL_GAME = Symbol('cancel-game');
	static EVENT_START_GAME = Symbol('start-game');
	static EVENT_PAUSE_GAME = Symbol('pause-game');
	static EVENT_CONTINUE_GAME = Symbol('continue-game');
	static EVENT_READY_GAME = Symbol('ready-game');
	static EVENT_FINISH_GAME = Symbol('finish-game');
	static EVENT_PIECE_DRAGGED = Symbol('piece-dragged');
	static EVENT_PIECE_DROPPED = Symbol('piece-dropped');

	#table;
	#ui;
	#statistics;

	#imageDb;

	constructor() {
		this.#table = null;
		this.#ui = new Ui(this);
		this.#imageDb = new ImageDb();
		ImageDb.reset(images);
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

	initialize() {
		this.#ui.initialize();
		this.render(GameStatus.BEGIN);
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

	dispatchEvent(incomingEvent) {
		const { code, event } = incomingEvent;
		switch(code) {
			case Game.EVENT_NEW_GAME:
				this.#ui.newGame();
				break;
			case Game.EVENT_START_GAME:
				this.#ui.startGame();
				break;
			case Game.EVENT_PAUSE_GAME:
				this.#ui.pauseGame();
				break;
			case Game.EVENT_CONTINUE_GAME:
				this.#ui.continueGame();
				break;
			case Game.EVENT_EXIT_GAME:
				this.#ui.exitGame();
				break;
			case Game.EVENT_CANCEL_GAME:
				this.#ui.cancelGame();
				break;
			case Game.EVENT_READY_GAME:
				this.#ui.readyGame();
				break;
			case Game.EVENT_FINISH_GAME:
				this.#ui.finishGame();
				break;
		}
	}
}