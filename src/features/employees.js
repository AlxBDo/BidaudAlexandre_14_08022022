import { createSlice } from "@reduxjs/toolkit";

import { getDatabase, ref, child, get } from "firebase/database";
import { db } from "../firebase/config";
import addEmployee from "../firebase/addEmployee";
import { selectEmployees } from "../utils/selectors";

export function saveEmployee(employeeObj){
    return (dispatch, getState) => { 
        const employees = selectEmployees()
        if(employees(getState()).list.indexOf(employeeObj) >= 0){ return false }
        employeeObj.id = employees(getState()).sum
        addEmployee(employeeObj)
        dispatch(actions.addEmployeeToList(employeeObj)) 
        return true
    }
}

 export function fetchListFromStorage(){
    const dbRef = ref(getDatabase())
    return async (dispatch) => {
        get(child(dbRef, "employees/")).then((employeesDb) => {
            if(employeesDb.exists()){ 
                return dispatch(actions.setList(employeesDb.val()))
            } 
        }).catch((error) => {
            console.error("get employees error : ", error)
        })
    }
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