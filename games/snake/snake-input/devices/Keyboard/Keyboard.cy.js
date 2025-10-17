import KeyboardLayout from "./KeyboardLayout/KeyboardLayout.js";
import { MockVector, MockInput } from '../../../tdd-utilities/tddUtilities.js'
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

		it('should create a new Keyboard instance with required properties', () => {
			keyboard = new Keyboard({ layout, input });
			expect(keyboard).to.exist;
			expect(keyboard.id).to.be.a('string');
			expect(keyboard.layout).to.equal(layout);
			expect(keyboard.driver).to.equal(Keyboard.DRIVER_BROWSER);
			expect(keyboard.input).to.be.null;
		});

		it('should create a new Keyboard instance with custom id', () => {
			const customId = 'custom-keyboard-id';
			keyboard = new Keyboard({
				layout,
				id: customId
			});
			expect(keyboard.id).to.equal(customId);
		});

		it('should create a new Keyboard instance with explicit NODE driver', () => {
			keyboard = new Keyboard({
				layout,
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

		it('should have read-only input property', () => {
			expect(() => keyboard.input = 'bad').to.throw();
		});
	});

	describe('Methods', () => {
		const layout = KeyboardLayout.WASD;
		const input = new MockInput();
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
				id: 'test-id',
				driver: Keyboard.DRIVER_BROWSER
			});
		});

		describe('using setInput', () => {
			it('should throw an error if input is not an Input object', () => {
				expect(() => keyboard.setInput('bad')).to.throw();
			});

			it('should set the input property', () => {
				keyboard.setInput(input);
				expect(keyboard.input).to.equal(input);
			});

		});
	})

	describe('Events', () => {
		const layout = KeyboardLayout.WASD;
		const input = new MockInput();
		let keyboard;

		beforeEach(() => {
			keyboard = new Keyboard({
				layout,
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
	});
});