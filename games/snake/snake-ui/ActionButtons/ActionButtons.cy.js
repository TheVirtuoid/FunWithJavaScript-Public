// ActionButtons.cy.js
import ActionButtons from './ActionButtons';
import ActionButton from "../ActionButton/ActionButton.js"; // adjust path as needed

describe('ActionButtons', () => {
	let actionButtons;

	beforeEach(() => {
		actionButtons = new ActionButtons();
	});

	context('constructor & id', () => {
		it('generates an id by default', () => {
			expect(actionButtons.id).to.be.a('string');
			expect(actionButtons.id).to.not.be.empty;
		});

		it('uses the provided id when passed', () => {
			const customId = 'custom-id-123';
			const withId = new ActionButtons({ id: customId });

			expect(withId.id).to.equal(customId);
		});

		it('treats id as read-only', () => {
			expect(() => {
				actionButtons.id = 'new-id';
			}).to.throw();
		});
	});

	context('addButton(button)', () => {
		it('adds a button instance to the list', () => {
			const button = new ActionButton({ id: 'btn-1', action: () => {}, label: 'One' });

			actionButtons.addButton(button);

			const buttons = actionButtons.getButtons(); // accessor for inspection
			expect(buttons).to.be.an('array');
			expect(buttons).to.have.length(1);
			expect(buttons[0]).to.equal(button);
		});

		it('can add multiple distinct buttons', () => {
			const button1 = new ActionButton({ id: 'btn-1', label: 'One', action: () => {} });
			const button2 = new ActionButton({ id: 'btn-2', label: 'Two', action: () => {} });

			actionButtons.addButton(button1);
			actionButtons.addButton(button2);

			const buttons = actionButtons.getButtons();
			expect(buttons).to.have.length(2);
			expect(buttons).to.deep.equal([button1, button2]);
		});
	});

	context('removeButton(button)', () => {
		it('removes an existing button instance from the list', () => {
			const button1 = new ActionButton({ id: 'btn-1', label: 'One', action: () => {} });
			const button2 = new ActionButton({ id: 'btn-2', label: 'Two', action: () => {} });

			actionButtons.addButton(button1);
			actionButtons.addButton(button2);

			actionButtons.removeButton(button1);

			const buttons = actionButtons.getButtons();
			expect(buttons).to.have.length(1);
			expect(buttons[0]).to.equal(button2);
		});

		it('is a no-op when the given button is not in the list', () => {
			const button1 = new ActionButton({ id: 'btn-1', label: 'One', action: () => {} });
			const button2 = new ActionButton({ id: 'btn-2', label: 'Two', action: () => {} });
			const notInList = new ActionButton({ id: 'btn-3', label: 'Three', action: () => {} });

			actionButtons.addButton(button1);
			actionButtons.addButton(button2);

			expect(() => {
				actionButtons.removeButton(notInList);
			}).not.to.throw();

			const buttons = actionButtons.getButtons();
			expect(buttons).to.have.length(2);
			expect(buttons).to.deep.equal([button1, button2]);
		});
	});

	context('buttons collection immutability', () => {
		it('does not allow replacing the internal buttons collection directly (if exposed as a property)', () => {
			// This test assumes an exposed property `buttons` is read-only.
			if (Object.prototype.hasOwnProperty.call(actionButtons, 'buttons')) {
				expect(() => {
					actionButtons.buttons = [];
				}).to.throw();
			}
		});

		it('modifying the array returned by getButtons() does not affect the internal state (if a copy is returned)', () => {
			const button = new ActionButton({ id: 'btn-1', label: 'One', action: () => {} });
			actionButtons.addButton(button);

			const buttons = actionButtons.getButtons();
			buttons.length = 0; // attempt to clear the external array

			const after = actionButtons.getButtons();
			expect(after).to.have.length(1);
			expect(after[0]).to.equal(button);
		});
	});
});