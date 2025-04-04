import Jigsaw from "../Jigsaw.js";

const outyNorth = (args) => {
	let { x, y, width, tabSize, east, west, ctx } = args;

	width -= (east === Jigsaw.OUTYTAB ? tabSize : 0) + (west === Jigsaw.OUTYTAB ? tabSize : 0);
	const midPoint = width / 2;
	const tabSizeHalf = tabSize / 2;

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
		y
	);
	x = x + tabSizeHalf + midPoint;
	ctx.lineTo(x, y);
	return { x, y};
}

export default outyNorth;