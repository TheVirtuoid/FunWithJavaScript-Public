import Jigsaw from "../../src/classes/cuts/Jigsaw.js";
import Position2d from "../../src/classes/support/Position2d.js";

describe('When I work with the Jigsaw cut class', () => {
	it('should initialize empty', () => {
		const jigsaw = new Jigsaw();
		expect(jigsaw).to.be.instanceOf(Jigsaw);
		expect(jigsaw.width).to.equal(0);
		expect(jigsaw.height).to.equal(0);
		expect(jigsaw.image).to.equal(null);
	});

	it('should initialize for width, height, and image', () => {
		const image = new Image();
		const jigsaw = new Jigsaw({ width: 100, height: 100, image });
		expect(jigsaw.width).to.equal(100);
		expect(jigsaw.height).to.equal(100);
		expect(jigsaw.image).to.equal(image);
	});

	it('throw error if position is not a Position2d', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const jigsaw = new Jigsaw({ width: 100, height: 100, image });
		expect(() => jigsaw.cut('invalid')).to.throw();
	});

	it('should cut out a piece from the image', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const jigsaw = new Jigsaw({ width: 80, height: 60, image });
		const piece = jigsaw.cut(new Position2d({ x: 0, y: 0 }));
		expect(piece).to.be.instanceOf(HTMLSpanElement);
		const canvas = piece.querySelector('canvas');
		expect(canvas.width).to.equal(80);
		expect(canvas.height).to.equal(60);
	});

	it('should return ordinal pieces with edge specifications', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const rows = 6;
		const columns = 8;
		const jigsaw = new Jigsaw({ width: 100, height: 100, image });
		const pieceEdges = jigsaw.createPieceEdges({ rows, columns });
		for(let x = 0; x < rows; x++) {
			for(let y = 0; y < columns; y++) {
				if (x === 0) {
					expect(pieceEdges[x][y].north).to.equal(Jigsaw.EDGE);
				}
				if (x === rows - 1) {
					expect(pieceEdges[x][y].south).to.equal(Jigsaw.EDGE);
				}
				if (y === 0) {
					expect(pieceEdges[x][y].west).to.equal(Jigsaw.EDGE);
				}
				if (y === columns - 1) {
					expect(pieceEdges[x][y].east).to.equal(Jigsaw.EDGE);
				}
				const north = pieceEdges[x][y].north;
				const east = pieceEdges[x][y].east;
				const south = pieceEdges[x][y].south;
				const west = pieceEdges[x][y].west;
				if (north !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x - 1][y].south;
					const testEdge = north === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (east !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x][y + 1].west;
					const testEdge = east === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (south !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x + 1][y].north;
					const testEdge = south === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (west !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x][y - 1].east;
					const testEdge = west === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
			}
		}
	});
});