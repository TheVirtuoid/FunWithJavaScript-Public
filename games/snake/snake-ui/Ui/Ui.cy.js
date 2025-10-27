import GameEvent from '../../snake-base/GameEvent/GameEvent.js';
import Ui from './Ui.js';
import { MockGame, MockVector } from '../../tdd-utilities/tddUtilities.js';
import Pitch from '../../snake-base/Pitch/Pitch.js';
import Snake from '../../snake-base/Snake/Snake.js';
import Prize from '../../snake-base/Prize/Prize.js';
import Score from "../../snake-base/Score/Score.js";

describe('Ui - Constructor', () => {
	it('should create instance with all required options', () => {
		const options = {
			id: 'test-ui-123',
			uiName: 'mock',
			uiData: { width: 800, height: 600 }
		};

		const ui = new Ui(options);

		expect(ui.id).to.equal('test-ui-123');
		expect(ui.uiName).to.equal('mock');
		expect(ui.uiData).to.deep.equal({ width: 800, height: 600 });
	});

	it('should create instance with only required options and use defaults', () => {
		const options = {
			uiName: 'mock'
		};

		const ui = new Ui(options);

		expect(ui.id).to.be.a('string');
		expect(ui.id.length).to.be.greaterThan(0);
		expect(ui.uiName).to.equal('mock');
		expect(ui.uiData).to.deep.equal({});
	});

	it('should throw error when uiName is not provided', () => {
		expect(() => new Ui({})).to.throw();
	});
});

describe('Ui - Properties', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({
			id: 'test-ui',
			uiName: 'mock',
			uiData: { theme: 'dark' }
		});
	});

	it('should have read-only id property', () => {
		expect(() => {
			ui.id = 'new-id';
		}).to.throw();
	});

	it('should have read-only uiName property', () => {
		expect(() => {
			ui.uiName = 'canvas';
		}).to.throw();
	});

	it('should have read-only uiData property', () => {
		expect(() => {
			ui.uiData = { theme: 'light' };
		}).to.throw();
	});
});

describe('Ui - drawPitch()', () => {
	let ui;
	let pitch;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		pitch = new Pitch({ dimensions: new MockVector(20, 20) });
	});

	it('should validate that argument is an instance of Pitch', () => {
		expect(() => ui.drawPitch('bad')).to.throw();
	});

	it('should emit UI_DRAW_PITCH_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.drawPitch(pitch);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_DRAW_PITCH_COMPLETE);
	});
});

describe('Ui - resetPitch()', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
	});

	it('should emit UI_RESET_PITCH_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.resetPitch();
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_RESET_PITCH_COMPLETE);
	});
});

describe('Ui - clearPitch()', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
	});

	it('should emit UI_CLEAR_PITCH_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.clearPitch();
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_CLEAR_PITCH_COMPLETE);
	});
});

describe('Ui - drawSnake()', () => {
	let ui;
	let snake;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		snake = new Snake({ position: MockVector.Zero(), direction: MockVector.Up() });
	});

	it('should validate that argument is an instance of Snake', () => {
		expect(() => ui.drawSnake('bad')).to.throw();
	});

	it('should emit UI_DRAW_SNAKE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.drawSnake(snake);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_DRAW_SNAKE_COMPLETE);
	});
});

describe('Ui - updateSnake()', () => {
	let ui;
	let snake;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		snake = new Snake({ position: MockVector.Zero(), direction: MockVector.Up() });
	});

	it('should validate that argument is an instance of Snake', () => {
		expect(() => ui.updateSnake('bad')).to.throw();
	});

	it('should emit UI_UPDATE_SNAKE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.updateSnake(snake);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_UPDATE_SNAKE_COMPLETE);
	});
});

describe('Ui - clearSnake()', () => {
	let ui;
	let snake;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		snake = new Snake({ position: MockVector.Zero(), direction: MockVector.Up() });
	});

	it('should validate that argument is an instance of Snake', () => {
		expect(() => ui.clearSnake('bad')).to.throw();
	});

	it('should emit UI_CLEAR_SNAKE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.clearSnake(snake);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_CLEAR_SNAKE_COMPLETE);
	});
});

describe('Ui - drawPrize()', () => {
	let ui;
	let prize;
	const pitch = new Pitch({ dimensions: new MockVector(10, 10) });
	const snake = new Snake({ position: new MockVector(5,5), direction: MockVector.Up(), length: 3 });

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		prize = new Prize({ pitch, snake });	});

	it('should validate that argument is an instance of Prize', () => {
		expect(() => ui.drawPrize('bad')).to.throw();
	});

	it('should emit UI_DRAW_PRIZE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.drawPrize(prize);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_DRAW_PRIZE_COMPLETE);
	});
});

