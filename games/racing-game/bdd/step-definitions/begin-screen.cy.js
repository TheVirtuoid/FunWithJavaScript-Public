import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

const buttons = new Map([
	['New', 'button-new'],
	['Exit', 'button-exit'],
	['Back', 'button-back'],
	['Start', 'button-start'],
	['Pause', 'button-pause'],
	['Resume', 'button-resume'],
	['Cancel', 'button-cancel']
]);

Before(() => {
	cy.clearCookies();
	cy.clearLocalStorage();
})

Given('I navigate to the "begin" page', () => {
	cy.visit('/index.html');
});

When('The first screen appears', () => {
	// nothing here! We just want to look at the screen
});

When('I click on the {string} button', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).click();
});

Then('I should see the header menu', () => {
	cy.get('[data-testid=header] [data-testid=actions]').should('be.visible');
});

Then('I should see the main', () => {
	cy.get('[data-testid=main]').should('be.visible');
});

Then('I should see the footer', () => {
	cy.get('[data-testid=footer]').should('be.visible');
});

Then('I should see the "racing game" title', () => {
	cy.get('[data-testid=blank-screen]').should('be.visible')
		.should('have.text', 'racing game');
});

Then('I should not see the "select cars" screen', () => {
	cy.get('[data-testid=select-cars-screen]').should('not.be.visible');
});
Then('I should not see the "venue" screen', () => {
	cy.get('[data-testid=venue-screen]').should('not.be.visible');
});

Then('I should see the {string} button is active', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('not.be.disabled');
});

Then('I should see the {string} button is inactive', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('be.disabled');
});

Then('I should see the "Select Cars" screen', () => {
	cy.get('[data-testid=blank-screen]').should('not.be.visible');
	cy.get('[data-testid=select-cars-screen]').should('be.visible');
});

Then('I should see the "Confirm Exit" dialog box', () => {
	cy.get('[data-testid=exit-game-dialog]').should('be.visible');
});

Then('I should see the {string} button', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('be.visible');
});

Then('I should see no other buttons than the ones mentioned', () => {
	cy.get('#actions > button').should('have.length', buttons.size);
	buttons.forEach((value, key) => {
		cy.get(`[data-testid=${value}]`).should('be.visible');
	});
});








































