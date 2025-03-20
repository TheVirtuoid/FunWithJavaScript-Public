import Square from "../../src/classes/cuts/Square.js";
import Position2d from "../../src/classes/support/Position2d.js";

describe('When I work with the Square cut class', () => {
	it('should initialize empty', () => {
		const square = new Square();
		expect(square).to.be.instanceOf(Square);
		expect(square.width).to.equal(0);
		expect(square.height).to.equal(0);
		expect(square.image).to.equal(null);
	});

	it('should initialize for width, height, and image', () => {
		const image = new Image();
		const square = new Square({ width: 100, height: 100, image });
		expect(square.width).to.equal(100);
		expect(square.height).to.equal(100);
		expect(square.image).to.equal(image);
	});

	it('throw error if position is not a Position2d', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const square = new Square({ width: 100, height: 100, image });
		expect(() => square.cut('invalid')).to.throw();
	});

	it('should cut out a piece from the image', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const square = new Square({ width: 80, height: 60, image });
		const piece = square.cut(new Position2d({ x: 0, y: 0 }));
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
		const square = new Square({ width: 100, height: 100, image });
		const pieceEdges = square.createPieceEdges({ rows, columns });
		for(let x = 0; x < rows; x++) {
			for(let y = 0; y < columns; y++) {
				const piece = pieceEdges[x][y];
				expect(piece.north.shape).to.equal(Square.EDGE);
				expect(piece.north.width).to.equal(100);
				expect(piece.north.height).to.equal(100);
				expect(piece.east.shape).to.equal(Square.EDGE);
				expect(piece.east.width).to.equal(100);
				expect(piece.east.height).to.equal(100);
				expect(piece.south.shape).to.equal(Square.EDGE);
				expect(piece.south.width).to.equal(100);
				expect(piece.south.height).to.equal(100);
				expect(piece.west.shape).to.equal(Square.EDGE);
				expect(piece.west.width).to.equal(100);
				expect(piece.west.height).to.equal(100);
			}
		}
	});
});