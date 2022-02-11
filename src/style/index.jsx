import styled from 'styled-components'

import { style } from 'rh-date-picker/dist/style'


export const styleDef = {
    padding: "2%"
}

export const pageDefinition = `
    @media (max-width: 500px){
        width: 100%
    };
    @media (min-width: 501px){
        width: 90%
    }
`

export const Page = styled.div`
    ${pageDefinition}
`