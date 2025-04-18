import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
	cy.clearCookies();
	cy.clearLocalStorage();
})

Given('I have launched the racing game', () => {
	cy.visit('/');
});

When('I click on the Hello World button', () => {
	cy.get('button').contains('Hello World').click();
});

Then('I should see the Hello World text', () => {
	cy.get('#hello-world-text').should('be.visible');
});