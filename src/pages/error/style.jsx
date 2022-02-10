
import { Link } from "react-router-dom"
import styled from 'styled-components'

export const HomePageReturnLink = styled(Link)`
    color: red;
    @media (max-width: 899px){
        font-size: small;
        font-weight: 500;
    }
`

export const StyledDiv = styled.div`
    @media (max-width: 899px){
        margin: 50% auto 40%;
		width: 80%;
    }
    @media (min-width: 900px){ margin: 6% auto 10%; }
`

export const StyledFirstP = styled.p`
    margin: 2% auto;
    font-weight: 700;
    @media (max-width: 899px){
        font-size: 5em;
    }
    @media (min-width: 900px){
        font-size: 10em;
        margin: 2% auto;
    }
`

export const StyledSecondP = styled.p`
    font-weight: 500;
    @media (max-width: 899px){
        font-size: large;
        line-height: 1.5;
    }
    @media (min-width: 900px){
        font-size: x-large;
    }
`