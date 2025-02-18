describe('When the web page is first loaded', () => {
	beforeEach(() => {
		cy.visit('http://localhost:4173');
	});

	it('should correctly render the buttons', () => {
		cy.get('[data-testid="button-new"]').should('not.be.disabled');
		cy.get('[data-testid="button-start"]').should('be.disabled');
		cy.get('[data-testid="button-pause"]').should('be.disabled');
		cy.get('[data-testid="button-continue"]').should('be.disabled');
		cy.get('[data-testid="button-cancel"]').should('be.disabled');
		cy.get('[data-testid="button-exit"]').should('not.be.disabled');
	});
});

