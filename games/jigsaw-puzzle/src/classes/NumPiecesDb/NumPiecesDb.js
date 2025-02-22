import ImageDb from "../ImageDb/ImageDb.js";

const defaultNumPieces = [];

let instance = null;
let numPiecesDatabase = null;

export default class NumPiecesDb {

	static reset(numPieces) {
		numPiecesDatabase = numPieces ? numPieces : defaultNumPieces;
		instance = null;
	}

	constructor() {
		if (instance) {
			throw new Error('NumPiecesDb class has already been initialized');
		}
		instance = this;
	}

	getNumPieces() {
		return numPiecesDatabase;
	}

	getImage(number) {
		const width = ImageDb.THUMBNAIL_WIDTH;
		const height = ImageDb.THUMBNAIL_HEIGHT;

		const span = document.createElement('span');
		span.style.width = `${width}px`;
		span.style.height = `${height}px`;

		const imageSpan = document.createElement('span');
		imageSpan.textContent = `${number}`;
		imageSpan.classList.add('number');

		span.appendChild(imageSpan);
		return Promise.resolve(span);
	}
}