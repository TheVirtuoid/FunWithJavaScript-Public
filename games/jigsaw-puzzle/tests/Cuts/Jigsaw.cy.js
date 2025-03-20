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

	it('should initialize for tabSize, width, height, and image', () => {
		const image = new Image();
		const jigsaw = new Jigsaw({ width: 100, height: 100, image });
		expect(jigsaw.width).to.equal(100);
		expect(jigsaw.height).to.equal(100);
		expect(jigsaw.image).to.equal(image);
		expect(jigsaw.tabSize).to.equal(25);
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
		jigsaw.createPieceEdges({ rows: 10, columns: 10 });
		const piece = jigsaw.cut(new Position2d({ x: 0, y: 0 }));
		expect(piece).to.be.instanceOf(HTMLSpanElement);
		const canvas = piece.querySelector('canvas');
		const tabSize = jigsaw.tabSize;
		let width =
		expect(canvas.width).to.be.below(80 + tabSize + 1);
		expect(canvas.height).to.be.below(60 + tabSize + 1);
	});

	it('should return ordinal pieces with edge specifications', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const rows = 6;
		const columns = 8;
		const pieceHeight = 100;
		const pieceWidth = 100;
		const jigsaw = new Jigsaw({ width: pieceWidth, height: pieceHeight, image });
		const pieceEdges = jigsaw.createPieceEdges({ rows, columns });
		for(let x = 0; x < rows; x++) {
			for(let y = 0; y < columns; y++) {
				let width = pieceWidth;
				let height = pieceHeight;
				const { north, east, south, west } = pieceEdges[x][y];
				if (x === 0) {
					expect(north.shape).to.equal(Jigsaw.EDGE);
				}
				if (x === rows - 1) {
					expect(south.shape).to.equal(Jigsaw.EDGE);
				}
				if (y === 0) {
					expect(west.shape).to.equal(Jigsaw.EDGE);
				}
				if (y === columns - 1) {
					expect(east.shape).to.equal(Jigsaw.EDGE);
				}
				if (north.shape !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x - 1][y].south.shape;
					const testEdge = north.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (east.shape !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x][y + 1].west.shape;
					const testEdge = east.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (south.shape !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x + 1][y].north.shape;
					const testEdge = south.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (west.shape !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[x][y - 1].east.shape;
					const testEdge = west.shape === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				width += (east.shape === Jigsaw.INNYTAB ? 10 : 0) + (west.shape === Jigsaw.INNYTAB ? 10 : 0);
				height += (north.shape === Jigsaw.INNYTAB ? 10 : 0) + (south.shape === Jigsaw.INNYTAB ? 10 : 0);
				width -= (east.shape === Jigsaw.OUTYTAB ? 10 : 0) - (west.shape === Jigsaw.OUTYTAB ? 10 : 0);
				height -= (north.shape === Jigsaw.OUTYTAB ? 10 : 0) - (south.shape === Jigsaw.OUTYTAB ? 10 : 0);
			}
		}
	});
});