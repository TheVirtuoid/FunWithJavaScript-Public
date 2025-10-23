import Input from "./Input.js";
import Keyboard from "../devices/Keyboard/Keyboard.js";
import KeyboardLayout from "../devices/Keyboard/KeyboardLayout/KeyboardLayout.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import {MockVector} from "../../tdd-utilities/tddUtilities.js";
import Device from "../devices/Device/Device.js";

describe('And when I work with the Input class', () => {
	const deviceReference = Keyboard;
	const vectorReference = MockVector;
	const deviceData = { layout: KeyboardLayout.LAYOUT_WASD };

	describe('And when I work with the constructor', () => {

		it ('should throw error if vectorReference is invalid', () => {
			expect(() => new Input({ deviceReference, vectorReference: 'bad', deviceData })).to.throw();
		});

		it ('should throw error if deviceReference is not passed', () => {
			expect(() => new Input({ deviceReference: 'bad', vectorReference, deviceData })).to.throw();
		});

		it('should create the class', () => {
			const input = new Input({ deviceReference, vectorReference, deviceData });
			expect(input).to.be.an.instanceof(Input);
			input.dispose();
		});
	});

	describe('And when I work with the properties', () => {
		let input;
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({ id, deviceReference, vectorReference, deviceData });
		});

		afterEach(() => {
			input.dispose();
		})

		it('should have set the id property', () => {
			expect(input.id).to.equal(id);
		});

		it('should throw error when trying to set the id', () => {
			expect(() => input.id = 'new-id').to.throw();
		});
	});


	describe('And when I work with the methods', () => {
		let input;
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({ id, deviceReference, vectorReference, deviceData });
		});

		describe('working with dispose()', () => {
			it('should not send a keystroke after calling dispose()', () => {
				input.dispose();
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyW'
				});
				document.dispatchEvent(keyEvent);

			});
		});

		describe('And when all the event methods are called', () => {
			afterEach(() => {
				if (input) {
					input.dispose();
				}
			});

			it('should issue a changeDirection with the new direction', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyW'
				});
				document.dispatchEvent(keyEvent);
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.INPUT_CHANGE_DIRECTION, { inputId: id, direction: MockVector.UP });
			});

			it('should issue a Game Paused', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyP'
				});
				document.dispatchEvent(keyEvent);
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.INPUT_GAME_PAUSE, { inputId: id });
			});

			it('should issue a Game Exit', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'Escape'
				});
				document.dispatchEvent(keyEvent);
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.INPUT_GAME_EXIT, { inputId: id });
			});

			it('should issue a Game Resume', () => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyR'
				});
				document.dispatchEvent(keyEvent);
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.INPUT_GAME_RESUME, { inputId: id });
			});

		});
	});
});
