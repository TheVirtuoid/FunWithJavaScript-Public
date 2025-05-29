import GameData from "../../src/classes/databases/GameData/GameData.js";

export default class ExitDialogCode {
	#dialog;
	#buttonExitHandle;
	#buttonYesHandle;
	#buttonNoHandle;
	#gameData;
	#router;

	constructor(exitButtonId, router) {
		this.#dialog = document.getElementById('exit-game-dialog');
		this.#buttonExitHandle = this.#buttonExit.bind(this);
		this.#buttonYesHandle = this.#buttonYes.bind(this);
		this.#buttonNoHandle = this.#buttonNo.bind(this);
		this.#router = router;

		this.#gameData = new GameData();
		document.getElementById(exitButtonId).addEventListener('click', this.#buttonExitHandle);
	}

	#buttonExit() {
		this.#dialog.showModal();
		document.getElementById('exit-game-dialog-button-yes').addEventListener('click', this.#buttonYesHandle, { once: true });
		document.getElementById('exit-game-dialog-button-no').addEventListener('click', this.#buttonNoHandle, { once: true });
	}

	#buttonYes() {
		this.#dialog.close();
		this.#gameData.page = 'index';
		this.#router.routeTo(this.#gameData.page);
	}

	#buttonNo() {
		this.#dialog.close();
	}

}

