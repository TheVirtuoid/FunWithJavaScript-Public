import Jigsaw from "../Jigsaw.js";

const edgeWest = (args) => {
	let { x, y, height, tabSize, tabLocationOffset, ctx, north, south } = args;
	if (south === Jigsaw.OUTYTAB) {
		y -= tabSize;
		height -= tabSize;
	}
	if (north === Jigsaw.OUTYTAB) {
		height -= tabSize;
	}
	y -= height;
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeWest;