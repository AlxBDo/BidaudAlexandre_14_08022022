import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { HeaderStyled } from './style'


function Header(){

    const location = useLocation()
    
    const params = location.pathname === "/employees" ? {
        h2 : "Current Employees", 
        title : "Current employees list", 
        linkTo : "/", 
        linkText: "Home"
    } : {
        h2 : "Create Employee", 
        title : "Create employee form", 
        linkTo : "/employees", 
        linkText: "Employees List" 
    }

    useEffect(()=>{
        document.title = params.title
    }, [])
    
    return(
        <HeaderStyled>
            <h1>HRnet</h1>
            <h2>{ params.h2 }</h2>
            <Link to={ params.linkTo }>{ params.linkText }</Link>
        </HeaderStyled>
    )

}

export default Header