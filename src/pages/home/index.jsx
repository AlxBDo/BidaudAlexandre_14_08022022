import { Link } from 'react-router-dom' 

import { Page } from '../../style'
import CreateEmployeeForm from '../../components/createEmployeeForm'

function Home(){

    return(
        <Page>
            <CreateEmployeeForm />
        </Page>
    )

}

export default Home