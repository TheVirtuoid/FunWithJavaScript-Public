import Position2d from "../support/Position2d.js";

export default class Jigsaw {

	static EDGE = Symbol('edge');
	static INNYTAB = Symbol('innyTab');
	static OUTYTAB = Symbol('outyTab');

	#width;
	#height;
	#image;

	#tabSize;

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
			throw new Error('Jigsaw: Cut(): Invalid Position');
		}
		const canvas = document.createElement('canvas');
		const { width, height } = this;
		canvas.width = width;
		canvas.height = height;
		this.#tabSize = Math.max(10, Math.max(width, height) / 4);
		const tabSize = this.#tabSize;

		const ctx = canvas.getContext('2d');
		ctx.beginPath();

		const x = 0;
		const y = 0;

		// this.#outyNorth({ x, y, ctx });
		// this.#innyNorth({ x, y, ctx });

		ctx.lineTo(x + width, y);
		this.#innyEast({ x: x + width, y, ctx });

		/*// Right edge
		ctx.lineTo(x + width, y + height / 3);
		ctx.bezierCurveTo(x + width + tabSize, y + height / 3 + tabSize, x + width + tabSize, y + 2 * height / 3 - tabSize, x + width, y + 2 * height / 3);
		ctx.lineTo(x + width, y + height);*/

		// Bottom edge
		ctx.lineTo(x + 2 * width / 3, y + height);
		ctx.bezierCurveTo(x + 2 * width / 3 - tabSize, y + height + tabSize, x + width / 3 + tabSize, y + height + tabSize, x + width / 3, y + height);
		ctx.lineTo(x, y + height);

		// Left edge
		ctx.lineTo(x, y + 2 * height / 3);
		ctx.bezierCurveTo(x - tabSize, y + 2 * height / 3 - tabSize, x - tabSize, y + height / 3 + tabSize, x, y + height / 3);
		ctx.lineTo(x, y);

		ctx.closePath();
		// ctx.stroke();
		ctx.clip();

		ctx.drawImage(
			this.image,
			position.x * width,
			position.y * height,
			width,
			height,
			0,
			0,
			width,
			height);



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
				rowEdges.push({north: null, east: null, south: null, west: null});
			}
			pieceEdges.push(rowEdges);
		}
		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				const piece = pieceEdges[row][column];
				if (row === 0) {
					piece.north = Jigsaw.EDGE;
				}
				if (row === rows - 1) {
					piece.south = Jigsaw.EDGE;
				}
				if (column === 0) {
					piece.west = Jigsaw.EDGE;
				}
				if (column === columns - 1) {
					piece.east = Jigsaw.EDGE;
				}
				if (piece.south === null) {
					piece.south = Math.random() < .5 ? Jigsaw.INNYTAB : Jigsaw.OUTYTAB;
					pieceEdges[row + 1][column].north = piece.south === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
				}
				if (piece.east === null) {
					piece.east = Math.random() < .5 ? Jigsaw.INNYTAB : Jigsaw.OUTYTAB;
					pieceEdges[row][column + 1].west = piece.east === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB
				}
			}
		}
		return pieceEdges;
	}

	#innyNorth(args) {
		let { x, y, ctx } = args;
		const tabSize = this.#tabSize;
		const midPoint = this.#width / 2;
		const tabSizeHalf = tabSize / 2;

		ctx.moveTo(x, y);
		x = x + midPoint - tabSizeHalf;
		ctx.lineTo(x, y);
		ctx.bezierCurveTo(
			x + tabSizeHalf,
			y + tabSizeHalf / 3,
			x,
			y + 2 * tabSizeHalf / 3,
			x,
			y + tabSizeHalf);
		ctx.bezierCurveTo(
			x + tabSizeHalf / 2,
			y + tabSize,
			x + 3 * tabSizeHalf / 2,
			y + tabSize,
			x + tabSize,
			y + tabSizeHalf);
		ctx.bezierCurveTo(
			x + tabSize,
			y + 2 * tabSizeHalf / 3,
			x + tabSizeHalf,
			y + tabSizeHalf / 3,
			x + tabSize,
			y);
	}

	#innySouth(args) {}

	#innyEast(args) {
		let { x, y, ctx } = args;
		const tabSize = this.#tabSize;
		const midPoint = this.#height / 2;
		const tabSizeHalf = tabSize / 2;

		ctx.moveTo(x, y);

		y = y + midPoint - tabSizeHalf;
		ctx.lineTo(x, y);
		ctx.bezierCurveTo(
			x - tabSizeHalf / 3,
			y + tabSizeHalf,
			x - 2 * tabSizeHalf / 3,
			y,
			x - tabSizeHalf,
			y);
		ctx.bezierCurveTo(
			x - tabSize,
			y + tabSizeHalf / 2,
			x - tabSize,
			y + 3 * tabSizeHalf / 2,
			x - tabSizeHalf,
			y + tabSize);
		ctx.bezierCurveTo(
			x - 2 * tabSizeHalf / 3,
			y + tabSize,
			x - tabSizeHalf / 3,
			y + tabSizeHalf,
			x,
			y + tabSize);	}

	#innyWest(args) {}

	#outyNorth(args = {}) {
		let { x, y, ctx } = args;
		const tabSize = this.#tabSize;
		const midPoint = this.#width / 2;
		const tabSizeHalf = tabSize / 2;

		y += this.#tabSize;
		ctx.moveTo(x, y);

		x = x + midPoint - tabSizeHalf;
		ctx.lineTo(x, y);
		ctx.bezierCurveTo(
			x + tabSizeHalf,
			y - tabSizeHalf / 3,
			x,
			y - 2 * tabSizeHalf / 3,
			x,
			y - tabSizeHalf);
		ctx.bezierCurveTo(
			x + tabSizeHalf / 2,
			y - tabSize,
			x + 3 * tabSizeHalf / 2,
			y - tabSize,
			x + tabSize,
			y - tabSizeHalf);
		ctx.bezierCurveTo(
			x + tabSize,
			y - 2 * tabSizeHalf / 3,
			x + tabSizeHalf,
			y - tabSizeHalf / 3,
			x + tabSize,
			y);
	}
	#outySouth(args) {}

	#outyEast(args) {
		let { x, y, ctx } = args;
		const tabSize = this.#tabSize;
		const midPoint = this.#height / 2;
		const tabSizeHalf = tabSize / 2;

		x -= this.#tabSize;
		ctx.moveTo(x, y);

		y = y + midPoint - tabSizeHalf;
		ctx.lineTo(x, y);
		ctx.bezierCurveTo(
			x + tabSizeHalf / 3,
			y + tabSizeHalf,
			x + 2 * tabSizeHalf / 3,
			y,
			x + tabSizeHalf,
			y);
		ctx.bezierCurveTo(
			x + tabSize,
			y + tabSizeHalf / 2,
			x + tabSize,
			y + 3 * tabSizeHalf / 2,
			x + tabSizeHalf,
			y + tabSize);
		ctx.bezierCurveTo(
			x + 2 * tabSizeHalf / 3,
			y + tabSize,
			x + tabSizeHalf / 3,
			y + tabSizeHalf,
			x,
			y + tabSize);
	}

	#outyWest(args) {}
}