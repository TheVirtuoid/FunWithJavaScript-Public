import Position2d from "../support/Position2d.js";

export default class Square {
	static EDGE = Symbol('edge');

	#width;
	#height;
	#image;

	constructor(args = {}) {
		this.#width = args.width || 0;
		this.#height = args.height || 0;
		this.#image = args.image || null;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	get image() {
		return this.#image;
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

	createPieceEdges(args = {}) {
		const { rows = 0, columns = 0 } = args;
		const pieceEdges = [];
		for (let row = 0; row < rows; row++) {
			const rowEdges = [];
			for (let column = 0; column < columns; column++) {
				const piece = {
					north: { shape: Square.EDGE, width: this.width, height: this.height },
					east: { shape: Square.EDGE, width: this.width, height: this.height },
					south: { shape: Square.EDGE, width: this.width, height: this.height },
					west: { shape: Square.EDGE, width: this.width, height: this.height }
				};
				rowEdges.push(piece);
			}
			pieceEdges.push(rowEdges);
		}
		return pieceEdges;
	}
}