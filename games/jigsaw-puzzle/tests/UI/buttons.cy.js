describe('When the web page is first loaded', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4173');
	});

	it('should correctly render the buttons upon initialization', () => {
		cy.get('[data-testid="button-new"]').should('not.be.disabled');
		cy.get('[data-testid="button-start"]').should('be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('be.disabled');
		cy.get('[data-testid="button-cancel"]').should('be.disabled');
		cy.get('[data-testid="button-exit"]').should('not.be.disabled');
	});

	it('should correctly render the buttons once New Game is clicked', () => {
		cy.get('[data-testid="button-new"]').click();
		cy.get('[data-testid="button-new"]').should('be.disabled');
		cy.get('[data-testid="button-start"]').should('be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('not.be.disabled');
		cy.get('[data-testid="button-cancel"]').should('not.be.disabled');
		cy.get('[data-testid="button-exit"]').should('not.be.disabled');
	});

	it('should correctly render the buttons once Start is clicked', () => {});

	it('should correctly render the buttons once Pause is clicked', () => {});

	it('should correctly render the buttons once Continue is clicked', () => {});

	it('should correctly render the buttons once Exit is clicked', () => {
		cy.get('[data-testid="button-exit"]').click();
		cy.get('[data-testid="button-new"]').should('be.disabled');
		cy.get('[data-testid="button-start"]').should('be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('be.disabled');
		cy.get('[data-testid="button-cancel"]').should('be.disabled');
		cy.get('[data-testid="button-exit"]').should('be.disabled');
	});

	it('should correctly render the buttons once Cancel is clicked', () => {});
});

