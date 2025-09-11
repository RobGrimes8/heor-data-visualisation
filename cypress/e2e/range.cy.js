describe("Productivity PWA - Range", () => {
    it("navigates to Range page", () => {
        cy.visit("/range");
        cy.contains("Custom Range Explorer");
        cy.get("#change-date-btn").should("exist");
    });

    it("shows/hides date input on toggle", () => {
        cy.visit("/range");
        cy.get("#modal-content").should("not.exist");
        cy.get("#change-date-btn").click();
        cy.get("#modal-content").should("exist");
        cy.contains("button", "1").click();
        cy.get("#modal-content").should("not.exist");
    });
});
