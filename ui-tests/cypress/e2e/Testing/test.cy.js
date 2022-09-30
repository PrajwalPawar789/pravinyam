/// <reference types="cypress" />

describe('Check modules', () => {
    beforeEach('visit site', () => {
        cy.visit('http://localhost:3000')
    });

    it('reader', () => {
        cy.get(':nth-child(1) > .MuiButton-root > .MuiBox-root')
            .should('be.visible')
            .click();
        // cy.wait(200);

        for (let i = 1; i <= 60; i++) {
            cy.get(':nth-child(' + i + ') > .css-10u5ln3 > .MuiButton-root > .MuiPaper-root > .MuiButtonBase-root').should('be.visible').and('be.enabled');
            cy.wait(3000);
        }
    });


    it('debug', () => {
        cy.get(':nth-child(2) > .MuiButton-root > .MuiBox-root')
            .should('be.visible')
            .click();
        // cy.wait(200);

        for (let i = 1; i <= 2; i++) {
            cy.get(':nth-child(' + i + ') > .css-10u5ln3 > .MuiButton-root > .MuiPaper-root > .MuiButtonBase-root').should('be.visible').and('be.enabled');
            cy.wait(3000);
        }
    });


    it('solver', () => {
        cy.get(':nth-child(3) > .MuiButton-root > .MuiBox-root')
            .should('be.visible')
            .click();
        // cy.wait(200);

        for (let i = 1; i <= 2; i++) {
            cy.get(':nth-child(' + i + ') > .css-10u5ln3 > .MuiButton-root > .MuiPaper-root > .MuiButtonBase-root').should('be.visible').and('be.enabled');
            cy.wait(3000);
        }
    });
});