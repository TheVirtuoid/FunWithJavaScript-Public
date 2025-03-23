import Jigsaw from "../Jigsaw.js";

const innyEast = (args) => {
	let { x, y, height, tabSize, ctx, north, south } = args;
	const midPoint = height / 2;
	const tabSizeHalf = tabSize / 2;

	y += north === Jigsaw.OUTYTAB ? tabSize : 0;
	// ctx.moveTo(x, y);

	y = midPoint - tabSize;
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
	y = height - (south === Jigsaw.OUTYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
	// return { x, y };
}

export default innyEast;