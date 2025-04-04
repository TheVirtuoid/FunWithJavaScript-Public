import Jigsaw from "../Jigsaw.js";

const edgeEast = (args) => {
	let { x, y, height, south, north, tabSize, ctx } = args;
	y += height - (south === Jigsaw.OUTYTAB ? tabSize : 0) - (north === Jigsaw.OUTYTAB ? tabSize : 0);
	ctx.lineTo(x, y);
	return { x, y };
}
export default edgeEast;