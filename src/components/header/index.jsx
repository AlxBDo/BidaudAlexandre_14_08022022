import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { HeaderStyled } from './style'

function Header(){

    const location = useLocation()
    
    return(
        <HeaderStyled>
            <h1>{ location.pathname === "/employees" ? (`Current Employees`) : (`HRnet`) }</h1>
        </HeaderStyled>
    )

}

export default Header