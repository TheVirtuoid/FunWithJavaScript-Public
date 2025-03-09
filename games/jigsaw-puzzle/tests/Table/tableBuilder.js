import ImageDb from "../../src/classes/databases/ImageDb/ImageDb.js";
import {cuts, images, numPieces} from "../databases/support.js";
import CutDb from "../../src/classes/databases/CutDb/CutDb.js";
import NumPiecesDb from "../../src/classes/databases/NumPiecesDb/NumPiecesDb.js";

const tableBuilder = () => {
	ImageDb.reset(images);
	CutDb.reset(cuts);
	NumPiecesDb.reset(numPieces);
	const testImage = images[0].images[0];
	const testCut = cuts[0];
	const testNumPieces = numPieces[0];
	const imageDb = new ImageDb();
	const cutDb = new CutDb();
	const numPiecesDb = new NumPiecesDb();
	const imageData = imageDb.get(testImage.id);
	const numPiecesData = numPiecesDb.get(testNumPieces.id);
	const cutData = cutDb.get(testCut.id);
	const dimensions = { x: 600, y: 400};
	const pieceHeight = 400 / testNumPieces.dimensions.y;
	const pieceWidth = 600 / testNumPieces.dimensions.x;
	const numPieces32 = numPieces[2];
	return { testImage, testCut, testNumPieces, imageDb, cutDb, numPiecesDb, imageData, numPiecesData, cutData, pieceWidth, pieceHeight, dimensions, numPieces32 };
}

export default tableBuilder;