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

	it('should add a DOM element', () => {
		const piece = new Piece();
		const dom = document.createElement('div');
		piece.setDom(dom);
		expect(piece.dom).to.be.instanceof(HTMLDivElement);
	});

	describe('When dealing with a family of piece', () => {
		it('should return only the piece is it is by itself', () => {
			const piece = new Piece();
			const family = piece.getFamily();
			expect(family.length).to.equal(1);
			expect(family).to.include(piece);
		});

		it('should return the family if the piece is a child', () => {
			const piece = new Piece();
			const parent = new Piece();
			const otherChild = new Piece();
			parent.addChild(piece);
			parent.addChild(otherChild);
			const family = piece.getFamily();
			expect(family.length).to.equal(3);
			expect(family).to.include(piece);
			expect(family).to.include(parent);
			expect(family).to.include(otherChild);
		});

		it('should return the family if the piece is a parent', () => {
			const piece = new Piece();
			const parent = new Piece();
			const otherChild = new Piece();
			parent.addChild(piece);
			parent.addChild(otherChild);
			const family = parent.getFamily();
			expect(family.length).to.equal(3);
			expect(family).to.include(piece);
			expect(family).to.include(parent);
			expect(family).to.include(otherChild);
		});
	});

	describe('and when I attempt to move a piece to another piece', () => {
		describe('and when the piece has no children nor parent', () => {
			it('should move the piece as a child when target has no parent or children', () => {
				const target = new Piece();
				const piece = new Piece();
				piece.moveTo(target);
				expect(target.hasChild(piece)).to.be.true;
				expect(piece.parent).to.equal(target);
			});

			it('should move the piece as a child when target is a parent', () => {
				const target = new Piece();
				const child = new Piece();
				const piece = new Piece();
				target.addChild(child);
				piece.moveTo(target);
				expect(target.hasChild(piece)).to.be.true;
				expect(piece.parent).to.equal(target);
			});

			it('should move the piece as a child to target.parent if target is a child', () => {
				const target = new Piece();
				const parent = new Piece();
				const piece = new Piece();
				parent.addChild(target);
				piece.moveTo(target);
				expect(parent.hasChild(piece)).to.be.true;
				expect(piece.parent).to.equal(parent);
				expect(target.hasChild(piece)).to.be.false;
			});
		});

		describe('and when the piece is a parent', () => {
			it('should move itself and all the children as children to the target when target has no parent or children', () => {
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

			it('should move itself and all the children as children to the target when target is a parent', () => {
				const piece = new Piece();
				const child1 = new Piece();
				const child2 = new Piece();
				const target = new Piece();
				const targetChild = new Piece();
				piece.addChild(child1);
				piece.addChild(child2);
				target.addChild(targetChild);
				piece.moveTo(target);
				expect(target.hasChild(child1)).to.be.true;
				expect(target.hasChild(child2)).to.be.true;
				expect(target.hasChild(piece)).to.be.true;
				expect(target.hasChild(targetChild)).to.be.true;
				expect(child1.parent).to.equal(target);
				expect(child2.parent).to.equal(target);
				expect(piece.parent).to.equal(target);
			});

			it('should move itself and all the children as children to the target.parent when target is a child', () => {
				const piece = new Piece();
				const child1 = new Piece();
				const child2 = new Piece();
				const target = new Piece();
				const targetParent = new Piece();
				piece.addChild(child1);
				piece.addChild(child2);
				targetParent.addChild(target);
				piece.moveTo(target);
				expect(targetParent.hasChild(child1)).to.be.true;
				expect(targetParent.hasChild(child2)).to.be.true;
				expect(targetParent.hasChild(piece)).to.be.true;
				expect(child1.parent).to.equal(targetParent);
				expect(child2.parent).to.equal(targetParent);
				expect(piece.parent).to.equal(targetParent);
			});
		});

		describe('and when the piece is a child', () => {
			it('should move itself as a child to the target when target has no parent or children, and move parent as a child plus all children of parent', () => {
				const piece = new Piece();
				const parent = new Piece();
				const child = new Piece();
				parent.addChild(piece);
				parent.addChild(child);
				const target = new Piece();
				piece.moveTo(target);
				expect(target.hasChild(piece)).to.be.true;
				expect(target.hasChild(parent)).to.be.true;
				expect(target.hasChild(child)).to.be.true;
				expect(parent.hasChild(piece)).to.be.false;
				expect(piece.parent).to.equal(target);
				expect(parent.parent).to.equal(target);
				expect(child.parent).to.equal(target);
			});

			it('should move itself as a child to the target when target is a parent, and move parent as a child plus all children of parent', () => {
				const piece = new Piece();
				const parent = new Piece();
				const target = new Piece();
				const targetChild = new Piece();
				const child = new Piece();
				parent.addChild(piece);
				parent.addChild(child);
				target.addChild(targetChild);
				piece.moveTo(target);
				expect(target.hasChild(piece)).to.be.true;
				expect(target.hasChild(parent)).to.be.true;
				expect(target.hasChild(child)).to.be.true;
				expect(parent.hasChild(piece)).to.be.false;
				expect(piece.parent).to.equal(target);
				expect(parent.parent).to.equal(target);
				expect(child.parent).to.equal(target);
			});

			it('should move itself as a child to the target.parent when target is a child, and move parent as a child plus all children of parent', () => {
				const piece = new Piece();
				const parent = new Piece();
				const target = new Piece();
				const targetParent = new Piece();
				const child = new Piece();
				parent.addChild(piece);
				parent.addChild(child);
				targetParent.addChild(target);
				piece.moveTo(target);
				expect(targetParent.hasChild(piece)).to.be.true;
				expect(targetParent.hasChild(parent)).to.be.true;
				expect(targetParent.hasChild(child)).to.be.true;
				expect(parent.hasChild(piece)).to.be.false;
				expect(piece.parent).to.equal(targetParent);
				expect(parent.parent).to.equal(targetParent);
				expect(child.parent).to.equal(targetParent);
			});
		});
	});

	describe('When I move a piece with either parent or children', () => {
		it('should move child if parent is moved', () => {
			const parent = new Piece();
			const child = new Piece();
			parent.addChild(child);
			parent.move({ x: 1, y: 1 });
			expect(child.x).to.equal(1);
			expect(child.y).to.equal(1);
		});
		it('should move parent if child is moved', () => {
			const parent = new Piece();
			const child = new Piece();
			parent.addChild(child);
			child.move({ x: 1, y: 1 });
			expect(parent.x).to.equal(1);
			expect(parent.y).to.equal(1);
		});
		it('should set the position without a move', () => {
			const piece = new Piece();
			piece.setPosition({ x: 1, y: 1 });
			expect(piece.x).to.equal(1);
			expect(piece.y).to.equal(1);
		});
	});
});