import { Link } from 'react-router-dom' 

import { Page } from '../../style'
import CreateEmployeeForm from '../../components/createEmployeeForm'

function Home(){

    return(
        <Page>
            <Link to="/employees">View Current Employees</Link>
            <h2>Create Employee</h2>
            <CreateEmployeeForm />
        </Page>
    )

}

export default Home