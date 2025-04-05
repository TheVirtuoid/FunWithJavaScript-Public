import Jigsaw from "../Jigsaw.js";

const outyWest = (args) => {
	let { x, y, height, tabSize, north, south, ctx } = args;

	height -= (north === Jigsaw.OUTYTAB ? tabSize : 0) + (south === Jigsaw.OUTYTAB ? tabSize : 0);

	const midPoint = height / 2;
	const tabSizeHalf = tabSize / 2;


	y = y - midPoint + tabSizeHalf;
	console.log(`     midpoint: ${midPoint}, height: ${height}, new y: ${y}`);
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
	y = y - tabSizeHalf - midPoint;
	ctx.lineTo(x, y);
	return { x, y };
}
export default outyWest;