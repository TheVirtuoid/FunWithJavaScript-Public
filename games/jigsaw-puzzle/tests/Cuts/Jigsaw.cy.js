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
		const jigsaw = new Jigsaw({ width: 100, height: 100, image, tabSizeDivisor: 4, tabSizeMinimum: 10 });
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
		const jigsaw = new Jigsaw({ width: 80, height: 60, image,  tabSizeDivisor: 4, tabSizeMinimum: 10 });
		jigsaw.configurePuzzleCut({ rows: 10, columns: 10, pieceWidth: 80, pieceHeight: 60 });
		const piece = jigsaw.cut(new Position2d({ x: 0, y: 0 }));
		expect(piece).to.be.instanceOf(HTMLSpanElement);
		const canvas = piece.querySelector('canvas');
		const tabSize = jigsaw.tabSize;
		expect(canvas.width).to.be.below(80 + tabSize + 1);
		expect(canvas.height).to.be.below(60 + tabSize + 1);
	});

	it('should return ordinal pieces with edge specifications (configurePuzzleCut)', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const rows = 6;
		const columns = 8;
		const pieceHeight = 100;
		const pieceWidth = 100;
		const jigsaw = new Jigsaw({ width: pieceWidth, height: pieceHeight, image,  tabSizeDivisor: 4, tabSizeMinimum: 10 });
		const tabSize = jigsaw.tabSize;
		const pieceEdges = jigsaw.configurePuzzleCut({ rows, columns, pieceWidth, pieceHeight });
		for(let row = 0; row < rows; row++) {
			for(let column = 0; column < columns; column++) {
				const { north, east, south, west, width, height, startingX, startingY, checkingPoint, xAdjust, yAdjust } = pieceEdges[row][column];
				if (row === 0) {
					expect(north).to.equal(Jigsaw.EDGE);
				}
				if (row === rows - 1) {
					expect(south).to.equal(Jigsaw.EDGE);
				}
				if (column === 0) {
					expect(west).to.equal(Jigsaw.EDGE);
				}
				if (column === columns - 1) {
					expect(east).to.equal(Jigsaw.EDGE);
				}
				if (north !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[row - 1][column].south;
					const testEdge = north === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (east !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[row][column + 1].west;
					const testEdge = east === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (south !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[row + 1][column].north;
					const testEdge = south === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				if (west !== Jigsaw.EDGE) {
					const otherEdge = pieceEdges[row][column - 1].east;
					const testEdge = west === Jigsaw.INNYTAB ? Jigsaw.OUTYTAB : Jigsaw.INNYTAB;
					expect(otherEdge).to.equal(testEdge);
				}
				let testWidth = pieceWidth;
				let testHeight = pieceHeight;
				testWidth += (east === Jigsaw.OUTYTAB ? tabSize : 0) + (west === Jigsaw.OUTYTAB ? tabSize : 0);
				testHeight += (north === Jigsaw.OUTYTAB ? tabSize : 0) + (south === Jigsaw.OUTYTAB ? tabSize : 0);
				expect(width).to.equal(testWidth);
				expect(height).to.equal(testHeight);

				let testStartingX = column * pieceWidth - (west === Jigsaw.OUTYTAB ? tabSize : 0);
				let testStartingY = row * pieceHeight - (north === Jigsaw.OUTYTAB ? tabSize : 0);
				expect(startingX).to.equal(testStartingX);
				expect(startingY).to.equal(testStartingY);

				expect(checkingPoint.x).to.equal(column * pieceWidth + pieceWidth / 2);
				expect(checkingPoint.y).to.equal(row * pieceHeight + pieceHeight / 2);
				expect(checkingPoint.width).to.equal(pieceWidth);
				expect(checkingPoint.height).to.equal(pieceHeight);

				expect(xAdjust).to.equal(west === Jigsaw.OUTYTAB ? -tabSize : 0);
				expect(yAdjust).to.equal(north === Jigsaw.OUTYTAB ? -tabSize : 0);
			}
		}
	});
});