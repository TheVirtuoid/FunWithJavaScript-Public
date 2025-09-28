import KeyboardLayout from "../KeyboardLayout/KeyboardLayout.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import { MockVector, MockInput } from '../../tdd-utilities/tddUtilities.js'
import Keyboard from "./Keyboard.js";

describe('Keyboard', () => {
	KeyboardLayout.Setup(MockVector);

	describe('Constructor', () => {
		const layout = KeyboardLayout.WASD;
		const input = new MockInput();
		let keyboard;

		it('should throw error if layout is not passed', () => {
			expect(() => new Keyboard({ input })).to.throw(`'layout' argument is required and must be a KeyboardLayout.`);
		});

		it('should throw error if input is not passed', () => {
			expect(() => new Keyboard({ layout })).to.throw(`'input' argument is required and must be a Input.`);
		});


		it('should create a new Keyboard instance with required properties', () => {
			keyboard = new Keyboard({ layout, input });
			expect(keyboard).to.exist;
			expect(keyboard.id).to.be.a('string');
			expect(keyboard.layout).to.equal(layout);
			expect(keyboard.driver).to.equal(Keyboard.DRIVER_BROWSER);
		});

		it('should create a new Keyboard instance with custom id', () => {
			const customId = 'custom-keyboard-id';
			keyboard = new Keyboard({
				layout,
				input,
				id: customId
			});
			expect(keyboard.id).to.equal(customId);
		});

		it('should create a new Keyboard instance with explicit NODE driver', () => {
			keyboard = new Keyboard({
				layout,
				input,
				driver: Keyboard.DRIVER_NODE
			});
			expect(keyboard.driver).to.equal(Keyboard.DRIVER_NODE);
		});
	});

	describe('Properties', () => {
		const layout = KeyboardLayout.WASD;
		const input = new MockInput();
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
				input,
				id: 'test-id',
				driver: Keyboard.DRIVER_BROWSER
			});
		});

		it('should have read-only id property', () => {
			expect(() => keyboard.id = 'bad').to.throw();
		});

		it('should have read-only layout property', () => {
			expect(() => keyboard.layout = KeyboardLayout.ARROW).to.throw();
		});

		it('should have read-only driver property', () => {
			expect(() => keyboard.driver = Keyboard.DRIVER_NODE).to.throw();
		});
	});

	describe('Events', () => {
		const layout = KeyboardLayout.WASD;
		const input = new MockInput();
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
				input,
				id: 'test-id',
				driver: Keyboard.DRIVER_BROWSER
			});
		});


		it('should call "onInput" event when valid key is pressed', () => {
			const eventSpy = cy.spy(input, 'onInput').as('onInputSpy');
			const keyEvent = new KeyboardEvent('keydown', {
				code: 'KeyW'
			});
			document.dispatchEvent(keyEvent);
			cy.get('@onInputSpy').should('have.been.calledWith', { action: KeyboardLayout.UP, direction: MockVector.Up()});
		});

		it('should NOT call "onInput" event when invalid key is pressed', () => {
			const eventSpy = cy.spy(input, 'onInput').as('onInputSpy');
			const keyEvent = new KeyboardEvent('keydown', {
				code: 'KeyQ'
			});
			document.dispatchEvent(keyEvent);
			cy.get('@onInputSpy').should('not.have.been.called');
		});

		/*it('should emit INPUT_GAME_PAUSED event when pause key is pressed', () => {
			const eventSpy = cy.spy();

			cy.window().then((win) => {
				win.addEventListener('keydown', eventSpy);

				// Simulate pause key press
				const pauseKeyEvent = new KeyboardEvent('keydown', { key: 'Space' });
				win.dispatchEvent(pauseKeyEvent);

				// This test would need to be adapted based on how events are actually emitted
				// expect(eventSpy).to.have.been.calledWith(GameEvent.INPUT_GAME_PAUSED);
			});
		});

		it('should emit INPUT_GAME_RESUMED event when resume action is triggered', () => {
			const eventSpy = cy.spy();

			cy.window().then((win) => {
				// This test would depend on how resume events are triggered
				// Could be the same key as pause or a different mechanism
			});
		});

		it('should emit INPUT_GAME_EXIT event when exit key is pressed', () => {
			const eventSpy = cy.spy();

			cy.window().then((win) => {
				win.addEventListener('keydown', eventSpy);

				// Simulate exit key press
				const exitKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
				win.dispatchEvent(exitKeyEvent);

				// This test would need to be adapted based on how events are actually emitted
				// expect(eventSpy).to.have.been.calledWith(GameEvent.INPUT_GAME_EXIT);
			});
		});

		it('should pass KeyboardLayout value as event payload', () => {
			// Test that events contain the correct payload from the KeyboardLayout
			cy.window().then((win) => {
				const eventHandler = cy.spy();

				// This would need to be adapted based on the actual event system implementation
				// The test should verify that the event payload contains the KeyboardLayout value
				// corresponding to the pressed key
			});
		});*/
	});

	/*describe('Driver Integration (BROWSER only)', () => {
		beforeEach(() => {
			keyboard = new Keyboard({
				layout: mockKeyboardLayout,
				driver: Keyboard.BROWSER
			});
		});

		it('should respond to browser keyboard events', () => {
			cy.window().then((win) => {
				const keydownHandler = cy.spy();
				win.addEventListener('keydown', keydownHandler);

				// Simulate various key presses
				const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Escape'];
				keys.forEach(key => {
					const keyEvent = new KeyboardEvent('keydown', { key });
					win.dispatchEvent(keyEvent);
				});

				expect(keydownHandler).to.have.been.called;
			});
		});

		it('should handle multiple rapid key presses', () => {
			cy.window().then((win) => {
				const keydownHandler = cy.spy();
				win.addEventListener('keydown', keydownHandler);

				// Simulate rapid key presses
				for (let i = 0; i < 5; i++) {
					const keyEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
					win.dispatchEvent(keyEvent);
				}

				expect(keydownHandler).to.have.callCount(5);
			});
		});

		it('should ignore keys not defined in the keyboard layout', () => {
			cy.window().then((win) => {
				const eventHandler = cy.spy();

				// Simulate pressing a key not in the layout
				const unknownKeyEvent = new KeyboardEvent('keydown', { key: 'KeyA' });
				win.dispatchEvent(unknownKeyEvent);

				// The keyboard should ignore this key
				// This test would need to verify that no game events are emitted
			});
		});
	});*/
});