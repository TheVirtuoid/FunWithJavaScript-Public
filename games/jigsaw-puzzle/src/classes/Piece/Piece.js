import Position2d from "../support/Position2d.js";
import InGameEvent from "../Game/InGameEvent.js";

let zIndex = 10;

export default class Piece {
	#position;
	#children;
	#ordinal;
	#parent;
	#dom;
	#id;

	#table;
	#checking;

	#active = null;

	constructor( args = {}) {
		const { position, ordinal, table = null } = args;
		this.#position = new Position2d(position) || new Position2d({ x: 0, y: 0 });
		this.#ordinal = new Position2d(ordinal) || new Position2d({ x: 0, y: 0 });
		this.#children = [];
		this.#parent = null;
		this.#dom = null;
		this.#table = table;
		this.#id = window?.crypto?.randomUUID() || `FWJS${Math.random().toString().substring(2)}`;
	}

	get x() {
		return this.#position.x;
	}

	get y() {
		return this.#position.y;
	}

	get id() {
		return this.#id;
	}

	get position() {
		return { x: this.x, y: this.y };
	}

	get ordinal() {
		return { x: this.#ordinal.x, y: this.#ordinal.y };
	}

	get checkingPoint() {
		return { x: this.#checking.x, y: this.#checking.y, width: this.#checking.width, height: this.#checking.height };
	}

	get children() {
		return this.#children;
	}

	get parent() {
		return this.#parent;
	}

	get dom() {
		return this.#dom;
	}

	move(args = {}) {
		if (Position2d.valid(args)) {
			const pieces= this.getFamily();
			const position = this.#getRelativePosition(new Position2d(args));
			for (const piece of pieces) {
				piece.setPosition(new Position2d({ x: piece.x + position.x, y: piece.y + position.y }));
				if (piece.#dom) {
					piece.#dom.style.left = `${piece.x}px`;
					piece.#dom.style.top = `${piece.y}px`;
				}
			}
		}
	}

	moveRelative(args = {}) {
		if (Position2d.valid(args)) {
			this.move({ x: this.x + args.x, y: this.y + args.y });
		}
	}

	setPosition(position) {
		const { x, y } = this.#position;
		if (this.#checking) {
			const checkingPoint = new Position2d({ x: position.x - x, y: position.y - y });
			this.#checking = {
				x: this.#checking.x + checkingPoint.x,
				y: this.#checking.y + checkingPoint.y,
				width: this.#checking.width,
				height: this.#checking.height
			};
		}
		this.#position = position;
	}

	setParent(parent) {
		this.#parent = parent;
	}

	setDom(dom) {
		this.#dom = dom;
		this.#dom.dataset.id = this.#id;
	}

	setCheckingPoint(checkingPoint) {
		this.#checking = checkingPoint;
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

	getFamily() {
		const pieces = [this];
		if (this.hasChildren()) {
			this.children.forEach((child) => {
				pieces.push(child);
			});
		} else if (this.hasParent()) {
			const parent = this.parent;
			pieces.push(parent);
			parent.children.forEach((child) => {
				if (child !== this) {
					pieces.push(child);
				}
			});
		}
		return pieces;
	}

	#getRelativePosition(position) {
		return new Position2d({ x: position.x - this.x, y: position.y - this.y });
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