import StatusInitialConnection from "../../../src/classes/support/Status/StatusInitialConnection.js";
import Status from "../../../src/classes/support/Status/Status.js";
import Piece from "../../../src/classes/Piece/Piece.js";
import Position2d from "../../../src/classes/support/Position2d.js";
import StatusConnected from "../../../src/classes/support/Status/StatusConnected.js";
import StatusNoConnection from "../../../src/classes/support/Status/StatusNoConnection.js";

describe('When working with the StatusInitialConnection class', () => {
	it('should set the code to INITIAL_CONNECTED', () => {
		const piece = new Piece();
		const toPieceNorth = new Piece();
		const toPieceSouth = new Piece();
		const toPieceEast = new Piece();

		const north = new StatusConnected({ fromPiece: piece, toPiece: toPieceNorth, adjustment: new Position2d({ x: 0, y: -1 }), piecesRemaining: 10 });
		const east = new StatusConnected({ fromPiece: piece, toPiece: toPieceEast, adjustment: new Position2d({ x: 0, y: -1 }), piecesRemaining: 10 });
		const south = new StatusConnected({ fromPiece: piece, toPiece: toPieceSouth, adjustment: new Position2d({ x: 0, y: -1 }), piecesRemaining: 10 });
		const west = new StatusNoConnection({ piece });

		const status = new StatusInitialConnection({ piece, north, east, south, west });
		expect(status.code).to.equal(Status.INITIAL_CONNECTION);
		expect(status.data).to.be.null;
		expect(status.north).to.be.instanceof(StatusConnected);
		expect(status.east).to.be.instanceof(StatusConnected);
		expect(status.south).to.be.instanceof(StatusConnected);
		expect(status.west).to.be.instanceof(StatusNoConnection);
		expect(status.piece).to.equal(piece);
	});
});