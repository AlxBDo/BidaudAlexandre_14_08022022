import { useSelector } from 'react-redux'
import { selectError } from 'rh-date-picker/dist/utils/selectors'
import PropTypes from "prop-types"

import { AdviceP, ErrorCtn, ErrorP } from "./style"


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

function ErrorBox(props){

    const { inputId, inputName, max, min } = props
    const errors = useSelector(selectError())
    const id = `${inputId}-error`

    return !errors.error[id] ? null : (
        <ErrorCtn>
            <ErrorP id={id}>{inputName} does not respect the required format.</ErrorP>
            <AdviceP>{(() => {
                switch(id){
                    case "zip-code-error": 
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
