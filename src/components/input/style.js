import styled from "styled-components";
import { defaultInputRules } from "../form/style"

export const HrInput = styled.input.attrs(props => 
    props.$type === "text" ? {
        type: "text", 
        maxLength: props.$max,
        minLength: props.$min
    } : props.$type === "number" ? {
        type: "number", 
        maxLength: props.$max,
        minLength: props.$min
    } : {
        type: props.$type
    }
)`
    ${ defaultInputRules };
`