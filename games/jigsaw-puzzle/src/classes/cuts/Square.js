import Position2d from "../support/Position2d.js";
import CutBase from "./CutBase.js";

export default class Square extends CutBase {
	static EDGE = Symbol('edge');

	#puzzleCut;

	constructor(args = {}) {
		super(args);
		this.#puzzleCut = null;
	}

	cut(position) {
		if (!(position instanceof Position2d)) {
			throw new Error('Square: Cut(): Invalid Position');
		}
		const canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(
			this.image,
			position.x * this.width,
			position.y * this.height,
			this.width,
			this.height,
			0,
			0,
			this.width,
			this.height);
		const piece = document.createElement("span");
		piece.classList.add("piece");
		piece.appendChild(canvas);
		return piece;
	}

	configurePuzzleCut(args = {}) {
		const { rows = 0, columns = 0, pieceWidth = 0, pieceHeight = 0 } = args;
		this.#puzzleCut = [];
		for (let row = 0; row < rows; row++) {
			const rowCut = [];
			for (let column = 0; column < columns; column++) {
				const piece = {
					north: Square.EDGE,
					east: Square.EDGE,
					south: Square.EDGE,
					west: Square.EDGE,
					width: pieceWidth,
					height: pieceHeight,
					startingX: column * pieceWidth,
					startingY: row * pieceHeight,
					checkingPoint: {
						x: column * pieceWidth + pieceWidth / 2,
						y: row * pieceHeight + pieceHeight / 2,
						width: pieceWidth,
						height: pieceHeight
					},
					xAdjust: 0,
					yAdjust: 0
				};
				rowCut.push(piece);
			}
			this.#puzzleCut.push(rowCut);
		}
		return this.#puzzleCut;
	}
}