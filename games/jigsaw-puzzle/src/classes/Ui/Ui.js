import GameStatus from "../Game/GameStatus.js";
import RenderStatus from "./RenderStatus.js";
import Game from "../Game/Game.js";

export default class Ui {

	#buttonNew;
	#buttonStart;
	#buttonPause;
	#buttonContinue;
	#buttonExit;
	#buttonCancel;

	#dialogNewGame;

	#game;

	constructor(game) {
		this.#game = game;
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

		this.#dialogNewGame = document.getElementById('new-game-dialog');
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

	newGame() {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
		this.#dialogNewGame.showModal();
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