import ActionButtons from './ActionButtons'; // adjust as needed

describe('ActionButtons', () => {
	let buttons;

	beforeEach(() => {
		buttons = new ActionButtons();
	});

	context('constructor & id', () => {
		it('generates an id by default', () => {
			expect(buttons.id).to.be.a('string');
			expect(buttons.id).to.not.be.empty;
		});

		it('uses the provided id when passed', () => {
			const customId = 'test-id';
			const withId = new ActionButtons({ id: customId });

			expect(withId.id).to.equal(customId);
		});

		it('treats id as read-only', () => {
			expect(() => { buttons.id = 'new-id'; }).to.throw();
		});
	});

	context('addButton', () => {
		it('adds a button with required fields and default flags', () => {
			const TYPE = Symbol('TRY_AGAIN');
			const action = cy.stub().as('tryAgainAction');

			buttons.addButton({
				type: TYPE,
				label: 'Try Again',
				action,
			});

			const btn = buttons.getButton(TYPE); // or whatever accessor you provide

			expect(btn.type).to.equal(TYPE);
			expect(btn.label).to.equal('Try Again');
			expect(btn.action).to.equal(action);
			expect(btn.disabled).to.be.false;
			expect(btn.hidden).to.be.false;
		});

		it('defaults classList to an empty array', () => {
			const TYPE = Symbol('NO_CLASSES');
			const action = cy.stub().as('noClassAction');

			buttons.addButton({
				type: TYPE,
				label: 'No Classes',
				action,
			});

			const btn = buttons.getButton(TYPE);

			expect(btn.classList).to.be.an('array');
			expect(btn.classList).to.have.length(0);
		});

		it('honors an explicit classList array', () => {
			const TYPE = Symbol('WITH_CLASSES');
			const action = cy.stub().as('withClassAction');
			const classes = ['primary', 'large'];

			buttons.addButton({
				type: TYPE,
				label: 'With Classes',
				action,
				classList: classes,
			});

			const btn = buttons.getButton(TYPE);

			expect(btn.classList).to.deep.equal(classes);
		});

		it('honors explicit disabled and hidden flags', () => {
			const TYPE = Symbol('GO_BACK');
			const action = cy.stub().as('goBackAction');

			buttons.addButton({
				type: TYPE,
				label: 'Go Back',
				action,
				disabled: true,
				hidden: true,
			});

			const btn = buttons.getButton(TYPE);

			expect(btn.disabled).to.be.true;
			expect(btn.hidden).to.be.true;
		});
	});

	context('removeButton', () => {
		it('removes an existing button', () => {
			const A = Symbol('A');
			const B = Symbol('B');

			buttons.addButton({ type: A, label: 'A', action: () => {} });
			buttons.addButton({ type: B, label: 'B', action: () => {} });

			buttons.removeButton(A);

			expect(buttons.getButton(A)).to.be.undefined;
			expect(buttons.getButton(B)).to.exist;
		});

		it('is a no-op when type is not found', () => {
			const A = Symbol('A');

			buttons.addButton({ type: A, label: 'A', action: () => {} });

			expect(() => {
				buttons.removeButton(Symbol('NON_EXISTENT'));
			}).not.to.throw();

			expect(buttons.getButton(A)).to.exist;
		});
	});

	context('setButtonAction', () => {
		it('updates the action for an existing button', () => {
			const A = Symbol('A');
			const original = cy.stub().as('originalAction');
			const updated = cy.stub().as('updatedAction');

			buttons.addButton({ type: A, label: 'A', action: original });

			buttons.setButtonAction(A, updated);

			const btn = buttons.getButton(A);
			expect(btn.action).to.equal(updated);
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			const original = cy.stub().as('originalAction');

			buttons.addButton({ type: A, label: 'A', action: original });

			buttons.setButtonAction(Symbol('NON_EXISTENT'), cy.stub().as('otherAction'));

			const btn = buttons.getButton(A);
			expect(btn.action).to.equal(original);
		});
	});

	context('setDisabled', () => {
		it('sets disabled to true for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setDisabled(A, true);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.true;
		});

		it('sets disabled to false for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, disabled: true });

			buttons.setDisabled(A, false);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.false;
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, disabled: false });

			buttons.setDisabled(Symbol('NON_EXISTENT'), true);

			const btn = buttons.getButton(A);
			expect(btn.disabled).to.be.false;
		});
	});

	context('setHidden', () => {
		it('sets hidden to true for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setHidden(A, true);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.true;
		});

		it('sets hidden to false for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, hidden: true });

			buttons.setHidden(A, false);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.false;
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {}, hidden: false });

			buttons.setHidden(Symbol('NON_EXISTENT'), true);

			const btn = buttons.getButton(A);
			expect(btn.hidden).to.be.false;
		});
	});

	context('setTitle', () => {
		it('sets the title for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setTitle(A, 'Click me');

			const btn = buttons.getButton(A);
			expect(btn.title).to.equal('Click me');
		});

		it('overwrites an existing title', () => {
			const A = Symbol('A');
			buttons.addButton({
				type: A,
				label: 'A',
				action: () => {},
			});

			buttons.setTitle(A, 'First title');
			buttons.setTitle(A, 'Second title');

			const btn = buttons.getButton(A);
			expect(btn.title).to.equal('Second title');
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({ type: A, label: 'A', action: () => {} });

			buttons.setTitle(Symbol('NON_EXISTENT'), 'Should not be used');

			const btn = buttons.getButton(A);
			expect(btn.title).to.be.undefined;
		});
	});

	context('setClassList', () => {
		it('sets classList for an existing button', () => {
			const A = Symbol('A');
			buttons.addButton({
				type: A,
				label: 'A',
				action: () => {},
			});

			const newClasses = ['primary', 'rounded'];

			buttons.setClassList(A, newClasses);

			const btn = buttons.getButton(A);
			expect(btn.classList).to.deep.equal(newClasses);
		});

		it('replaces existing classList with a new array', () => {
			const A = Symbol('A');
			buttons.addButton({
				type: A,
				label: 'A',
				action: () => {},
				classList: ['small'],
			});

			const replacement = ['large', 'secondary'];

			buttons.setClassList(A, replacement);

			const btn = buttons.getButton(A);
			expect(btn.classList).to.deep.equal(replacement);
		});

		it('allows setting classList to an empty array', () => {
			const A = Symbol('A');
			buttons.addButton({
				type: A,
				label: 'A',
				action: () => {},
				classList: ['to-be-cleared'],
			});

			buttons.setClassList(A, []);

			const btn = buttons.getButton(A);
			expect(btn.classList).to.be.an('array');
			expect(btn.classList).to.have.length(0);
		});

		it('does nothing when type is not found', () => {
			const A = Symbol('A');
			buttons.addButton({
				type: A,
				label: 'A',
				action: () => {},
				classList: ['original'],
			});

			buttons.setClassList(Symbol('NON_EXISTENT'), ['should-not-apply']);

			const btn = buttons.getButton(A);
			expect(btn.classList).to.deep.equal(['original']);
		});
	});
});