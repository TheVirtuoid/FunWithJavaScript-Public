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

	#game;

	constructor(game) {
		this.#game = game;

		this.#buttonNew = document.getElementById('button-new');
		this.#buttonStart = document.getElementById('button-start');
		this.#buttonPause = document.getElementById('button-pause');
		this.#buttonContinue = document.getElementById('button-continue');
		this.#buttonExit = document.getElementById('button-exit');
		this.#buttonCancel = document.getElementById('button-cancel');

		// this.#buttonNew.addEventListener('click', () => this.#onNew());
		// this.#buttonStart.addEventListener('click', () => this.#onStart());
		// this.#buttonPause.addEventListener('click', () => this.#onPause());
		// this.#buttonContinue.addEventListener('click', () => this.#onContinue());
		this.#buttonExit.addEventListener('click', () => this.#onExit.bind(this));
		// this.#buttonCancel.addEventListener('click', () => this.#onCancel());
	}

	render(renderState) {
		switch(renderState) {
			case GameStatus.BEGIN:
				this.#buttonNew.disabled = false;
				this.#buttonStart.disabled = true;
				this.#buttonPause.disabled = true;
				this.#buttonContinue.disabled = true;
				this.#buttonExit.disabled = false;
				this.#buttonCancel.disabled = true;
				return { code: RenderStatus.BEGIN };
		}
	}

	#onExit(event) {
		this.#game.dispatchEvent({ code: Game.EVENT_EXIT_GAME, event});
	}
}