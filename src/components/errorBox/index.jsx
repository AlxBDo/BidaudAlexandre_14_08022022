import { useSelector } from 'react-redux'
import { selectError } from 'rh-date-picker/dist/utils/selectors'
import PropTypes from "prop-types"

import { AdviceP, ErrorCtn, ErrorP } from "./style"

/**
 * Provides message indicating maximum and minimum values ​​accepted.
 * @param {number} max 
 * @param {number} min 
 * @param {string} type - accept "string" or "number" 
 * @returns {string} limitMessage
 */
function limitMessage(max, min, type = "text"){
        return max > 0 ? `and ${type === "text" ? "number of characters" : "value"} must be between ${min} and ${max}.` : "."
}


ErrorBox.defaultProps = {
    max: 0,
    min: 0
}

ErrorBox.propTypes = {
    inputId : PropTypes.string.isRequired, 
    inputName : PropTypes.string.isRequired, 
    max: PropTypes.number, 
    min: PropTypes.number
}

/**
 * Display error messages 
 * @component 
 * @param {object} props 
 * @param {string} props.inputId - use for html attribute id 
 * and recover the errors transmitted by the control functions of the corresponding input 
 * @param {string} props.inputName - Input name whose ErrorBox should display errors 
 * @param {number} props.max - Maximum allowed value (maximum length for a string) 
 * @param {number} props.min - Minimum allowed value (minimum length for a string) 
 * @returns {object} errorBox
 */
function ErrorBox(props){

    const { inputId, inputName, max, min } = props
    const errors = useSelector(selectError())
    const id = `${inputId}-error`

    return !errors.error[id] ? null : (
        <ErrorCtn>
            <ErrorP id={id}>{inputName} does not respect the required format.</ErrorP>
            <AdviceP>{(() => {
                switch(id){
                    case "zipCode-error": 
                        return `It must consist only of numbers ` + limitMessage(max, min, "number") 
                    case "street-error" : 
                        return `It must consist only of numbers, letters, spaces and hyphens ` 
                        + limitMessage(max, min)  
                    default : 
                        return `It must consist only of letters, spaces and hyphens ` 
                        + limitMessage(max, min) 
                }
            })()}</AdviceP>
        </ErrorCtn>
    )

}

export default ErrorBox
