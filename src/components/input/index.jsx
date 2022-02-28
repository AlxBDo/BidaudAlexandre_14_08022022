import { useDispatch } from 'react-redux'
import * as errorActions from "rh-date-picker/dist/features/error"
import * as validationFormAction from "../../features/validationForm"
import PropTypes from "prop-types"
import { HrInput } from "./style";


Input.propTypes = {
    id: PropTypes.string.isRequired, 
    formId: PropTypes.string.isRequired,
    max: PropTypes.number, 
    min: PropTypes.number, 
    checkFunction: PropTypes.func, 
    isRequired: PropTypes.bool, 
    type: PropTypes.string
}

Input.defaultProps = {
    isRequired: true, 
    type: "text"
}

/**
 * Display input and check its value 
 * @param {object} props 
 * @param {string} props.id - use for html attribute id 
 * @param {string} props.formId - use for redux state to control the validation of form inputs 
 * @param {number} props.max - use for html attribute (define max-length for text input) 
 * @param {number} props.min - use for html attribute (define min-length for text input) 
 * @param {function} props.checkFunction - Used to control input value during onChange and onBlur events 
 * @param {boolean} props.isRequired 
 * @param {string} props.type - use for html attribute type 
 * @returns {object} HrInput
 */
function Input(props){

    const { id, formId, max, min, checkFunction, isRequired, type } = props
    const dispatch = useDispatch()

    return(

        <HrInput 
            id={id} 
            onBlur={(e) => {
                const value = e.target.value
                dispatch(validationFormAction.removeCheckedInput(formId, id))
                if(value){
                    dispatch(errorActions.clear(`${id}-error`))
                    if(isRequired && !checkFunction(value)) {
                        dispatch(errorActions.add({ output: `${id}-error`, what: id, why: "Wrong format" }))
                    } else {
                        dispatch(validationFormAction.addCheckedInput(formId, id))
                    }
                }
            }} 
            onChange={(e) => {
                dispatch(errorActions.clear(`${id}-error`))
                const value = e.target.value
                const minLength = type === "number" ? String(min).length : min
                if(value.length < minLength){ return false }
                if(!checkFunction(value)) {
                    dispatch(errorActions.add({ output: `${id}-error`, what: id, why: "Wrong format" }))
                }
            }}
            required={isRequired}
            $max={max} 
            $min={min}
            $type={type} 
        />

    )

}

export default Input