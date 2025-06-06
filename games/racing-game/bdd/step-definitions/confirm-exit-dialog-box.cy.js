import {Given, Then} from "@badeball/cypress-cucumber-preprocessor";

Given('I have activated the Exit dialog box', () => {
	cy.visit('/index.html');
	cy.get('[data-testid=button-exit]').click();
});

Then('The "No" button should have focus', () => {
	cy.get('[data-testid=exit-game-dialog-button-no]')
		.should('be.visible')
		.should('have.focus');
});

Then('I should see the dialog box disappear', () => {
	cy.get('[data-testid=exit-game-dialog]').should('not.be.visible');
});

/*
Then('I should go to the "Begin" screen', () => {
	cy.get('[data-testid=begin-screen]').should('be.visible');
	cy.get('[data-testid=select-cars-screen]').should('not.exist');
	cy.get('[data-testid=select-venue-screen]').should('not.exist');
	cy.get('[data-testid=racing-screen]').should('not.exist');
});*/
