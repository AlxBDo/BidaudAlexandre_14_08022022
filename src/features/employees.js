import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore"; 
import { firestoreDb } from "../firebase/config";
import { addEmployee } from "../firebase/addEmployee";
import { selectEmployees } from "../utils/selectors";
import { decryptItem } from "../utils/crypt";

/**
 * Save new employee to employees list and to FireStore database 
 * @memberof employees
 * @param {object} employeeObj 
 * @returns {boolean} saveResult 
 * @example `employeesAction.saveEmployee( employeeObj = { firstName: String, lastName: String, dateOfBirth : String, startDate: String, street: String, city: String, state: String, zipCode: Number, department: String } )` 
 * @see addEmployee 
 */
export function saveEmployee(employeeObj){
    return (dispatch, getState) => { 
        const employees = selectEmployees()
        const employeesList = employees(getState()).list
        if(employeesList.find(element => JSON.stringify(element) === JSON.stringify(employeeObj))){ return false }
        addEmployee(employeeObj)
        dispatch(actions.addEmployeeToList(employeeObj)) 
        return true
    }
}

/**
 * Fetch employees list to FireStore database and decrypt employee's firstName, lastName and steet
 * @memberof employees
 * @returns {array} employeesList 
 * @example `employeesAction.fetchListFromFirestore()` 
 * @see decryptItem
 */
export async function fetchListFromFirestore(){
    const employeesFirestore = await getDocs(collection(firestoreDb, "employees"));
    const employees = []
    employeesFirestore.forEach((doc) => {
        const employee = doc.data()
        if(employee.firstName){
            employee.firstName = decryptItem(employee.firstName)
            employee.lastName = decryptItem(employee.lastName) 
            employee.street = decryptItem(employee.street)
            employees.push(employee)
        }
    });
    return employees
}


const initialState = {
    status : "void", 
    list: [], 
    sum: 0
}

/**
 * @typedef {object} employees 
 * @component 
 * @description Redux component storing employee information 
 * @property {function} addEmployeeToList - Add new employee to employees list 
 * @property {function} setList - Store employees list 
 */
const { actions, reducer } = createSlice({
    name: "employees", 
    initialState, 
    reducers: {

        /**
         * @name addEmployeeToList 
         * @memberof employees 
         * @description Add new employee to employees list 
         * @param {object} employee - Employee to add to list 
         * @example `employeesAction.addEmployeeToList( employee = { firstName: String, lastName: String, dateOfBirth : String, startDate: String, street: String, city: String, state: String, zipCode: Number, department: String } )` 
         */
        addEmployeeToList : {
            prepare: (employee) => ({
                payload: { employee }
            }),
            reducer: (draft, action) => {
                const newEmployee = typeof action.payload.employee === "object" && action.payload.employee
                if(!newEmployee){ return }
                const employees = draft.list
                draft.list = [newEmployee, ...employees]
                draft.sum++
                if(draft.status !== "listed"){ draft.status = "listed" }
                return
            }
        },

        /**
         * @name setList 
         * @memberof employees 
         * @description Store employees list 
         * @param {array} list - Employees list 
         * @example `employeesAction.setList( list = [ employeeObject1, employeeObject2, ... ] )` 
         */
        setList: {
            prepare: (list) => ({
                payload: { list }
            }), 
            reducer: (draft, action) => {
                if(draft.status !== "void"){ return }
                const employeesList = action.payload.list
                if(Array.isArray(employeesList) && employeesList.length > 0){
                    draft.list = employeesList 
                    draft.sum = employeesList.length 
                    draft.status = "listed"
                } else {
                    draft.status = "empty"
                }
                return
            }
        }
    }
})

export const { addEmployeeToList, setList } = actions 

export default reducer