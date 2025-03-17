import Position2d from "../support/Position2d.js";

export default class Jigsaw {
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

	/*function drawPuzzlePiece(ctx, x, y, width, height, tabSize) {
		ctx.beginPath();
		ctx.moveTo(x, y);

		// Top edge
		ctx.lineTo(x + width / 3, y);
		ctx.bezierCurveTo(x + width / 3 + tabSize, y - tabSize, x + 2 * width / 3 - tabSize, y - tabSize, x + 2 * width / 3, y);
		ctx.lineTo(x + width, y);

		// Right edge
		ctx.lineTo(x + width, y + height / 3);
		ctx.bezierCurveTo(x + width + tabSize, y + height / 3 + tabSize, x + width + tabSize, y + 2 * height / 3 - tabSize, x + width, y + 2 * height / 3);
		ctx.lineTo(x + width, y + height);

		// Bottom edge
		ctx.lineTo(x + 2 * width / 3, y + height);
		ctx.bezierCurveTo(x + 2 * width / 3 - tabSize, y + height + tabSize, x + width / 3 + tabSize, y + height + tabSize, x + width / 3, y + height);
		ctx.lineTo(x, y + height);

		// Left edge
		ctx.lineTo(x, y + 2 * height / 3);
		ctx.bezierCurveTo(x - tabSize, y + 2 * height / 3 - tabSize, x - tabSize, y + height / 3 + tabSize, x, y + height / 3);
		ctx.lineTo(x, y);

		ctx.closePath();
		ctx.stroke();
		ctx.clip();
	}

// Usage example
	const canvas = document.getElementById('puzzleCanvas');
	const ctx = canvas.getContext('2d');
	const img = new Image();
	img.src = 'path/to/your/image.jpg';
	img.onload = () => {
		ctx.drawImage(img, 0, 0);
		drawPuzzlePiece(ctx, 50, 50, 100, 100, 20);
	};*/

	// cut(ctx, x, y, width, height, tabSize) {
	cut(position) {
		if (!(position instanceof Position2d)) {
			throw new Error('Jigsaw: Cut(): Invalid Position');
		}
		const canvas = document.createElement('canvas');
		const { width, height } = this;
		canvas.width = width;
		canvas.height = height;
		const x = 30;
		const y = 50;
		const tabSize = width / 8;
		const ctx = canvas.getContext('2d');
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
		ctx.beginPath();
		ctx.moveTo(x, y);

		// Top edge
		const tabAdjust = tabSize / 3;
		const widthAdjust = width / 3;
		const widthAdjust2 = 2 * (width / 3);
		ctx.lineTo(x + widthAdjust, y);
		ctx.bezierCurveTo(
			x + widthAdjust + tabSize / 2,
			y - tabAdjust,
			x + widthAdjust,
			y - tabAdjust * 2,
			x + widthAdjust,
			y - tabSize);
		ctx.bezierCurveTo(
			x + widthAdjust + widthAdjust / 3,
			y - tabSize - tabAdjust * 2,
			x + widthAdjust + 2 * (widthAdjust / 3),
			y - tabSize - tabAdjust * 2,
			x + 2 * widthAdjust,
			y - tabSize);
		ctx.bezierCurveTo(
			x + 2 * widthAdjust,
			y - tabAdjust * 2,
			x + 2 * widthAdjust - tabSize / 2,
			y - tabAdjust,
			x + widthAdjust *2 ,
			y);



		ctx.lineTo(x + width, y);

		// Right edge
		ctx.lineTo(x + width, y + height / 3);
		ctx.bezierCurveTo(x + width + tabSize, y + height / 3 + tabSize, x + width + tabSize, y + 2 * height / 3 - tabSize, x + width, y + 2 * height / 3);
		ctx.lineTo(x + width, y + height);

		// Bottom edge
		ctx.lineTo(x + 2 * width / 3, y + height);
		ctx.bezierCurveTo(x + 2 * width / 3 - tabSize, y + height + tabSize, x + width / 3 + tabSize, y + height + tabSize, x + width / 3, y + height);
		ctx.lineTo(x, y + height);

		// Left edge
		ctx.lineTo(x, y + 2 * height / 3);
		ctx.bezierCurveTo(x - tabSize, y + 2 * height / 3 - tabSize, x - tabSize, y + height / 3 + tabSize, x, y + height / 3);
		ctx.lineTo(x, y);

		ctx.closePath();
		ctx.stroke();
		ctx.clip();

		const piece = document.createElement("span");
		piece.classList.add("piece");
		piece.appendChild(canvas);
		return piece;
	}

	/*cut(position) {
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
	}*/
}