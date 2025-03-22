import CutBase from "../../src/classes/cuts/CutBase.js";
import Position2d from "../../src/classes/support/Position2d.js";

describe('When I work with the CutBase class', () => {
	it('should initialize empty', () => {
		const cutBase = new CutBase();
		expect(cutBase).to.be.instanceOf(CutBase);
		expect(cutBase.width).to.equal(0);
		expect(cutBase.height).to.equal(0);
		expect(cutBase.image).to.equal(null);
	});

	it('should initialize for width, height, and image', () => {
		const image = new Image();
		const cutBase = new CutBase({ width: 100, height: 100, image });
		expect(cutBase.width).to.equal(100);
		expect(cutBase.height).to.equal(100);
		expect(cutBase.image).to.equal(image);
	});

	it('throw error as cut is not defined', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const cutBase = new CutBase({ width: 100, height: 100, image });
		expect(() => cutBase.cut()).to.throw();
	});

	it('throw error as configurePuzzleCut is not defined', () => {
		const image = new Image();
		image.width = 800;
		image.height = 600;
		const cutBase = new CutBase({ width: 100, height: 100, image });
		expect(() => cutBase.configurePuzzleCut()).to.throw();
	});

});