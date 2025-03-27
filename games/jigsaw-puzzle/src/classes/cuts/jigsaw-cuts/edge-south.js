import Jigsaw from "../Jigsaw.js";

const edgeSouth = (args) => {
	let { x, y, width, tabSize, ctx, west, east } = args;
	x = 0 + (west === Jigsaw.OUTYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeSouth;