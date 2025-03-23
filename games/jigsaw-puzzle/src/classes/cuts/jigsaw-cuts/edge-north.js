import Jigsaw from "../Jigsaw.js";

const edgeNorth = (args) => {
	let { x, y, width, tabSize, ctx, west, east } = args;
	x += width - (east === Jigsaw.OUTYTAB ? tabSize : 0);
	console.log('-----north edge: ',x, y);
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeNorth;