import Position2d from "../support/Position2d.js";

export default class Jigsaw {

	static EDGE = Symbol('edge');
	static INNYTAB = Symbol('innyTab');
	static OUTYTAB = Symbol('outyTab');

	#width;
	#height;
	#image;

	#tabSize;

	#pieceEdges;

	constructor(args = {}) {
		this.#width = args.width || 0;
		this.#height = args.height || 0;
		this.#image = args.image || null;
		this.#tabSize = Math.max(10, Math.min(this.#width, this.#height) / 4);
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

	get tabSize() {
		return this.#tabSize;
	}

	cut(ordinal) {
		if (!(ordinal instanceof Position2d)) {
			throw new Error('Jigsaw: Cut(): Invalid Position');
		}
		let { width, height } = this;
		const tabSize = this.#tabSize;

		// get the directions based upon the ordinal position
		const { north, east, south, west } = this.#pieceEdges[ordinal.y][ordinal.x];

		// next, determine the actual width and height of the canvas based upon the cut of jigsaw and the starting position
		//    if it is an edge, no change
		//    if it is an innyTab, add the tabSize to the width or height
		//    if it is an outyTab, subtract the tabSize from the width or height
		let sx = ordinal.x * width;
		let sy = ordinal.y * height;
		if (north.shape === Jigsaw.INNYTAB) {
			height += tabSize;
			sy -= tabSize;
		} else if (north.shape === Jigsaw.OUTYTAB) {
			height -= tabSize;
			sy += tabSize;
		}
		height += (south.shape === Jigsaw.INNYTAB ? tabSize : 0);
		if (west === Jigsaw.INNYTAB) {
			width += tabSize;
			sx -= tabSize;
		} else if (west.shape === Jigsaw.OUTYTAB) {
			width -= tabSize;
			sx += tabSize;
		}
		width += (east.shape === Jigsaw.INNYTAB ? tabSize : 0);

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		// console.log(ordinal.y,ordinal.x,north,east,south,west, sx, sy, width, height);

		const ctx = canvas.getContext('2d');
		ctx.beginPath();

		let x = west.shape === Jigsaw.OUTYTAB ? this.#tabSize : 0;
		let y = north.shape === Jigsaw.OUTYTAB ? this.#tabSize : 0;

		if (north.shape === Jigsaw.INNYTAB) {

		} else if (north.shape === Jigsaw.OUTYTAB) {
			this.#outyNorth({ x, y, width, ctx });
		}

		x += width;
		ctx.lineTo(x, y);
		if (east.shape === Jigsaw.INNYTAB) {

		} else if (east.shape === Jigsaw.OUTYTAB) {

		}

		y += height;
		ctx.lineTo(x, y);
		if (south.shape === Jigsaw.INNYTAB) {

		} else if (south.shape === Jigsaw.OUTYTAB) {

		}

		x -= width;
		ctx.lineTo(x, y);
		if (west.shape === Jigsaw.INNYTAB) {

		} else if (west.shape === Jigsaw.OUTYTAB) {

		}

		y -= height;
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(
			this.image,
			sx,
			sy,
			width,
			height,
			0,
			0,
			width,
			height);


		// this.#outyNorth({ x, y, ctx });
		// this.#innyNorth({ x, y, ctx });

		/*ctx.lineTo(x + width, y);
		this.#innyEast({ x: x + width, y, ctx });*/

		/*// Right edge
		ctx.lineTo(x + width, y + height / 3);
		ctx.bezierCurveTo(x + width + tabSize, y + height / 3 + tabSize, x + width + tabSize, y + 2 * height / 3 - tabSize, x + width, y + 2 * height / 3);
		ctx.lineTo(x + width, y + height);*/

		// Bottom edge
		/*ctx.lineTo(x + 2 * width / 3, y + height);
		ctx.bezierCurveTo(x + 2 * width / 3 - tabSize, y + height + tabSize, x + width / 3 + tabSize, y + height + tabSize, x + width / 3, y + height);
		ctx.lineTo(x, y + height);*/

		// Left edge
		/*ctx.lineTo(x, y + 2 * height / 3);
		ctx.bezierCurveTo(x - tabSize, y + 2 * height / 3 - tabSize, x - tabSize, y + height / 3 + tabSize, x, y + height / 3);
		ctx.lineTo(x, y);*/

		// ctx.closePath();
		// ctx.stroke();
		// ctx.clip();

		/*ctx.drawImage(
			this.image,
			ordinal.x * width,
			ordinal.y * height,
			width,
			height,
			0,
			0,
			width,
			height);*/



		const piece = document.createElement("span");
		piece.classList.add("piece");
		piece.appendChild(canvas);
		return piece;
	}

	createPieceEdges(args = {}) {
		const { rows = 0, columns = 0 } = args;
		this.#pieceEdges = [];
		for (let row = 0; row < rows; row++) {
			const rowEdges = [];
			for (let column = 0; column < columns; column++) {
				rowEdges.push({
					north: { shape: null, width: null, height: null },
					east: { shape: null, width: null, height: null },
					south: { shape: null, width: null, height: null },
					west: { shape: null, width: null, height: null } });
			}
			this.#pieceEdges.push(rowEdges);
		}
		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				const piece = this.#pieceEdges[row][column];
				if (row === 0) {
					piece.north.shape = Jigsaw.EDGE;
				}
				if (row === rows - 1) {
					piece.south.shape = Jigsaw.EDGE;
				}
				if (column === 0) {
					piece.west.shape = Jigsaw.EDGE;
				}
				if (column === columns - 1) {
					piece.east.shape = Jigsaw.EDGE;
				}
				if (piece.south.shape === null) {
					piece.south.shape = Math.random() < .5 ? Jigsaw.INNYTAB : Jigsaw.OUTYTAB;
					this.#pieceEdges[row + 1][column].north.shape = piece.south.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
				}
				if (piece.east.shape === null) {
					piece.east.shape = Math.random() < .5 ? Jigsaw.INNYTAB : Jigsaw.OUTYTAB;
					this.#pieceEdges[row][column + 1].west.shape = piece.east.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB
				}
			}
		}
		return this.#pieceEdges;
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
		let { x, y, width, ctx } = args;
		const tabSize = this.#tabSize;
		const midPoint = width / 2;
		const tabSizeHalf = tabSize / 2;
		console.log(`-----tabsize = ${tabSize}}`);

		/*y += this.#tabSize;
		ctx.moveTo(x, y);*/

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