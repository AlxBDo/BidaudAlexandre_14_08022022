import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import ReactModal from "react-modal"

import { InputsSection, StyledForm, SubmitButton, ValidationSection } from "./style"
import * as validationFormAction from "../../features/validationForm"
import { selectValidationForm } from "../../utils/selectors"
import {encryptItem} from "../../utils/crypt"


function getValueAndClearInputs(inputsId){
    const inputs = {}
    inputsId.forEach( (inputId) => {
        const ipt = document.getElementById(inputId)
        const value = ipt.value ?? ipt.textContent
        if(ipt.value){ ipt.value = "" }
        inputs[inputId] = value
    })
    return inputs
}

const modalParams = {
    message: false,
    set: (formState, issue) => {
        modalParams.submit = formState === "submited" ? true : false
        if(issue){ modalParams.message = issue }
    },
    submit : false,
}


Form.propTypes = {
    formId: PropTypes.string.isRequired, 
    inputsId: PropTypes.array.isRequired, 
    modalContentLabel: PropTypes.string.isRequired, 
    modalStyle: PropTypes.object,  
    submitButtonText: PropTypes.string, 
    submitFunction: PropTypes.func.isRequired
}

Form.defaultProps = {
    submitButtonText: "Submit"
}

function Form(props) {

    const { children, formId, inputsId, modalContentLabel, modalStyle, submitButtonText, submitFunction } = props
    const dispatch = useDispatch()
    dispatch(validationFormAction.addForm(formId, inputsId))
    const validationForm = useSelector(selectValidationForm(formId))
    modalParams.set(validationForm.status, validationForm.issue)

    return(

        <StyledForm onSubmit={(e) => e.preventDefault()} id={formId}>

            <InputsSection> {children} </InputsSection>

            <ValidationSection>
                <SubmitButton 
                    disabled={ validationForm.status !== "checked" } 
                    onClick={() => {
                        submitFunction(getValueAndClearInputs(inputsId)).then( (issue) => {
                            if(issue){  
                                dispatch(validationFormAction.submitForm(formId, issue))
                            }
                        })}
                    }
                >{ submitButtonText }</SubmitButton>
                
                <ReactModal 
                    appElement={ document.getElementById(formId)}
                    closeTimeoutMS={1500} 
                    contentLabel={modalContentLabel} 
                    id={`${formId}-validation-modal`}
                    isOpen={ modalParams.submit } 
                    onAfterOpen={ () => {
                        setTimeout( () => {
                            if(modalParams.submit){
                                dispatch(validationFormAction.clearForm(formId))
                            }
                        } , 2000)
                    } }
                    onRequestClose={ () => dispatch(validationFormAction.clearForm(formId)) }
                    shouldCloseOnEsc={ true } 
                    shouldCloseOnOverlayClick={ true } 
                    style={ modalStyle }
                > 
                    <div>
                        <p>{ modalParams.message }</p>
                        <p> This message will automatically close in few seconds. You can also click close button, 
                            outside the dialog box or press "Esc". </p>
                    </div> 
                    <button onClick={ () => dispatch(validationFormAction.clearForm(formId)) }>Close</button>
                </ReactModal>
            </ValidationSection>
            
        </StyledForm>

    )
}

export default Form