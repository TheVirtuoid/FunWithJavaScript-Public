import Input from "./Input.js";
import Keyboard from "../devices/Keyboard/Keyboard.js";
import KeyboardLayout from "../devices/Keyboard/KeyboardLayout/KeyboardLayout.js";
import GameEvent from "../../snake-base/GameEvent/GameEvent.js";
import {MockVector} from "../../tdd-utilities/tddUtilities.js";

describe('And when I work with the Input class', () => {
	describe('And when I work with the constructor', () => {
		it('should throw an error if no driver is passed', () => {
			expect(() => new Input()).to.throw('You must pass a driver to the constructor.');
		})

		it('should create the class', () => {
			const driver = new Keyboard(KeyboardLayout.WASD);
			const input = new Input({ driver });
			expect(input).to.be.an.instanceof(Input);
		});
	});

	describe('And when I work with the properties', () => {
		let input;
		const driver = new Keyboard(KeyboardLayout.WASD);
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({driver, id});
		});

		it('should have set the driver property', () => {
			expect(input.driver).to.be.an.instanceof(Keyboard);
		});

		it('should have set the id property', () => {
			expect(input.id).to.equal(id);
		});

		it('should throw error when trying to set the driver', () => {
			expect(() => input.driver = new Keyboard(KeyboardLayout.WASD)).to.throw();
		});

		it('should throw error when trying to set the id', () => {
			expect(() => input.id = 'new-id').to.throw();
		});
	});

	describe('And when I work with the methods', () => {
		let input;
		const driver = new Keyboard(KeyboardLayout.WASD);
		const id = 'test-input';

		beforeEach(() => {
			input = new Input({ driver, id });
		});

		describe('And when all the methods are called', () => {
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
