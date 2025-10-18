import Input from "./Input.js";
import Keyboard from "../devices/Keyboard/Keyboard.js";
import KeyboardLayout from "../devices/Keyboard/KeyboardLayout/KeyboardLayout.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import {MockVector} from "../../tdd-utilities/tddUtilities.js";

describe('And when I work with the Input class', () => {
	describe('And when I work with the constructor', () => {

		it('should create the class', () => {
			const input = new Input();
			expect(input).to.be.an.instanceof(Input);
			expect(input.device).to.be.null;
		});
	});

	describe('And when I work with the properties', () => {
		let input;
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({id});
		});

		it('should have set the id property', () => {
			expect(input.id).to.equal(id);
		});

		it('should throw error when trying to set the id', () => {
			expect(() => input.id = 'new-id').to.throw();
		});
	});

	describe('And when I work with the methods', () => {
		let input;
		const device = new Keyboard(KeyboardLayout.WASD);
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({ id });
		});

		describe('using the setDevice method', () => {
			it('should throw error if device is no a Device object', () => {
				expect(() => input.setDevice('bad')).to.throw();
			});

			it('should set the device', () => {
				input.setDevice(device);
				expect(input.device).to.equal(device);
			});
		});

		describe('And when all the event methods are called', () => {
			beforeEach(() => {
				cy.spy(GameEvent, 'Emit').as('gameEmit');
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyW'
				});
				document.dispatchEvent(keyEvent);
			});

			it('should issue a changeDirection with the new direction', () => {
				const keyEvent = new KeyboardEvent('keydown', {
					code: 'KeyW'
				});
				document.dispatchEvent(keyEvent);
				cy.get('@gameEmit').should('have.been.called.with', GameEvent.INPUT_CHANGE_DIRECTION, { inputId: id, direction: MockVector.UP });
			});


		});

	});
});
