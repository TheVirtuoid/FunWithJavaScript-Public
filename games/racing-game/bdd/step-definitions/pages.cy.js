import {Then} from "@badeball/cypress-cucumber-preprocessor";

const pages = new Map([
	['Begin', 'begin-screen'],
	['Select Cars', 'select-cars-screen'],
	['Select Venue', 'select-venue-screen'],
	['Venue', 'venue-screen']
]);

Then('I should see the {string} screen', (screen) => {
	cy.get(`[data-testid=${pages.get(screen)}]`).should('be.visible');
});

Then('I should not see the {string} screen', (screen) => {
	cy.get(`[data-testid=${pages.get(screen)}]`).should('not.exist');
});
