import ImageDb from "../ImageDb/ImageDb.js";
import NumPieceDbData from "../NumPieceDbData/NumPieceDbData.js";

let instance = null;
let database = null;

export default class NumPiecesDb {

	static reset(numPieces = []) {
		database = new Map();
		instance = null;
		numPieces.forEach((pieceData) => {
			const numPieceData = new NumPieceDbData(pieceData);
			database.set(pieceData.id, numPieceData);
		});
	}

	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}

	get(id) {
		return database.get(id);
	}

	getNames() {
		const names = [];
		database.forEach((pieceData) => {
			names.push(pieceData.name);
		});
		return names;
	}

	getImage(id) {
		const pieceData = this.get(id);
		if (!pieceData) {
			return pieceData;
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