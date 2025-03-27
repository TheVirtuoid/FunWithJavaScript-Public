import Jigsaw from "../Jigsaw.js";

const innySouth = (args) => {
	let { x, y, width, tabSize, ctx, west, east } = args;
	const midPoint = width / 2;
	const tabSizeHalf = tabSize / 2;

	x = midPoint + tabSizeHalf;
	ctx.lineTo(x, y);
	ctx.bezierCurveTo(
		x - tabSizeHalf,
		y - tabSizeHalf / 3,
		x,
		y - 2 * tabSizeHalf / 3,
		x,
		y - tabSizeHalf);
	ctx.bezierCurveTo(
		x - tabSizeHalf / 2,
		y - tabSize,
		x - 3 * tabSizeHalf / 2,
		y - tabSize,
		x - tabSize,
		y - tabSizeHalf);
	ctx.bezierCurveTo(
		x - tabSize,
		y - 2 * tabSizeHalf / 3,
		x - tabSizeHalf,
		y - tabSizeHalf / 3,
		x - tabSize,
		y);
	x = 0 + (west === Jigsaw.INNYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
	return { x, y };
}
export default innySouth;