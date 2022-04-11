import styled from "styled-components";
import { defaultInputCtnRules } from "../form/style";


export const InputCtn = styled.div`
    @media (min-width: 1020px) {
        max-width: 22%;
    }
    ${ defaultInputCtnRules }
`

export const StyledLabel = styled.label`
    padding: 5px 0px
`