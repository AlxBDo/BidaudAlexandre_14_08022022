import { render as rtlRender } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import employeesReducer from "../../features/employees"
import errorReducer from "rh-date-picker/dist/features/error" 
import paramsReducer from "rh-date-picker/dist/features/params" 
import selectedDateReducer from "rh-date-picker/dist/features/selectedDate"
import validationFormReducer from "../../features/validationForm"


export function render(ui, options) {

    const store = configureStore({
        reducer: {
            employees: employeesReducer,
            error: errorReducer, 
            params: paramsReducer, 
            selectedDate: selectedDateReducer, 
            validationForm: validationFormReducer
        }
    })

    function Wrapper({ children }) {
        return(
            <MemoryRouter {...options}>
                <Provider store={store}>{ children }</Provider>
            </MemoryRouter>
        )
    }

    rtlRender(ui, { wrapper: Wrapper })

}