describe('Ui - clearPrize()', () => {
	let ui;
	let prize;
	const pitch = new Pitch({ dimensions: new MockVector(10, 10) });
	const snake = new Snake({ position: new MockVector(5,5), direction: MockVector.Up(), length: 3 });


	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		prize = new Prize({ pitch, snake });	});

	it('should validate that argument is an instance of Prize', () => {
		expect(() => ui.clearPrize('bad')).to.throw();
	});

	it('should emit UI_CLEAR_PRIZE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.clearPrize(prize);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_CLEAR_PRIZE_COMPLETE);
	});
});

describe('Ui - drawScore()', () => {
	let ui;
	let score;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		score = new Score();
	});

	it('should validate that argument is an instance of Score', () => {
		expect(() => ui.drawScore('bad')).to.throw();
	});

	it('should emit UI_DRAW_SCORE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.drawScore(score);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_DRAW_SCORE_COMPLETE);
	});
});

describe('Ui - updateScore()', () => {
	let ui;
	let score;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		score = new Score();
	});

	it('should validate that argument is an instance of Score', () => {
		expect(() => ui.updateScore('bad')).to.throw();
	});

	it('should emit UI_UPDATE_SCORE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.updateScore(score);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_UPDATE_SCORE_COMPLETE);
	});
});

describe('Ui - clearScore()', () => {
	let ui;
	let score;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
		score = new Score();
	});

	it('should validate that argument is an instance of Score', () => {
		expect(() => ui.clearScore('bad')).to.throw();
	});

	it('should emit UI_CLEAR_SCORE_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.clearScore(score);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_CLEAR_SCORE_COMPLETE);
	});
});

describe('Ui - drawGameOver()', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
	});

	it('should emit UI_DRAW_GAME_OVER_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.drawGameOver();
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_DRAW_GAME_OVER_COMPLETE);
	});
});

describe('Ui - clearGameOver()', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
	});

	it('should emit UI_CLEAR_GAME_OVER_COMPLETE event when complete', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.clearGameOver();
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_CLEAR_GAME_OVER_COMPLETE);
	});
});

describe('Ui - startCountdown()', () => {
	let ui;

	beforeEach(() => {
		ui = new Ui({ uiName: 'mock' });
	});

	it('should use default countdown time of 5 when not provided', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown();
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_START_COUNTDOWN_COMPLETE);
	});

	it('should accept custom countdown time', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown(3);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_START_COUNTDOWN_COMPLETE);
	});

	it('should emit UI_START_COUNTDOWN_COMPLETE event when countdown starts', () => {
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown(3);
		cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_START_COUNTDOWN_COMPLETE);
	});

	it('should emit UI_COUNTDOWN_TICK_COMPLETE event for each tick', () => {
		const countdownTime = 2;
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown(countdownTime);

		cy.wait((countdownTime * 1000) + 500).then(() => {
			cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_COUNTDOWN_TICK_COMPLETE);
			cy.get('@gameEmit').its('callCount').should('be.gte', countdownTime + 2); // START + TICKs + COMPLETE
		});
	});

	it('should emit UI_COUNTDOWN_COMPLETE event when countdown finishes', () => {
		const countdownTime = 2;
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown(countdownTime);

		cy.wait((countdownTime * 1000) + 500).then(() => {
			cy.get('@gameEmit').should('have.been.called.with', GameEvent.UI_COUNTDOWN_COMPLETE);
		});
	});

	it('should emit events in correct order: START -> TICK(s) -> COMPLETE', () => {
		const countdownTime = 2;
		cy.spy(GameEvent, 'Emit').as('gameEmit');
		ui.startCountdown(countdownTime);

		cy.wait((countdownTime * 1000) + 500).then(() => {
			cy.get('@gameEmit').should((spy) => {
				const calls = spy.getCalls();
				const events = calls.map(call => call.args[0]);

				expect(events[0]).to.equal(GameEvent.UI_START_COUNTDOWN_COMPLETE);
				expect(events[events.length - 1]).to.equal(GameEvent.UI_COUNTDOWN_COMPLETE);

				const tickEvents = events.filter(e => e === GameEvent.UI_COUNTDOWN_TICK_COMPLETE);
				expect(tickEvents.length).to.equal(countdownTime);
			});
		});
	});
});