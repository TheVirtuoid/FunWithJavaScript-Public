import Position2d from "../support/Position2d.js";

import outyEast from "./jigsaw-cuts/outy-east.js";
import innyEast from "./jigsaw-cuts/inny-east.js";
import edgeSouth from "./jigsaw-cuts/edge-south.js";
import edgeNorth from "./jigsaw-cuts/edge-north.js";
import innySouth from "./jigsaw-cuts/inny-south.js";
import outySouth from "./jigsaw-cuts/outy-south.js";

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
		const { north, east, south, west, width, height, startingX, startingY } = this.#pieceEdges[ordinal.y][ordinal.x];
		const tabSize = this.#tabSize;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		console.log(ordinal.y,ordinal.x,north,east,south,west, startingX, startingY, width, height);

		const ctx = canvas.getContext('2d');
		ctx.beginPath();

		let x = north === Jigsaw.OUTYTAB ? tabSize : 0;
		let y = west === Jigsaw.OUTYTAB ? tabSize : 0;

		ctx.moveTo(x,y);

		switch(north) {
			case Jigsaw.INNYTAB:
				// this.#innyNorth({ x, y, width, tabSize, ctx, west, east });
				({ x, y } = this.#edgeNorth({ x, y, width, tabSize, ctx, west, east }));
				break;
			case Jigsaw.OUTYTAB:
				// this.#outyNorth({ x, y, width, tabSize, ctx, west, east });
				this.#edgeNorth({ x, y, width, tabSize, ctx, west, east });
				break;
			case Jigsaw.EDGE:
				({ x, y } = this.#edgeNorth({ x, y, width, tabSize, ctx, west, east }));
				break;
		}

		// x += width;
		// ctx.lineTo(x, y);
		switch(east) {
			case Jigsaw.INNYTAB:
				({ x, y } = this.#innyEast({ x, y, height, tabSize, ctx, north, south }));
				break;
			case Jigsaw.OUTYTAB:
				({ x, y } = this.#outyEast({ x, y, height, tabSize, ctx, north, south }));
				break;
			case Jigsaw.EDGE:
				({ x, y } = this.#edgeEast({ x, y, height, tabSize, ctx, north, south }));
				break;
		}

		/*y += height;
		ctx.lineTo(x, y);*/
		switch(south) {
			case Jigsaw.INNYTAB:
				({ x, y } = this.#innySouth({ x, y, width, tabSize, ctx, west, east }));
				break;
			case Jigsaw.OUTYTAB:
				({ x, y } = this.#outySouth({ x, y, width, tabSize, ctx, west, east }));
				break;
			case Jigsaw.EDGE:
				({ x, y } = this.#edgeSouth({ x, y, width, tabSize, ctx, west, east }));
				break;
		}

		x -= width;
		ctx.lineTo(x, y);
		/*switch(west) {
			case Jigsaw.INNYTAB:
				// this.#innyWest({ x, y, width, tabSize, ctx, west, east });
				this.#edgeWest({ x, y, height, tabSize, ctx, north, south });
				break;
			case Jigsaw.OUTYTAB:
				// this.#outyWest({ x, y, height, tabSize, ctx, north, south });
				this.#edgeWest({ x, y, height, tabSize, ctx, north, south });
				break;
			case Jigsaw.EDGE:
				this.#edgeWest({ x, y, height, tabSize, ctx, north, south });
				break;
		}*/

		ctx.closePath();
		ctx.stroke();

		ctx.clip();
		ctx.drawImage(
			this.image,
			startingX,
			startingY,
			width,
			height,
			0,
			0,
			width,
			height
		);
		const piece = document.createElement("span");
		piece.classList.add("piece");
		piece.appendChild(canvas);
		return piece;
	}

	configurePuzzleCut(args = {}) {
		const { rows = 0, columns = 0, pieceWidth = 0, pieceHeight = 0 } = args;
		this.#pieceEdges = [];
		for (let row = 0; row < rows; row++) {
			const rowEdges = [];
			for (let column = 0; column < columns; column++) {
				rowEdges.push({
					north: null,
					east: null,
					south: null,
					west: null,
					width: 0,
					height: 0,
					startingX: 0,
					startingY: 0,
					checkingPoint: {
						x: 0,
						y: 0,
						width: 0,
						height: 0
					}
				});
			}
			this.#pieceEdges.push(rowEdges);
		}
		for (let row = 0; row < rows; row++) {
			for (let column = 0; column < columns; column++) {
				const piece = this.#pieceEdges[row][column];
				piece.width = pieceWidth;
				piece.height = pieceHeight;
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
					this.#pieceEdges[row + 1][column].north = piece.south === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
				}
				if (piece.east === null) {
					piece.east = Math.random() < .5 ? Jigsaw.INNYTAB : Jigsaw.OUTYTAB;
					this.#pieceEdges[row][column + 1].west = piece.east === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB
				}
				piece.width += (piece.east === Jigsaw.INNYTAB ? this.#tabSize : 0) + (piece.west === Jigsaw.INNYTAB ? this.#tabSize : 0);
				piece.height += (piece.north === Jigsaw.INNYTAB ? this.#tabSize : 0) + (piece.south === Jigsaw.INNYTAB ? this.#tabSize : 0);

				piece.startingX = column * pieceWidth - (piece.west === Jigsaw.INNYTAB ? this.#tabSize : 0);
				piece.startingY = row * pieceHeight - (piece.north === Jigsaw.INNYTAB ? this.#tabSize : 0);

				piece.checkingPoint.x = column * pieceWidth + pieceWidth / 2;
				piece.checkingPoint.y = row * pieceHeight + pieceHeight / 2;
				piece.checkingPoint.width = pieceWidth;
				piece.checkingPoint.height = pieceHeight;
			}
		}
		return this.#pieceEdges;
	};

	#edgeNorth(args) {
		return edgeNorth(args);
	}

	#edgeEast(args) {
		// return edgeEast(args);
		let { x, y, height, ctx, north, south } = args;
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + height - (south === Jigsaw.OUTYTAB ? this.#tabSize : 0));
		return { x, y };
	}

	#edgeSouth(args) {
		return edgeSouth(args);
	}

	#edgeWest(args) {
		let { x, y, height, ctx, north, south } = args;
		ctx.moveTo(x, y);
		ctx.lineTo(x, y - height + (north === Jigsaw.OUTYTAB ? this.#tabSize : 0));
	}

	// render from east to west
	#innyNorth(args) {
		let { x, y, width, ctx, west, east } = args;
		const tabSize = this.#tabSize;
		const midPoint = width / 2;
		const tabSizeHalf = tabSize / 2;

		x += west === Jigsaw.OUTYTAB ? tabSize : 0;
		ctx.moveTo(x, y);

		x = midPoint - tabSizeHalf;
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
		x = width - (east === Jigsaw.INNYTAB ? tabSize : 0);
		ctx.lineTo(x, y);
	}

	// render from east to west
	#innySouth(args) {
		return innySouth(args);
	}

	// east moves from north to south
	#innyEast(args) {
		return innyEast(args)
	}

	// west moves from south to north
	#innyWest(args) {
		let { x, y, height, ctx, north, south } = args;
		const tabSize = this.#tabSize;
		const midPoint = height / 2;
		const tabSizeHalf = tabSize / 2;

		y += north === Jigsaw.OUTYTAB ? tabSize : 0;
		ctx.moveTo(x, y);

		y = midPoint + tabSize;
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
			y + tabSize);
		y = height = (south === Jigsaw.INNYTAB ? tabSize : 0);
		ctx.lineTo(x, y);
	}

	#outyNorth(args = {}) {
		let { x, y, width, ctx, west, east } = args;
		const tabSize = this.#tabSize;
		const midPoint = width / 2;
		const tabSizeHalf = tabSize / 2;

		y += tabSize;
		x += west === Jigsaw.OUTYTAB ? tabSize : 0;

		ctx.moveTo(x,y);

		x = midPoint - tabSizeHalf;
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
		x = width - (east === Jigsaw.OUTYTAB ? tabSize : 0);
		ctx.lineTo(x, y);
	}
	#outySouth(args) {
		return outySouth(args);
	}

	#outyEast(args) {
		return outyEast(args);
	}

	// west is drawn from south to north (bottom to top);
	#outyWest(args) {
		let { x, y, height, ctx, north, south } = args;
		const tabSize = this.#tabSize;
		const midPoint = height / 2;
		const tabSizeHalf = tabSize / 2;

		x += tabSize;
		y -= south === Jigsaw.OUTYTAB ? tabSize : 0;

		ctx.moveTo(x, y);

		y = midPoint + tabSizeHalf;
		ctx.lineTo(x, y);
		ctx.bezierCurveTo(
			x - tabSizeHalf / 3,
			y - tabSizeHalf,
			x - 2 * tabSizeHalf / 3,
			y,
			x - tabSizeHalf,
			y);
		ctx.bezierCurveTo(
			x - tabSize,
			y - tabSizeHalf / 2,
			x - tabSize,
			y - 3 * tabSizeHalf / 2,
			x - tabSizeHalf,
			y - tabSize);
		ctx.bezierCurveTo(
			x - 2 * tabSizeHalf / 3,
			y - tabSize,
			x - tabSizeHalf / 3,
			y - tabSizeHalf,
			x,
			y - tabSize
		);
		y = 0 + (north === Jigsaw.OUTYTAB ? tabSize : 0);
		ctx.lineTo(x, y);
	}
}