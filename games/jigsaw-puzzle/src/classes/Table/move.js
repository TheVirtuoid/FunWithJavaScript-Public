import Position2d from "../support/Position2d.js";
import Status from "../support/Status.js";

const moveAllPieces = (piece, position) => {
	const { x, y } = position;
	const { x: x1, y: y1 } = piece;
	const distanceX = x - x1;
	const distanceY = y - y1;
	// if the piece has no parent and no children, it is the only thing to move.
	// if the piece has no parent but has children, then move the piece and move the children relatively
	if (piece.parent) {
		const parent = piece.parent;
		parent.moveRelative( new Position2d({ x: distanceX, y: distanceY }));
		parent.children.forEach((child) => {
			child.moveRelative(new Position2d({ x: distanceX, y: distanceY }));
		});
	} else {
		piece.move({ x, y });
		piece.children.forEach((child) => {
			child.moveRelative(new Position2d({ x: distanceX, y: distanceY }));
		});
	}
}
export { moveAllPieces };