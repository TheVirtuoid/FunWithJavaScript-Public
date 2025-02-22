import Table from "../Table/Table.js";
import Ui from "../Ui/Ui.js";
import GameStatus from "./GameStatus.js";
import Statistics from "../Statistics/Statistics.js";
import ImageDb from "../ImageDb/ImageDb.js";
import CutDb from "../CutDb/CutDb.js";
import NumPiecesDb from "../NumPiecesDb/NumPiecesDb.js";

import images from '../../database/images.js';
import cuts from '../../database/cuts.js';
import numPieces from '../../database/numPieces.js';

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

	#cutDb;
	#imageDb;
	#numPiecesDb;

	constructor() {
		this.#table = null;
		this.#ui = new Ui(this);
		this.#imageDb = new ImageDb();
		this.#cutDb = new CutDb();
		this.#numPiecesDb = new NumPiecesDb();
		ImageDb.reset(images);
		CutDb.reset(cuts);
		NumPiecesDb.reset(numPieces);
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
				const allSelections = [];

				const selectImagePromise = new Promise((resolve, reject) => {
					const imagePromises = [];
					let imageList = [];
					this.#imageDb.getCategories().forEach((category) => {
						this.#imageDb.getImagesFromCategory(category).forEach((imageData) => {
							imagePromises.push(this.#imageDb.getImage(imageData, true));
						});
					});
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
					this.#cutDb.getCutNames().forEach((cutName) => {
						const cut = this.#cutDb.getCut(cutName);
						cutPromises.push(this.#cutDb.getImage(cut));
					});
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
					this.#numPiecesDb.getNumPieces().forEach((numPiecesNumber) => {
						numPiecesPromises.push(this.#numPiecesDb.getImage(numPiecesNumber));
					});
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