
describe("Employees page", () => {
    beforeEach( () => {
        cy.visit("/employees") 
    })

    it("Should display Header", () => {
        cy.get('[data-testid=header-h1]').contains("HRnet")
        cy.get('[data-testid=header-h2').contains("Current Employees") 
        cy.get('[data-testid=header-link').contains("Home")
    })

})