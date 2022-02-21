import validationFormReducer from "./validationForm" 
import * as validationFormActions from "./validationForm"

describe("ValidationForm actions and reducer", () => {

    const inputs = ["testInput"]

    const testFormId = {
        status: "to-check", 
        issue: false,
        inputs, 
        checked: { sum: 0 }, 
        values: {}
    }
    
    const formChecked = {
        status: "checked", 
        issue: false,
        inputs, 
        checked: { sum: 1, testInput: true }, 
        values: { testInput: "valueTest"}
    }

    it("Should return off status", () => {

        expect(validationFormReducer(
            undefined, 
            { type: "@INIT" }
        )).toEqual({
            status : "off",
            forms: {}
        })

    })

    it("Should add a form to forms attribute", () => {

        expect(validationFormReducer({
            status : "off",
            forms: {}
        }, validationFormActions.addForm("testFormId", inputs))).toEqual({
            status : "on",
            forms: { testFormId }
        })

    })

    it("Should add an inputChecked and have checked status", () => {

        expect(validationFormReducer({
            status : "on",
            forms: { testFormId }
        }, validationFormActions.addCheckedInput("testFormId", "testInput", "valueTest"))).toEqual({
            status : "on",
            forms: { testFormId: formChecked }
        })

    })

    it("Should remove an inputChecked and have to-check status", () => {

        expect(validationFormReducer({
            status : "on",
            forms: { formChecked }
        }, validationFormActions.removeCheckedInput("formChecked", "testInput"))).toEqual({
            status : "on",
            forms: { formChecked: {
                status: "to-check", 
                issue: false,
                inputs, 
                checked: { sum: 0, testInput: false }, 
                values: { testInput: null }
            } }
        })

    })

    it("Should add an issue and have submited status", () => {

        expect(validationFormReducer({
            status : "on",
            forms: { formChecked }
        }, validationFormActions.submitForm("formChecked", "issueTest"))).toEqual({
            status : "on",
            forms: { formChecked: {
                status: "submited", 
                issue: "issueTest",
                inputs, 
                checked: { sum: 1, testInput: true }, 
                values: { testInput: "valueTest"}
            }}
        })

    })

    it("Should clear form and have to-check status", () => {

        expect(validationFormReducer({
            status : "on",
            forms: { formChecked }
        }, validationFormActions.clearForm("formChecked"))).toEqual({
            status : "on",
            forms: { formChecked: testFormId }
        })

    })
 
})