import Jigsaw from "../Jigsaw.js";

const edgeSouth = (args) => {
	let { x, y, width, tabSize, tabLocationOffset, ctx, west, east } = args;
	if (west === Jigsaw.OUTYTAB) {
		x -= tabSize;
		width -= tabSize;
	}
	if (east === Jigsaw.OUTYTAB) {
		width -= tabSize;
	}
	x -= width;
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeSouth;