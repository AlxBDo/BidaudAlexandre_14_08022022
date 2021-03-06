
describe("Home page", () => {
    beforeEach( () => {
        cy.visit("/") 
    })

    it("Should display Header", () => {
        cy.get('[data-testid=header-h1]').contains("HRnet")
        cy.get('[data-testid=header-h2').contains("Create Employee") 
        cy.get('[data-testid=header-link').contains("Employees List")
    })

    it("Should add form in validationForm.forms state", () => {
        cy.window().its("store").invoke("getState").its("validationForm").should("deep.equal", {
            status:'on',
            forms:{
                createEmployeeForm:{
                    status:'to-check',
                    issue:false,
                    inputs: [
                        'city',
                        'dateOfBirth',
                        'department',
                        'firstName',
                        'lastName',
                        'startDate',
                        'state',
                        'street',
                        'zipCode'
                    ],
                    checked:{sum:0},
                    values:{}
                }
            }
        })
    })

    it("Should display an error message if first name entered does not respect the authorized format.", () => {
        cy.get("#firstName").type("pierre5") 
        cy.get("#firstName-error").contains("First Name does not respect the required format.") 
        cy.get("#firstName").clear()
        cy.get("#firstName").type("pierre!") 
        cy.get("#firstName-error").contains("First Name does not respect the required format.") 
        cy.get("#firstName").clear()
        cy.get("#firstName").type("Juan Carlos Frederico Miguel Patricio") 
        cy.get("#firstName-error").contains("First Name does not respect the required format.") 
        cy.get("#firstName").clear()
        cy.get("#firstName").type("p").blur() 
        cy.get("#firstName-error").contains("First Name does not respect the required format.") 
        cy.get("#firstName").clear()
    })

    it("Should not display an error message if first name entered respect the authorized format.", () => {
        cy.get("#firstName").type("Jo").blur() 
        cy.get("#firstName-error").should("not.exist")  
        cy.get("#firstName").clear()
        cy.get("#firstName").type("Joseph Marie").blur() 
        cy.get("#firstName-error").should("not.exist")  
        cy.get("#firstName").clear()
        cy.get("#firstName").type("Joseph-Marie").blur() 
        cy.get("#firstName-error").should("not.exist") 
        cy.get("#firstName").clear()
    })

    it("Should display an error message if Zip Code entered does not respect the authorized format.", () => {
        cy.get("#zipCode").type(500) 
        cy.get("#zipCode-error").contains("Zip Code does not respect the required format.") 
        cy.get("#zipCode").clear()
        cy.get("#zipCode").type(99951) 
        cy.get("#zipCode-error").contains("Zip Code does not respect the required format.") 
        cy.get("#zipCode").clear()
    })

    it("Should not display an error message if Zip Code entered respect the authorized format.", () => {
        cy.get("#zipCode").type(501).blur() 
        cy.get("#zipCode-error").should("not.exist")  
        cy.get("#zipCode").clear()
        cy.get("#zipCode").type(99950).blur() 
        cy.get("#zipCode-error").should("not.exist")  
        cy.get("#zipCode").clear()
    })

    it("Should display an error message if date of birth entered does not respect the authorized format.", () => {
        cy.get("#dateOfBirth").click() 
        cy.get("#dateOfBirth-calendar-modal").should("have.css", "flex") 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-selected-year").click() 
        cy.get("#dateOfBirth-year-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select-option-67").click() 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-selected-month").click() 
        cy.get("#dateOfBirth-month-select").should("have.class", "show") 
        cy.get("#dateOfBirth-month-select-option-0").click() 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dayLi-dateOfBirth-9").click() 
        cy.get("#dateOfBirth-err-msg").contains("date is out of bounds!") 
        cy.get("#dateOfBirth").clear()
    })

    it("Should not display an error message if date of birth entered respect the authorized format.", () => {
        cy.get("#dateOfBirth").click() 
        cy.get("#dateOfBirth-calendar-modal").should("have.css", "flex") 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-selected-year").click() 
        cy.get("#dateOfBirth-year-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select-option-47").click() 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-selected-month").click() 
        cy.get("#dateOfBirth-month-select").should("have.class", "show") 
        cy.get("#dateOfBirth-month-select-option-0").click() 
        cy.get("#dateOfBirth-day-select").should("have.class", "show") 
        cy.get("#dateOfBirth-year-select").should("not.have.class", "show") 
        cy.get("#dateOfBirth-month-select").should("not.have.class", "show") 
        cy.get("#dayLi-dateOfBirth-9").click() 
        cy.get("#dateOfBirth").should("have.value", "05-01-1999")
        cy.get("#dateOfBirth-error").should("not.exist")  
        cy.get("#dateOfBirth").clear()
    })

    it("Should display an error message if street entered does not respect the authorized format.", () => {
        cy.get("#street").type("r").blur() 
        cy.get("#street-error").contains("Street does not respect the required format.") 
        cy.get("#street").type("ue?") 
        cy.get("#street-error").contains("Street does not respect the required format.") 
        cy.get("#street").clear()
        cy.get("#street").type("a z e r t y u i o p q s d f g h j k l m n w x c v b n 0 1 2 3 4 5 6 7 8 9 A Z E R T Y U I O P").blur() 
        cy.get("#street-error").contains("Street does not respect the required format.") 
        cy.get("#street").clear()
    })

    it("Should not display an error message if street entered respect the authorized format.", () => {
        cy.get("#street").type("Here").blur() 
        cy.get("#street-error").should("not.exist")  
        cy.get("#street").clear()
        cy.get("#street").type("Appt 521 - Etg 5 - Residence Bellevue - 1875 bis Boulevard du General Leclerc").blur() 
        cy.get("#street-error").should("not.exist")  
        cy.get("#street").clear()
    })

    it("Should display an error message if city entered does not respect the authorized format.", () => {
        cy.get("#city").type("r").blur() 
        cy.get("#city-error").contains("City does not respect the required format.") 
        cy.get("#city").type("?") 
        cy.get("#city-error").contains("City does not respect the required format.") 
        cy.get("#city").clear()
        cy.get("#city").type("a.")
        cy.get("#city-error").contains("City does not respect the required format.") 
        cy.get("#city").clear()
        cy.get("#city").type("a z e r t y u i o p q s d f g h i j k l m n o p q r").blur() 
        cy.get("#city-error").contains("City does not respect the required format.") 
        cy.get("#city").clear()
    })

    it("Should not display an error message if city entered respect the authorized format.", () => {
        cy.get("#city").type("Le Nom De Ma Ville Super Long").blur() 
        cy.get("#city-error").should("not.exist")  
        cy.get("#city").clear()
        cy.get("#city").type("Le-Nom-De-Ma-Ville-Super-Long").blur() 
        cy.get("#city-error").should("not.exist")  
        cy.get("#city").clear()
    })

    it("Should have a submit button contains Save and have disabled property.", () => {
        cy.get("[data-testid=submit-btn]").contains("Save").should("be.disabled")
    })

    it("Should can submit createEmployeeForm.", () => {
        cy.get("#firstName").type("Joseph Marie").blur() 
        cy.get("#lastName").type("De La Haute").blur() 
        cy.get("#dateOfBirth").click()  
        cy.get("#dateOfBirth-selected-year").click()  
        cy.get("#dateOfBirth-year-select-option-47").click() 
        cy.get("#dateOfBirth-selected-month").click() 
        cy.get("#dateOfBirth-month-select-option-0").click() 
        cy.get("#dayLi-dateOfBirth-9").click() 
        cy.get("#startDate").click()  
        cy.get("#startDate-selected-year").click()  
        cy.get("#startDate-year-select-option-65").click() 
        cy.get("#startDate-selected-month").click() 
        cy.get("#startDate-month-select-option-0").click() 
        cy.get("#dayLi-startDate-9").click() 
        cy.get("#street").type("Appt 521 - Etg 5 - Residence Bellevue - 1875 bis Boulevard du General Leclerc").blur() 
        cy.get("#city").type("Le-Nom-De-Ma-Ville-Super-Long").blur() 
        cy.get('#state').type("Alabama{enter}")
        cy.get("#zipCode").type(501).blur() 
        cy.get('#department').type("Sales{enter}")
        cy.get("[data-testid=submit-btn]").contains("Save").should("not.be.disabled").click()
        cy.get("[data-testid=modal-msg").contains("???? Employee Created! ????")
    })
 
})

