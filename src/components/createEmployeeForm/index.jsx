import { useDispatch } from "react-redux"

import { StyledForm } from "./style"
import { City, DateOfBirth, Department, FirstName, inputsId, LastName, StartDate, States, Street, ZipCode } from "./inputs"
import * as validationFormAction from "../../features/validationForm"


function CreateEmployeeForm() {

    const dispatch = useDispatch()
    dispatch(validationFormAction.addForm("createEmployeeForm", inputsId))

    return(

        <StyledForm>

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

            <button>Save</button>
            <div id="confirmation" className="modal">Employee Created!</div>
        </StyledForm>

    )
}

export default CreateEmployeeForm