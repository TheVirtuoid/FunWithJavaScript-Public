import ImageDb from "../databases/ImageDb/ImageDb.js";
import GameStatus from "../Game/GameStatus.js";

export default class NewGame {

	#dom;
	#parent;

	#data = {
		image: null,
		cut: null,
		numPieces: null,
		buttonContinue: null,
		buttonCancel: null
	};

	constructor(newGameId, parent) {
		this.#dom = document.getElementById(newGameId);
		this.#parent = parent;
	}

	show(imageList, cutList, numPiecesList) {
		this.#buildImageList('new-game-dialog-image-list', imageList);
		this.#buildImageList('new-game-dialog-cut-list', cutList);
		this.#buildImageList('new-game-dialog-numpiece-list', numPiecesList);

		this.#data.buttonContinue = document.getElementById('new-dialog-button-continue');
		this.#data.buttonCancel = document.getElementById('new-dialog-button-cancel');
		this.#data.buttonContinue.disabled = true;
		this.#data.buttonCancel.disabled = false;

		this.#data.buttonContinue.addEventListener('click', this.#onContinue.bind(this));
		this.#data.buttonCancel.addEventListener('click', this.#onCancel.bind(this));

		this.#data.image = null;
		this.#data.cut = null;
		this.#data.numPieces = null;

		this.#dom.showModal();
	}

	#buildImageList(imageListId, list) {
		const imageList = document.getElementById(imageListId);
		const ul = document.createElement('ul');
		ul.style.maxHeight = `${ImageDb.THUMBNAIL_HEIGHT * 4}px`;
		list.forEach((image) => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.classList.add('small');
			button.appendChild(image);
			li.appendChild(button);
			ul.appendChild(li);
		});
		imageList.replaceChildren();
		imageList.insertAdjacentElement('beforeend', ul);
		ul.addEventListener('click', this.#processSelectionEvent.bind(this));
	}

	#processSelectionEvent(event) {
		const allowedTargets = ['BUTTON', 'SPAN', 'IMG'];
		if (allowedTargets.includes(event.target.tagName)) {
			const selected = event.target.closest('button');
			const target = selected.querySelector('[target]');
			const selectedId = target.getAttribute('target');
			this.#data[selectedId] = target.dataset.id;
			if (this.#data.image && this.#data.cut && this.#data.numPieces) {
				this.#data.buttonContinue.disabled = false;
			}
			const ul = selected.closest('ul');
			ul.querySelectorAll('button').forEach((button) => {
				button.classList.remove('selected');
			});
			ul.dataset.selected = selected.dataset.value;
			selected.classList.add('selected');
		}
	}

	#onCancel(event) {
		this.#dom.close();
		this.#parent.dispatchEvent({ code: GameStatus.EVENT_BEGIN, event });
	}

	#onContinue(event) {
		this.#dom.close();
		this.#parent.dispatchEvent({ code: GameStatus.EVENT_READY, data: { image: this.#data.image, cut: this.#data.cut, numPieces: this.#data.numPieces }});
	}
}