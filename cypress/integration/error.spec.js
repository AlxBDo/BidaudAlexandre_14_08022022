describe("Error page", () => {
    beforeEach( () => {
        cy.visit("/dsfddfsdfds") 
    })

    it("Should display Header", () => {
        cy.get('[data-testid=header-h1]').contains("HRnet")
        cy.get('[data-testid=header-h2').contains("🚧 No Way 🚧") 
        cy.get('[data-testid=header-link').contains("Home")
    })

})