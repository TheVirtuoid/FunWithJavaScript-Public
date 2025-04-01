import Jigsaw from "../Jigsaw.js";

const edgeEast = (args) => {
	let { x, y, height, tabSize, tabLocationOffset, ctx, north, south } = args;
	if (north === Jigsaw.OUTYTAB) {
		y += tabSize;
		height -= tabSize;
	}
	if (south === Jigsaw.OUTYTAB) {
		height -= tabSize;
	}
	y += height;
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeEast;