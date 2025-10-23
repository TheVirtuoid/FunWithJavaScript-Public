import KeyboardLayout from "./KeyboardLayout/KeyboardLayout.js";
import { MockVector, MockInput } from '../../../tdd-utilities/tddUtilities.js'
import Keyboard from "./Keyboard.js";
import GameEvent from "../../../snake-base/GameEvent/GameEvent.js";

describe('Keyboard', () => {

	describe('Constructor', () => {
		const layout = KeyboardLayout.LAYOUT_WASD;
		const vectorReference = MockVector;
		const input = new MockInput();
		let keyboard;

		afterEach(() => {
			if (keyboard) {
				keyboard.dispose();
			}
		});

		it('should throw error if vectorReference is illegal', () => {
			expect(() => new Keyboard({ layout, input, vectorReference: 'bad' })).to.throw();
		});

		it('should throw error if layout is illegal', () => {
			expect(() => new Keyboard({ input, vectorReference, layout: 'bad' })).to.throw();
		});

		it('should throw error if input is illegal', () => {
			expect(() => new Keyboard({ layout, vectorReference, input: 'bad' })).to.throw();
		});

		it('should create a new Keyboard instance with required properties', () => {
			keyboard = new Keyboard({ layout, input, vectorReference });
			expect(keyboard).to.exist;
			expect(keyboard.id).to.be.a('string');
			expect(keyboard.layout).to.equal(layout);
			expect(keyboard.driver).to.equal(Keyboard.DRIVER_BROWSER);
			expect(keyboard.input).to.equal(input);
		});

		it('should create a new Keyboard instance with custom id', () => {
			const customId = 'custom-keyboard-id';
			keyboard = new Keyboard({
				layout,
				vectorReference,
				input,
				id: customId
			});
			expect(keyboard.id).to.equal(customId);
		});

		it('should create a new Keyboard instance with explicit NODE driver', () => {
			keyboard = new Keyboard({
				layout,
				vectorReference,
				input,
				driver: Keyboard.DRIVER_NODE
			});
			expect(keyboard.driver).to.equal(Keyboard.DRIVER_NODE);
		});
	});

	describe('Properties', () => {
		const layout = KeyboardLayout.LAYOUT_WASD;
		const vectorReference = MockVector;
		const input = new MockInput();
		const driver = Keyboard.DRIVER_BROWSER;
		const id = 'test-id';
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
				vectorReference,
				input,
				id,
				driver
			});
		});

		afterEach(() => {
			if (keyboard) {
				keyboard.dispose();
			}
		})

		it('should have read-only id property', () => {
			expect(() => keyboard.id = 'bad').to.throw();
		});

		it('should have read-only layout property', () => {
			expect(() => keyboard.layout = KeyboardLayout.ARROW).to.throw();
		});

		it('should have read-only driver property', () => {
			expect(() => keyboard.driver = Keyboard.DRIVER_NODE).to.throw();
		});

		it('should have read-only input property', () => {
			expect(() => keyboard.input = 'bad').to.throw();
		});
	});

	describe('Methods', () => {
		it('should not send event if dispose() is called', () => {
			const layout = KeyboardLayout.LAYOUT_WASD;
			const vectorReference = MockVector;
			const input = new MockInput();
			const driver = Keyboard.DRIVER_BROWSER;
			const id = 'test-id';
			const keyboard = new Keyboard({
				layout,
				vectorReference,
				input,
				id,
				driver
			});
			keyboard.dispose();
			const eventSpy = cy.spy(input, 'onInput').as('onInputSpy');
			const keyEvent = new KeyboardEvent('keydown', {
				code: 'KeyW'
			});
			document.dispatchEvent(keyEvent);
			cy.get('@onInputSpy').should('not.have.been.called');
		});
	})

	describe('Events', () => {
		const layout = KeyboardLayout.LAYOUT_WASD;
		const vectorReference = MockVector;
		const input = new MockInput();
		const driver = Keyboard.DRIVER_BROWSER;
		const id = 'test-id';
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
				vectorReference,
				input,
				id,
				driver
			});
		});

		afterEach(() => {
			if (keyboard) {
				keyboard.dispose();
			}
		})

		it('should call "onInput" event when valid key is pressed', () => {
			const eventSpy = cy.spy(input, 'onInput').as('onInputSpy');
			const keyEvent = new KeyboardEvent('keydown', {
				code: 'KeyW'
			});
			document.dispatchEvent(keyEvent);
			cy.get('@onInputSpy').should('have.been.calledWith', { action: GameEvent.DEVICE_CHANGE_DIRECTION, direction: MockVector.Up()});
		});

		it('should NOT call "onInput" event when invalid key is pressed', () => {
			const eventSpy = cy.spy(input, 'onInput').as('onInputSpy');
			const keyEvent = new KeyboardEvent('keydown', {
				code: 'KeyQ'
			});
			document.dispatchEvent(keyEvent);
			cy.get('@onInputSpy').should('not.have.been.called');
		});
	});
});