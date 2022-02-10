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

function Input(props){

    const { id, formId, max, min, checkFunction, isRequired, type } = props
    const dispatch = useDispatch()

    return(

        <HrInput 
            id={id} 
            onBlur={(e) => {
                dispatch(errorActions.clear(`${id}-error`))
                dispatch(validationFormAction.removeCheckedInput(formId, id))
                if(isRequired && !checkFunction(e.target.value)) {
                    dispatch(errorActions.add({ output: `${id}-error`, what: id, why: "Wrong format" }))
                } else {
                    dispatch(validationFormAction.addCheckedInput(formId, id))
                }
            }} 
            onChange={(e) => {
                dispatch(errorActions.clear(`${id}-error`))
                const value = e.target.value
                if(value.length < 2){ return false }
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