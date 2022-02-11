import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import ReactModal from "react-modal"

import { InputsSection, StyledForm, ValidationSection } from "./style"
import * as validationFormAction from "../../features/validationForm"
import { selectValidationForm } from "../../utils/selectors"


function getValueAndClearInputs(inputsId){
    return inputsId.map( (inputId) => {
        const ipt = document.getElementById(inputId)
        const value = ipt.value ?? ipt.textContent
        if(ipt.value){ ipt.value = "" 
        } else { ipt.textContent = "" }
        return { id: ipt.getAttribute("id"), value }
    }, [])
}


Form.propTypes = {
    formId: PropTypes.string.isRequired, 
    inputsId: PropTypes.array.isRequired, 
    modalContentLabel: PropTypes.string.isRequired, 
    modalContentText: PropTypes.string.isRequired, 
    submitButtonText: PropTypes.string, 
    submitFunction: PropTypes.func.isRequired
}

Form.defaultProps = {
    submitButtonText: "Submit"
}

function Form(props) {

    const { children, formId, inputsId, modalContentLabel, modalContentText, submitButtonText, submitFunction } = props
    const dispatch = useDispatch()
    dispatch(validationFormAction.addForm(formId, inputsId))
    const validationForm = useSelector(selectValidationForm(formId))
    const submited = validationForm.status === "submited" 

    if(submited){ submitFunction(getValueAndClearInputs(inputsId)) }

    return(

        <StyledForm onSubmit={(e) => e.preventDefault()} id={formId}>

            <InputsSection> {children} </InputsSection>

            <ValidationSection>
                <button 
                    disabled={ validationForm.status !== "checked" } 
                    onClick={() => dispatch(validationFormAction.submitForm(formId))}
                >{ submitButtonText }</button>
                
                <ReactModal 
                    appElement={ document.getElementById(formId)}
                    closeTimeoutMS={1000} 
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
                        <p>{ modalContentText }</p>
                        <p> This message will automatically close in 1,5 second. You can also click outside the dialog box or press "Esc". </p>
                    </div> 
                </ReactModal>
            </ValidationSection>
            
        </StyledForm>

    )
}

export default Form