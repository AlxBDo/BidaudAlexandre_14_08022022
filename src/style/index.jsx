import styled from 'styled-components'
import { style } from 'rh-date-picker/dist/style'

const colors = { dark: "#383F51", light: "#DDDBF1", advice: "#93AD18", error: "#D81159" }

style.setColors(colors)

export const styleDef = {
    padding: "5px 10px", 
    headerBgColor: "#5B6E05", 
    headerColor: "white", 
    colors
}

export const pageDefinition = `
    background-color: ${ style.page.bgColor() };
    color: ${ style.page.color() }
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