import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import ReactModal from "react-modal"

import { InputsSection, StyledForm, ValidationSection } from "./style"
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


Form.propTypes = {
    formId: PropTypes.string.isRequired, 
    inputsId: PropTypes.array.isRequired, 
    modalContentLabel: PropTypes.string.isRequired,  
    submitButtonText: PropTypes.string, 
    submitFunction: PropTypes.func.isRequired
}

Form.defaultProps = {
    submitButtonText: "Submit"
}

function Form(props) {

    const { children, formId, inputsId, modalContentLabel, submitButtonText, submitFunction } = props
    const dispatch = useDispatch()
    dispatch(validationFormAction.addForm(formId, inputsId))
    const validationForm = useSelector(selectValidationForm(formId))
    const modalMessage = validationForm.issue
    const submited = modalMessage && true

    return(

        <StyledForm onSubmit={(e) => e.preventDefault()} id={formId}>

            <InputsSection> {children} </InputsSection>

            <ValidationSection>
                <button 
                    disabled={ validationForm.status !== "checked" } 
                    onClick={() => {
                        submitFunction(getValueAndClearInputs(inputsId)).then( (issue) => {
                            if(issue){  
                                dispatch(validationFormAction.submitForm(formId, issue))
                            }
                        })}
                    }
                >{ submitButtonText }</button>
                
                <ReactModal 
                    appElement={ document.getElementById(formId)}
                    closeTimeoutMS={1500} 
                    contentLabel={modalContentLabel} 
                    id={`${formId}-validation-modal`}
                    isOpen={ submited } 
                    onAfterOpen={ () => {
                        setTimeout( () => {
                            if(submited){
                                dispatch(validationFormAction.clearForm(formId))
                            }
                        } , 1500)
                    } }
                    onRequestClose={ () => dispatch(validationFormAction.clearForm(formId)) }
                    shouldCloseOnEsc={ true } 
                    shouldCloseOnOverlayClick={ true }
                > 
                    <button onClick={ () => dispatch(validationFormAction.clearForm(formId)) }>Close</button>
                    <div>
                        <p>{modalMessage}</p>
                        <p> This message will automatically close in 1,5 second. You can also click outside the dialog box or press "Esc". </p>
                    </div> 
                </ReactModal>
            </ValidationSection>
            
        </StyledForm>

    )
}

export default Form