describe("HEOR Productivity PWA", () => {
    it("loads the homepage", () => {
        cy.visit("/");
        cy.contains("Welcome");
    });

    it("navigates to Month page and displays chart", () => {
        cy.visit("/month");
        cy.contains("Monthly Productivity Overview");
        cy.get("canvas").should("be.visible");
    });

    it("navigates to Range page", () => {
        cy.visit("/range");
        cy.contains("Custom Range Explorer");
        cy.get("#change-date-btn").should("exist");
    });
});
