import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore"; 
import { firestoreDb } from "../firebase/config";
import { addEmployee } from "../firebase/addEmployee";
import { selectEmployees } from "../utils/selectors";
import { decryptItem } from "../utils/crypt";


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

export async function fetchListFromFirestore(){
    const employeesFirestore = await getDocs(collection(firestoreDb, "employees"));
    const employees = []
    employeesFirestore.forEach((doc) => {
        const employee = doc.data()
        if(employee.firstName){
            employee.firstName = decryptItem(employee.firstName)
            employee.lastName = decryptItem(employee.lastName) 
            employee.street = decryptItem(employee.street)
        }
        employees.push(employee)
    });
    return employees
}


const initialState = {
    status : "void", 
    list: [], 
    sum: 0
}

const { actions, reducer } = createSlice({
    name: "employees", 
    initialState, 
    reducers: {
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