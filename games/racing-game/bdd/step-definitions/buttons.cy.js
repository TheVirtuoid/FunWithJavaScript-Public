import {Then, When} from "@badeball/cypress-cucumber-preprocessor";

const buttons = new Map([
	['Select Cars', 'button-select-cars'],
	['Exit', 'button-exit'],
	['Select Venue', 'button-select-venue'],
	['Start', 'button-start'],
	['Pause', 'button-pause'],
	['Resume', 'button-resume'],
	['Back', 'button-go-back'],
	['Yes', 'exit-game-dialog-button-yes'],
	['No', 'exit-game-dialog-button-no'],
	['Select Car', 'button-select-car'],
	['Unselect Car', 'button-unselect-car']
]);

When('I click on the {string} button', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).click();
});


Then('I should see the {string} button', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('be.visible');
});

Then('I should not see the {string} button', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('not.be.visible');
});

Then('I should see a {string} button that is disabled', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('be.visible').and('be.disabled');
});

Then('I should see a {string} button that is enabled', (button) => {
	cy.get(`[data-testid=${buttons.get(button)}]`).should('be.visible').and('not.be.disabled');
});