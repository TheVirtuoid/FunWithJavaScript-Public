import GameStatus from "../Game/GameStatus.js";
import RenderStatus from "./RenderStatus.js";
import Game from "../Game/Game.js";
import ImageDb from "../ImageDb/ImageDb.js";
import NewGame from "./NewGame.js";

export default class Ui {

	#buttonNew;
	#buttonStart;
	#buttonPause;
	#buttonContinue;
	#buttonExit;
	#buttonCancel;

	#dialogNewGame;

	#game;

	/* classes */
	#newGame;

	#newDialogData = {
		image: null,
		cut: null,
		numPieces: null,
		buttonContinue: null,
		buttonCancel: null
	}

	constructor(game) {
		this.#game = game;
		this.#newGame = new NewGame('new-game-dialog');
	}

	initialize() {
		this.#buttonNew = document.getElementById('button-new');
		this.#buttonStart = document.getElementById('button-start');
		this.#buttonPause = document.getElementById('button-pause');
		this.#buttonContinue = document.getElementById('button-continue');
		this.#buttonExit = document.getElementById('button-exit');
		this.#buttonCancel = document.getElementById('button-cancel');

		this.#buttonNew.addEventListener('click', this.#onNew.bind(this));
		this.#buttonStart.addEventListener('click', this.#onStart.bind(this));
		this.#buttonPause.addEventListener('click', this.#onPause.bind(this));
		this.#buttonContinue.addEventListener('click', this.#onContinue.bind(this));
		this.#buttonExit.addEventListener('click', this.#onExit.bind(this));
		this.#buttonCancel.addEventListener('click', this.#onCancel.bind(this));
	}

	render(renderState) {
		switch(renderState) {
			case GameStatus.BEGIN:
				this.beginGame();
				return { code: RenderStatus.BEGIN };
		}
	}

	#onExit(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_EXIT_GAME, event});
	}

	#onNew(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_NEW_GAME, event });
	}

	#onStart(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_START_GAME, event });
	}

	#onPause(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_PAUSE_GAME, event });
	}

	#onContinue(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_CONTINUE_GAME, event });
	}

	#onCancel(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_CANCEL_GAME, event });
	}

	beginGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = true;
	}

	newGame(imageList, cutList, numPiecesList) {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;

		this.#newGame.show(imageList, cutList, numPiecesList);


		/*this.#buildNewDialogImageList('new-game-dialog-image-list', imageList);
		this.#buildNewDialogImageList('new-game-dialog-cut-list', cutList);
		this.#buildNewDialogImageList('new-game-dialog-numpiece-list', numPiecesList);

		this.#newDialogData.buttonContinue = document.getElementById('new-dialog-button-continue');
		this.#newDialogData.buttonCancel = document.getElementById('new-dialog-button-cancel');
		this.#newDialogData.buttonContinue.disabled = true;
		this.#newDialogData.buttonCancel.disabled = false;

		this.#newDialogData.buttonContinue.addEventListener('click', this.#onNewDialogContinue.bind(this));
		this.#newDialogData.buttonCancel.addEventListener('click', this.#onNewDialogCancel.bind(this));

		this.#dialogNewGame.showModal();*/
	}

	startGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = false;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
	}

	pauseGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
	}

	continueGame() {
		this.startGame();
	}

	cancelGame() {
		this.beginGame();
	}

	exitGame() {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = true;
		this.#buttonCancel.disabled = true;
	}

	readyGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = false;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
	}

	finishGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = true;
	}


}