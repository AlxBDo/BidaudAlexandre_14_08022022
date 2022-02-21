import employeesReducer from "./employees"
import * as employeesAction from "./employees"

describe("Error reducer and actions", () => {

    it("Should return void status", () => {

        expect(employeesReducer(
            undefined, 
            { type: "@INIT" }
        )).toEqual({
            status : "void", 
            list: [], 
            sum: 0
        })

    })

    it("Should return empty status", () => {

        expect(employeesReducer({
            status : "void", 
            list: [], 
            sum: 0
        }, employeesAction.setList([]))).toEqual({
            status : "empty", 
            list: [], 
            sum: 0
        })

    })

    it("Should return listed status", () => {

        expect(employeesReducer({
            status : "void", 
            list: [], 
            sum: 0
        }, employeesAction.setList([{
            firstName: "Test", 
            lastName: "Test"
        }]))).toEqual({
            status : "listed", 
            list: [{
                firstName: "Test", 
                lastName: "Test"
            }], 
            sum: 1
        })

    })

    it("Should add an employee", () => {
        expect(employeesReducer({
            status : "void", 
            list: [], 
            sum: 0
        }, employeesAction.addEmployeeToList({
            firstName: "Test", 
            lastName: "Test"
        }))).toEqual({
            status : "listed", 
            list: [{
                firstName: "Test", 
                lastName: "Test"
            }], 
            sum: 1
        })

    })

})