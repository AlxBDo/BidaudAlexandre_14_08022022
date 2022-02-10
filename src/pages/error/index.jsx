import { Page } from "../../style"
import { HomePageReturnLink, StyledDiv, StyledFirstP, StyledSecondP } from "./style"

/**
 * Component displaying error page if route does not exist
 * @component
 * @returns {object} StyledMain - <main> styled component
 */
function Error() {
    return(
        <Page>
            <StyledDiv>
                <StyledFirstP id="page-not-found">404</StyledFirstP>
                <StyledSecondP>Oups! The page you are looking for does not exist.</StyledSecondP>
            </StyledDiv>
            <StyledDiv>
                <HomePageReturnLink to="/">Return to home page</HomePageReturnLink>
            </StyledDiv>
        </Page>
    )
}

export default Error