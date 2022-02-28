import { useDispatch } from "react-redux"
import { City, DateOfBirth, Department, FirstName, inputsId, LastName, StartDate, States, Street, ZipCode } from "./inputs"
import * as employeesAction from "../../features/employees"
import { style } from "rh-date-picker/dist/style"
import Form from "../form"

/**
 * Display Employee Form for creating a new employee. It build with Form Component
 * @component 
 * @returns {object} CreateEmployeeForm 
 * @see Form
 */
function CreateEmployeeForm() {

    const dispatch = useDispatch()

    async function saveEmployee(inputs){
        if(inputs.city === ""){ return false }
        if(dispatch(employeesAction.saveEmployee(inputs))){
            return "👍 Employee Created! 👍"
        } else {
            return "😥 The employee you want to create already exists in database 😥"
        }
    }

    const modalStyle = {
        overlay: {
            position: "inherit"
        },
        content: {
            position: "fixed", 
            inset: "60% 0px 10%", 
            padding: "20px",
            maxWidth: "380px",
            height: "max-content",
            width: "80%",
            color: style.color(),
            backgroundColor: style.backgroundColor(),
        }
    }

    return(

        <Form
            formId="createEmployeeForm" 
            inputsId={ inputsId } 
            modalContentLabel="Employee creation form" 
            modalStyle={ modalStyle }
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