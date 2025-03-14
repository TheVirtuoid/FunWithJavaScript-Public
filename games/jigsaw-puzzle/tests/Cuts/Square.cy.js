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
});