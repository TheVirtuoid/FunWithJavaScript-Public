import {Then} from "@badeball/cypress-cucumber-preprocessor";

const pages = new Map([
	['Begin', 'begin-screen'],
	['Select Cars', 'select-cars-screen'],
	['Select Venue', 'select-venue-screen'],
	['Race','race-screen']
]);

Then('I should see the {string} screen', (screen) => {
	cy.get(`[data-testid=${pages.get(screen)}]`).should('be.visible');
});

Then('I should not see the {string} screen', (screen) => {
	cy.get(`[data-testid=${pages.get(screen)}]`).should('not.exist');
});

Then('I should be on the {string} screen', (screen) => {
	pages.forEach((page) => {
		if (page === pages.get(screen)) {
			cy.get(`[data-testid=${page}]`).should('be.visible');
		} else {
			cy.get(`[data-testid=${page}]`).should('not.exist');
		}
	});
});