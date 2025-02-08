import Position2d from "../support/Position2d.js";

export default class Piece {
	#position;
	#children;
	#ordinal;
	#parent;

	constructor( args = {}) {
		this.#position = new Position2d(args.position) || new Position2d({ x: 0, y: 0 });
		this.#ordinal = new Position2d(args.ordinal) || new Position2d({ x: 0, y: 0 });
		this.#children = [];
		this.#parent = null;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get position() {
		return { x: this.x, y: this.y };
	}

	get ordinal() {
		return { x: this.#ordinal.x, y: this.#ordinal.y };
	}

	get children() {
		return this.#children;
	}

	get parent() {
		return this.#parent;
	}

	move(args = {}) {
		if (Position2d.valid(args)) {
			this.#position = new Position2d(args);
		}
	}

	moveRelative(args = {}) {
		if (Position2d.valid(args)) {
			this.move({ x: this.x + args.x, y: this.y + args.y });
		}
	}

	setParent(parent) {
		this.#parent = parent;
	}

	addChild(child) {
		child.setParent(this);
		this.#children.push(child);
	}

	hasChild(piece) {
		return this.children.some((child) => child === piece);
	}

	hasParent() {
		return !!this.parent;
	}

	hasChildren() {
		return this.children.length > 0;
	}

	getChildByOrdinal(ordinal) {
		const foundChild = this.children.filter((child) => child.ordinal.x === ordinal.x && child.ordinal.y === ordinal.y);
		return foundChild[0] || null;
	}

	removeChild(child) {
		if (!this.hasChild(child)) {
			return null;
		}
		this.#children = this.children.filter((piece) => piece !== child);
		child.setParent(null);
		return child;
	}

	moveTo(target) {
		this.#transferChildren(this, target);
		const parent = this.parent;
		if (parent) {
			parent.removeChild(this);
			this.#transferChildren(parent, target);
			this.#transfer(parent, target);
		}
		this.#transfer(this, target);
	}

	#transfer(fromPiece, toPiece) {
		if (toPiece.parent) {
			toPiece.parent.addChild(fromPiece);
		} else {
			toPiece.addChild(fromPiece);
		}
	}

	#transferChildren(fromPiece, toPiece) {
		fromPiece.children.forEach((child) => {
			fromPiece.#transfer(child, toPiece);
		});
		fromPiece.#children = [];
	}
}