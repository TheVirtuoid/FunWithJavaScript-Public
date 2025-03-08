import ImageDb from "../ImageDb/ImageDb.js";

const defaultNumPieces = new Map();

let instance = null;
let numPiecesDatabase = null;
let numPiecesIdDatabase = null;

export default class NumPiecesDb {

	static reset(numPieces) {
		numPiecesDatabase = numPieces ? numPieces : defaultNumPieces;
		instance = null;
		numPiecesIdDatabase = new Map();
		numPiecesDatabase.forEach((pieceData) => {
			numPiecesIdDatabase.set(pieceData.id, pieceData);
		});
	}

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}

	getPieceNames() {
		return Array.from(numPiecesDatabase.keys());
	}

	getPieceData(pieceName) {
		return numPiecesDatabase.get(pieceName);
	}

	getPieceDataById(id) {
		return numPiecesIdDatabase.get(id);
	}

	getImageById(id) {
		const pieceData = this.getPieceDataById(id);
		return this.getImage(pieceData);
	}

	getImage(pieceData) {
		if (!pieceData) {
			return undefined;
		}
		const width = ImageDb.THUMBNAIL_WIDTH;
		const height = ImageDb.THUMBNAIL_HEIGHT;
		const span = document.createElement('span');
		span.style.width = `${width}px`;
		span.style.height = `${height}px`;
		span.dataset.id = `${pieceData.pieces}`;
		span.setAttribute('target', 'numPieces');

		const imageSpan = document.createElement('span');
		imageSpan.textContent = `${pieceData.pieces}`;
		imageSpan.classList.add('number');

		span.appendChild(imageSpan);
		return Promise.resolve(span);
	}
}