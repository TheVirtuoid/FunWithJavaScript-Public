import Table from "../Table/Table.js";
import Ui from "../Ui/Ui.js";
import GameStatus from "./GameStatus.js";
import Statistics from "../Statistics/Statistics.js";
import ImageDb from "../databases/ImageDb/ImageDb.js";
import CutDb from "../databases/CutDb/CutDb.js";
import NumPiecesDb from "../databases/NumPiecesDb/NumPiecesDb.js";

import images from '../../database/images.js';
import cuts from '../../database/cuts.js';
import numPieces from '../../database/numPieces.js';
import Position2d from "../support/Position2d.js";
import InGameEvent from "./InGameEvent.js";
import StatusMoved from "../support/Status/StatusMoved.js";
import StatusGameFinished from "../support/Status/StatusGameFinished.js";

export default class Game {

/*
	static EVENT_NEW_GAME = Symbol('new-game');
	static EVENT_EXIT_GAME = 'exit-game';
	static EVENT_CANCEL_GAME = Symbol('cancel-game');
	static EVENT_START_GAME = Symbol('start-game');
	static EVENT_PAUSE_GAME = Symbol('pause-game');
	static EVENT_CONTINUE_GAME = Symbol('continue-game');
	static EVENT_READY_GAME = Symbol('ready-game');
	static EVENT_FINISH_GAME = Symbol('finish-game');
*/
	static EVENT_PIECE_DRAGGED = Symbol('piece-dragged');
	static EVENT_PIECE_DROPPED = Symbol('piece-dropped');

	#status;

	#table;
	#ui;
	#statistics;

	#cutDb;
	#imageDb;
	#numPiecesDb;

	#timer;

	constructor() {
		ImageDb.reset(images);
		CutDb.reset(cuts);
		NumPiecesDb.reset(numPieces);
		this.#table = null;
		this.#ui = new Ui(this);
		this.#imageDb = new ImageDb();
		this.#cutDb = new CutDb();
		this.#numPiecesDb = new NumPiecesDb();
		this.#statistics = new Statistics();
		this.#timer = null;
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

	get status() {
		return this.#status;
	}

	initialize() {
		this.#ui.initialize();
		this.dispatchEvent({ code: GameStatus.EVENT_BEGIN });
	}

	dispatchEvent(incomingEvent) {
		const { code, data } = incomingEvent;
		switch(code) {
			case GameStatus.EVENT_BEGIN:
				this.#eventBegin();
				break;
			case GameStatus.EVENT_NEW:
				this.#eventNew();
				break;
			case GameStatus.EVENT_READY:
				const imageData = this.#imageDb.get(data.image);
				const cutData = this.#cutDb.get(data.cut);
				const numPiecesData = this.#numPiecesDb.get(data.numPieces);
				this.#table = new Table({ image: imageData, cut: cutData, numPieces: numPiecesData });
				this.#table.setPuzzleDimensions(new Position2d({x: ImageDb.IMAGE_WIDTH, y: ImageDb.IMAGE_HEIGHT }));
				this.#ui.readyGame(this.#table);
				break;
			case GameStatus.EVENT_START:
				this.#statistics.resetTime();
				this.#statistics.resetMoves();
				this.#startTimer();
				this.#ui.startGame();
				break;
			case GameStatus.EVENT_PAUSE:
				this.#stopTimer();
				this.#ui.pauseGame();
				break;
			case GameStatus.EVENT_CONTINUE:
				this.#startTimer();
				this.#ui.continueGame();
				break;
			case GameStatus.EVENT_EXIT:
				this.#ui.exitGame();
				break;
			case GameStatus.EVENT_FINISHED:
				this.#ui.finishGame();
				break;
		}
	}

	dispatchInGameEvent(incomingEvent) {
		const { code, data } = incomingEvent;
		switch(code) {
			case InGameEvent.PIECE_MOVED:
				const status = this.table.dispatchEvent(InGameEvent.Event(InGameEvent.PIECE_MOVED, data));
				this.#statistics.incrementMoves();
				this.#ui.updatePiecesRemaining(status.piecesRemaining);
				if (status instanceof StatusGameFinished) {
					this.#statistics.gameFinished();
				}
				console.log(status);
				break;
		}
	}

	#incrementTimer() {
		this.#statistics.incrementTime();
	}

	#startTimer() {
		this.#timer = setInterval(this.#incrementTimer.bind(this), 10);
	}

	#stopTimer() {
		clearInterval(this.#timer);
	}

	#eventBegin() {
		this.#status = GameStatus.BEGIN;
		this.#statistics.resetMoves();
		this.#statistics.resetTime();
		this.#ui.render(this.#status);
	}

	#eventNew() {
		const allSelections = [];

		const selectImagePromise = new Promise((resolve, reject) => {
			const imagePromises = [];
			let imageList = [];
			for (let imageId of this.#imageDb.getAllImageIds()) {
				imagePromises.push(this.#imageDb.getImage(imageId, true));
			}
			Promise.allSettled(imagePromises).then((images) => {
				imageList = images
					.filter((image) => image.status === 'fulfilled')
					.map((image) => image.value);
				resolve({ select: 'image', data: imageList });
			});
		});
		allSelections.push(selectImagePromise);

		const selectCutPromise = new Promise((resolve, reject) => {
			const cutPromises = [];
			let imageList = [];
			for(let cutId of this.#cutDb.getIds()) {
				cutPromises.push(this.#cutDb.getImage(cutId));
			}
			Promise.allSettled(cutPromises).then((images) => {
				imageList = images
					.filter((image) => image.status === 'fulfilled')
					.map((image) => image.value);
				resolve({ select: 'cut', data: imageList });
			});
		});
		allSelections.push(selectCutPromise);

		const selectNumPiecesPromise = new Promise((resolve, reject) => {
			const numPiecesPromises = [];
			let imageList = [];
			for(let id of this.#numPiecesDb.getIds()) {
				numPiecesPromises.push(this.#numPiecesDb.getImage(id));
			}
			Promise.allSettled(numPiecesPromises).then((images) => {
				imageList = images
					.filter((image) => image.status === 'fulfilled')
					.map((image) => image.value);
				resolve({ select: 'numPieces', data: imageList });
			});
		});
		allSelections.push(selectNumPiecesPromise);

		Promise.all(allSelections).then((selections) => {
			this.#ui.newGame(selections[0].data, selections[1].data, selections[2].data);
		});
	}
}