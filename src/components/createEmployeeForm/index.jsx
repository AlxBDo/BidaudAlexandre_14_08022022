import { useDispatch, useSelector } from "react-redux"
import ReactModal from "react-modal"

import Form from "../form"
import { City, DateOfBirth, Department, FirstName, inputsId, LastName, StartDate, States, Street, ZipCode } from "./inputs"


function CreateEmployeeForm() {

    return(

        <Form 
            formId="createEmployeeForm" 
            inputsId={ inputsId } 
            modalContentLabel="Employee creation form" 
            modalContentText="👍 Employee Created!" 
            submitButtonText="Save" 
            submitFunction={ (input) => console.log(...input)}
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