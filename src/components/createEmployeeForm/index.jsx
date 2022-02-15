import { useDispatch, useSelector } from "react-redux"

import Form from "../form"
import { City, DateOfBirth, Department, FirstName, inputsId, LastName, StartDate, States, Street, ZipCode } from "./inputs" 
import addEmployee from "../../firebase/addEmployee"
import { decryptItem } from "../../utils/crypt"
import * as employeesAction from "../../features/employees"
import { selectEmployees } from "../../utils/selectors"


function CreateEmployeeForm() {

    const dispatch = useDispatch()

    dispatch(employeesAction.fetchListFromStorage())

    async function saveEmployee(inputs){
        if(inputs.city === ""){ return false }
        if(dispatch(employeesAction.saveEmployee(inputs))){
            return "👍 Employee Created! 👍"
        } else {
            return "😥 The employee you want to create already exists in the database 😥"
        }
    }

    return(

        <Form 
            formId="createEmployeeForm" 
            inputsId={ inputsId } 
            modalContentLabel="Employee creation form"
            submitButtonText="Save" 
            submitFunction={ saveEmployee }
        >
            <FirstName />
            <LastName />
            <DateOfBirth />
            <StartDate />

            <fieldset className="address">
                <legend>Address</legend>
                <Street />
                <City />
                <States />
                <ZipCode />
            </fieldset>

            <Department />

        </Form>

    )
}

export default CreateEmployeeForm