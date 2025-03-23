import Jigsaw from "../Jigsaw.js";

const edgeSouth = (args) => {
	let { x, y, width, tabSize, ctx, west, east } = args;
	// x -= east === Jigsaw.OUTYTAB ? tabSize : 0;
// 	ctx.moveTo(x, y);
 	// ctx.lineTo(x, y);

	x = 0 + (west === Jigsaw.OUTYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
}
export default edgeSouth;