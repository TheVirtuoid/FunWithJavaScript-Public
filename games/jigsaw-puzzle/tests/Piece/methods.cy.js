import Piece from "../../src/classes/Piece/Piece.js";
import Position2d from "../../src/classes/support/Position2d.js";

describe('When I perform methods on a Piece', () => {
	it('should move to another position', () => {
		const piece = new Piece({ position: { x: 1, y: 1 } });
		piece.move({ x: 2, y: 2 });
		expect(piece.x).to.be.equal(2);
		expect(piece.y).to.be.equal(2);
	});

	it('should move a piece relative to its current position', () => {
		const piece = new Piece({ position: { x: 1, y: 1 } });
		piece.moveRelative({ x: 1, y: 1 });
		expect(piece.x).to.be.equal(2);
		expect(piece.y).to.be.equal(2);
	});

	it('should add a child', () => {
		const piece = new Piece();
		const child = new Piece();
		piece.addChild(child);
		expect(piece.children.length).to.be.equal(1);
		expect(child.parent).to.equal(piece);
	});

	it('should NOT find a child', () => {
		const piece = new Piece();
		const child = new Piece();
		const badPiece = new Piece();
		piece.addChild(child);
		expect(piece.hasChild(badPiece)).to.be.false;
	});

	it('should find a child', () => {
		const piece = new Piece();
		const child = new Piece();
		piece.addChild(child);
		expect(piece.hasChild(child)).to.be.true;
	});

	it('should NOT find a child based upon an ordinal', () => {
		const piece = new Piece({ ordinal: new Position2d({ x: 0, y: 0 })});
		const child = new Piece({ ordinal: new Position2d({ x: 1, y: 0 })});
		piece.addChild(child);
		expect(piece.getChildByOrdinal(new Position2d({ x: 2, y: 0 }))).to.be.null;
	});

	it('should find a child based upon an ordinal', () => {
		const piece = new Piece({ ordinal: new Position2d({ x: 0, y: 0 })});
		const child = new Piece({ ordinal: new Position2d({ x: 1, y: 0 })});
		piece.addChild(child);
		expect(piece.getChildByOrdinal(new Position2d({ x: 1, y: 0 }))).to.equal(child);
	});

	it('should report that is has a parent', () => {
		const piece = new Piece();
		const parent = new Piece();
		parent.addChild(piece);
		expect(piece.hasParent()).to.equal(true);
	});

	it('should report that is does NOT have a parent', () => {
		const piece = new Piece();
		const parent = new Piece();
		parent.addChild(piece);
		expect(parent.hasParent()).to.equal(false);
	});

	it('should report that is has at least one child', () => {
		const piece = new Piece();
		const parent = new Piece();
		parent.addChild(piece);
		expect(parent.hasChildren()).to.equal(true);
	});

	it('should report that is does NOT have any children', () => {
		const piece = new Piece();
		const parent = new Piece();
		parent.addChild(piece);
		expect(piece.hasChildren()).to.equal(false);
	});

	it('should remove a child', () => {
		const piece = new Piece();
		const child = new Piece();
		piece.addChild(child);
		const removedPiece = piece.removeChild(child);
		expect(removedPiece).to.equal(child);
		expect(piece.children.length).to.be.equal(0);
		expect(child.parent).to.be.null;
	});

	it('should NOT remove a child if that child cannot be found', () => {
		const piece = new Piece();
		const child = new Piece();
		const missingChild = new Piece();
		piece.addChild(child);
		const removedPiece = piece.removeChild(missingChild);
		expect(removedPiece).to.be.null;
		expect(piece.hasChild(child)).to.be.true;
		expect(child.parent).to.equal(piece);
	});

	describe('and when I attempt to move a piece to another piece', () => {
		it('should move when there is no parent nor children', () => {
			const target = new Piece();
			const piece = new Piece();
			piece.moveTo(target);
			expect(target.hasChild(piece)).to.be.true;
			expect(piece.parent).to.equal(target);
		});

		it('should move when piece is a parent (all children should also move)', () => {
			const piece = new Piece();
			const child1 = new Piece();
			const child2 = new Piece();
			piece.addChild(child1);
			piece.addChild(child2);
			const target = new Piece();
			piece.moveTo(target);
			expect(target.hasChild(child1)).to.be.true;
			expect(target.hasChild(child2)).to.be.true;
			expect(target.hasChild(piece)).to.be.true;
			expect(child1.parent).to.equal(target);
			expect(child2.parent).to.equal(target);
			expect(piece.parent).to.equal(target);
		});

		it('should move when there piece is a child (parent loses the piece)', () => {
			const piece = new Piece();
			const parent = new Piece();
			const target = new Piece();
			parent.addChild(piece);
			piece.moveTo(target);
			expect(parent.hasChild(piece)).to.be.false;
			expect(target.hasChild(piece)).to.be.true;
			expect(piece.parent).to.equal(target);
		});

		it('should move when the target piece is a child (it becomes a child of the target parent', () => {
			const piece = new Piece();
			const target = new Piece();
			const parent = new Piece();
			parent.addChild(target);
			piece.moveTo(target);
			expect(target.hasChild(piece)).to.be.false;
			expect(parent.hasChild(piece)).to.be.true;
		});
	});

});