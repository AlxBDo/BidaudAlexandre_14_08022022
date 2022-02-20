import styled from "styled-components";
import { pageDefinition } from "../../style";

export const HeaderStyled = styled.header`
    margin-bottom: 2%;
    display: flex;
    padding: 1%;
    box-shadow: 0px 1px 10px black;
    align-items: center;
    ${pageDefinition}
    @media (min-width: 501px){
        width: 100%; 
    }
    @media (max-width: 500px){
        flex-wrap: wrap;
        h1, h2 { width: 45% }
        h1 { text-align: left } 
        h2 { 
            text-align: right; 
            font-size: large;
        }
        a {
            width : 100%; 
            margin: 3% auto; 
            opacity: 0.7;
            &:hover { opacity: 1 }
        }
    }
`