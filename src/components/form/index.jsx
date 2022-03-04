import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import ReactModal from "react-modal"
import { InputsSection, StyledForm, SubmitButton, ValidationSection } from "./style"
import * as validationFormAction from "../../features/validationForm"
import { selectValidationForm } from "../../utils/selectors"


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

/**
 * Displays a customizable form with a modal indicating the submit result (Use react-modal plugin). 
 * @component
 * @param {object} props 
 * @param {string} props.formId - use for html attribute id 
 * @param {array} props.inputsId - Inputs id list 
 * @param {string} props.modalContentLabel - Modal label text (react-modal parameter) 
 * @param {object} props.modalStyle - Modal style options (react-modal parameter) 
 * @param {string} props.submitButtonText - Submit button text 
 * @param {function} props.submitFunction - When form is submitted, array of input values ​​is passed to it as an argument.
 * @returns {object} Form
 */
function Form(props) {

    const { children, formId, inputsId, modalContentLabel, modalStyle, submitButtonText, submitFunction } = props 
    const validationForm = useSelector(selectValidationForm(formId))
    const dispatch = useDispatch()
    if(!validationForm){
        dispatch(validationFormAction.addForm(formId, inputsId))
    } else { modalParams.set(validationForm.status, validationForm.issue) }
    

    return(

        <StyledForm onSubmit={(e) => e.preventDefault()} id={formId}>

            <InputsSection> {children} </InputsSection>

            <ValidationSection>
                <SubmitButton 
                    disabled={ validationForm && validationForm.status !== "checked" } 
                    data-testid="submit-btn" 
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
                        <p data-testid="modal-msg">{ modalParams.message }</p>
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