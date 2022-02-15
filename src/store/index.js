import { configureStore } from "@reduxjs/toolkit";

import employeesReducer from "../features/employees"
import errorReducer from "rh-date-picker/dist/features/error" 
import paramsReducer from "rh-date-picker/dist/features/params" 
import selectedDateReducer from "rh-date-picker/dist/features/selectedDate"
import validationFormReducer from "../features/validationForm"

export default configureStore({
    reducer: {
        employees: employeesReducer,
        error: errorReducer,
        params: paramsReducer, 
        selectedDate: selectedDateReducer, 
        validationForm: validationFormReducer
    }
})