import GameStatus from "../Game/GameStatus.js";
import RenderStatus from "./RenderStatus.js";
import Game from "../Game/Game.js";
import ImageDb from "../ImageDb/ImageDb.js";

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

	newGame(imageList, cutList, numPiecesList) {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
		const newGameDialogImageList = document.getElementById('new-game-dialog-image-list');
		const imageUl = document.createElement('ul');
		imageUl.style.maxHeight = `${ImageDb.THUMBNAIL_HEIGHT * 4}px`;
		imageList.forEach((image) => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.classList.add('small');
			button.appendChild(image);
			li.appendChild(button);
			imageUl.appendChild(li);
		});
		newGameDialogImageList.insertAdjacentElement('beforeend', imageUl);

		const newGameDialogCutList = document.getElementById('new-game-dialog-cut-list');
		const cutUl = document.createElement('ul');
		cutUl.style.maxHeight = `${ImageDb.THUMBNAIL_HEIGHT * 4}px`;
		cutList.forEach((image) => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.classList.add('small');
			button.appendChild(image);
			li.appendChild(button);
			cutUl.appendChild(li);
		});
		newGameDialogCutList.insertAdjacentElement('beforeend', cutUl);

		const newGameDialogNumPiecesList = document.getElementById('new-game-dialog-numpiece-list');
		const numPiecesUl = document.createElement('ul');
		numPiecesUl.style.maxHeight = `${ImageDb.THUMBNAIL_HEIGHT * 4}px`;
		numPiecesList.forEach((image) => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.classList.add('small');
			button.appendChild(image);
			li.appendChild(button);
			numPiecesUl.appendChild(li);
		});
		newGameDialogNumPiecesList.insertAdjacentElement('beforeend', numPiecesUl);

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