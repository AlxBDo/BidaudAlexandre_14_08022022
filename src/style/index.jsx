import styled from 'styled-components'
import { style } from 'rh-date-picker/dist/style'


export const styleDef = {
    padding: "5px 10px"
}

export const pageDefinition = `
    background-color: ${ style.backgroundColor() };
    color: ${ style.color() }
    @media (max-width: 500px){
        width: 100%
    };
    @media (min-width: 501px){
        width: 90%
    }
`

export const Page = styled.div`
    ${pageDefinition};
    div.css-11mde6h-MuiPaper-root {
        background-color: ${ style.backgroundColor() };
        color: ${ style.color() };
        th, td, div {
            background-color: ${ style.backgroundColor() };
            color: ${ style.color() }
        }
    };
    div.css-1ex1afd-MuiTableCell-root {
        color: ${ style.color() };

    };
`