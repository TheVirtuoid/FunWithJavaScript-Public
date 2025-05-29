export default class ExitDialogCode {
	#dialog;
	#buttonExitHandle;
	#buttonYesHandle;
	#buttonNoHandle;

	constructor(exitButtonId) {
		this.#dialog = document.getElementById('exit-game-dialog');
		this.#buttonExitHandle = this.#buttonExit.bind(this);
		this.#buttonYesHandle = this.#buttonYes.bind(this);
		this.#buttonNoHandle = this.#buttonNo.bind(this);

		document.getElementById(exitButtonId).addEventListener('click', this.#buttonExitHandle);
	}

	#buttonExit() {
		this.#dialog.showModal();
		document.getElementById('exit-game-dialog-button-yes').addEventListener('click', this.#buttonYesHandle, { once: true });
		document.getElementById('exit-game-dialog-button-no').addEventListener('click', this.#buttonNoHandle, { once: true });
	}

	#buttonYes() {
		this.#dialog.close();
		// selectScreen('begin-screen');
	}

	#buttonNo() {
		this.#dialog.close();
	}

}

