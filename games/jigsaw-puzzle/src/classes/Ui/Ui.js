import GameStatus from "../Game/GameStatus.js";
import RenderStatus from "./RenderStatus.js";
import Game from "../Game/Game.js";
import ImageDb from "../databases/ImageDb/ImageDb.js";
import NewGame from "./NewGame.js";
import NumPiecesDb from "../databases/NumPiecesDb/NumPiecesDb.js";
import CutDb from "../databases/CutDb/CutDb.js";
import Square from "../cuts/Square.js";
import Position2d from "../support/Position2d.js";

export default class Ui {

	#buttonNew;
	#buttonStart;
	#buttonPause;
	#buttonContinue;
	#buttonExit;
	#buttonCancel;

	#blankScreen;
	#puzzleInformation;
	#puzzle;
	#puzzleWrapper;
	#puzzleInformationName;
	#puzzleInformationCut;
	#puzzleInformationNumPieces;

	#game;

	/* classes */
	#newGame;

	/* database */
	#imageDb;
	#cutDb;
	#numPiecesDb;

	/* doms */
	#main;

	constructor(game) {
		this.#game = game;
		this.#newGame = new NewGame('new-game-dialog', this);
		this.#imageDb = new ImageDb();
		this.#cutDb = new CutDb();
		this.#numPiecesDb = new NumPiecesDb();
	}

	initialize() {
		this.#buttonNew = document.getElementById('button-new');
		this.#buttonStart = document.getElementById('button-start');
		this.#buttonPause = document.getElementById('button-pause');
		this.#buttonContinue = document.getElementById('button-continue');
		this.#buttonExit = document.getElementById('button-exit');
		this.#buttonCancel = document.getElementById('button-cancel');

		this.#buttonNew.addEventListener('click', this.#onNew.bind(this));
		this.#buttonStart.addEventListener('click', this.#onStart.bind(this));
		this.#buttonPause.addEventListener('click', this.#onPause.bind(this));
		this.#buttonContinue.addEventListener('click', this.#onContinue.bind(this));
		this.#buttonExit.addEventListener('click', this.#onExit.bind(this));
		this.#buttonCancel.addEventListener('click', this.#onCancel.bind(this));

		this.#blankScreen = document.getElementById('blank-screen');
		this.#puzzleInformation = document.getElementById('puzzle-information');
		this.#puzzle = document.getElementById('puzzle');
		this.#puzzleWrapper = document.getElementById('puzzle-wrapper');

		this.#main = document.querySelector('main');

		this.#puzzleInformationName = this.#puzzleInformation.querySelector('span.puzzle-name');
		this.#puzzleInformationCut = this.#puzzleInformation.querySelector('span.puzzle-cut');
		this.#puzzleInformationNumPieces = this.#puzzleInformation.querySelector('span.puzzle-num-pieces');
	}

	render(renderState) {
		switch(renderState) {
			case GameStatus.BEGIN:
				this.beginGame();
				return { code: RenderStatus.BEGIN };
		}
	}

	dispatchEvent(event) {
		this.#game.dispatchEvent(event);
	}

	#onExit(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_EXIT, event});
	}

	#onNew(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_NEW, event });
	}

	#onStart(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_START, event });
	}

	#onPause(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_PAUSE, event });
	}

	#onContinue(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_CONTINUE, event });
	}

	#onCancel(event) {
		this.#game.dispatchEvent({ code: GameStatus.EVENT_CANCEL, event });
	}

	beginGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = true;

		this.#blankScreen.classList.remove('hidden');
		this.#puzzleInformation.classList.add('hidden');
		this.#puzzleWrapper.classList.add('hidden');
	}

	newGame(imageList, cutList, numPiecesList) {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;

		this.#blankScreen.classList.add('hidden');
		this.#newGame.show(imageList, cutList, numPiecesList);
	}

	readyGame(table) {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = false;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;

		const readyPromises = [];
		readyPromises.push(this.#imageDb.getImage(table.image.id));
		readyPromises.push(this.#cutDb.getImage(table.cut.id));
		Promise.all(readyPromises).then((returnedImages) => {
			const [ imageElement, cutElement ] = returnedImages;
			const { image: imageData, cut: cutData, numPieces: numPiecesData } = table;

			const square = new Square({ width: table.pieceWidth, height: table.pieceHeight, image: imageElement });

			table.cutPuzzle();
			for(let row = 0; row < table.rows; row++ ) {
				for(let column = 0; column < table.columns; column++) {
					const piece = table.getPieceByOrdinal({ x: column, y: row });
					const pieceElement = square.cut(new Position2d({ x: column, y: row }));
					piece.setDom(pieceElement);
				}
			}
			table.shufflePuzzle();
			console.log(table);
			this.#puzzle.replaceChildren();
			for(let row = 0; row < table.rows; row++ ) {
				for(let column = 0; column < table.columns; column++) {
					const piece = table.getPieceByOrdinal({ x: column, y: row });
					piece.dom.style.left = `${piece.x}px`;
					piece.dom.style.top = `${piece.y}px`;
					this.#puzzle.appendChild(piece.dom);
				}
			}
			this.#puzzleInformationName.textContent = imageData.name;
			this.#puzzleInformationCut.textContent = cutData.name;
			this.#puzzleInformationNumPieces.textContent = `${table.numberOfPieces}`;
			this.#blankScreen.classList.add('hidden');
			this.#puzzleInformation.classList.remove('hidden');
			this.#main.style.width = `calc(${table.puzzleWidth}px + 1rem)`;
			this.#main.style.height = `calc(${table.puzzleHeight}px + 1rem)`;
			this.#puzzleWrapper.classList.remove('hidden');
		});
	}

	startGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = false;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
	}

	pauseGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = false;
	}

	continueGame() {
		this.startGame();
	}

	cancelGame() {
		this.beginGame();
	}

	exitGame() {
		this.#buttonNew.disabled = true;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = true;
		this.#buttonExit.disabled = true;
		this.#buttonCancel.disabled = true;
	}

	finishGame() {
		this.#buttonNew.disabled = false;
		this.#buttonStart.disabled = true;
		this.#buttonPause.disabled = true;
		this.#buttonContinue.disabled = false;
		this.#buttonExit.disabled = false;
		this.#buttonCancel.disabled = true;
	}


}