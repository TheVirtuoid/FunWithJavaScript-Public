import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then('I should see the "Confirm Exit" dialog box', () => {
	cy.get('[data-testid=exit-game-dialog]').should('be.visible');
	cy.get('[data-testid=exit-game-dialog-message]').should('have.text', 'Exit the game?');
	cy.get('[data-testid=exit-game-dialog-button-yes]').should('be.visible').and('have.text', 'Yes');
	cy.get('[data-testid=exit-game-dialog-button-no]').should('be.visible').and('have.text', 'No');
});