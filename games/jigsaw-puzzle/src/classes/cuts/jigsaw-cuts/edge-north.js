import Jigsaw from "../Jigsaw.js";

const edgeNorth = (args) => {
	let { x, y, width, ctx, east, west, tabSize } = args;
	x += width - (east === Jigsaw.OUTYTAB ? tabSize : 0) - (west === Jigsaw.OUTYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeNorth;