import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeaderStyled } from './style'

function getHeaderParamsObject(h2, linkText, linkTo, title){
    return { h2, linkText, linkTo, title }
}

function defineHeaderParams(locationPathName){
    var params
    switch (locationPathName) {
        case "/":
            params = getHeaderParamsObject(
                "Create Employee", 
                "Employees List", 
                "/employees", 
                "Create employee form" 
            )
            break;
        case "/employees":
            params = getHeaderParamsObject(
                "Current Employees", 
                "Home", 
                "/", 
                "Current employees list"
            )
            break;
        default:
            params = getHeaderParamsObject(
                "🚧 No Way 🚧", 
                "Home", 
                "/", 
                "Error page"
            )
            break;
    }
    return params
}

/**
 * Display header page 
 * @component
 * @returns {object} Header
 */
function Header(){

    const location = useLocation()
    
    const params =  defineHeaderParams(location.pathname)

    useEffect(()=>{
        document.title = params.title
    }, [params.title])
    
    return(
        <HeaderStyled data-testid="header">
            <h1 data-testid="header-h1">HRnet</h1>
            <h2 data-testid="header-h2">{ params.h2 }</h2>
            <Link to={ params.linkTo } data-testid="header-link">{ params.linkText }</Link>
        </HeaderStyled>
    )

}

export default Header