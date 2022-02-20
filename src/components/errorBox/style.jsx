import styled from "styled-components";
import { style } from "rh-date-picker/dist/style";
import { styleDef } from "../../style";


export const AdviceP = styled.p`
    color: ${style.colors.default.advice };
    font-size: smaller;
` 

export const ErrorCtn = styled.div`
    max-width: 250px;
    padding: ${ styleDef.padding };
    text-align: justify;
` 

export const ErrorP = styled.p`
    color: ${style.colors.default.error };
    margin-top: 10px
`