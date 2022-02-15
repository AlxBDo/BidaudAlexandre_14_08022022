import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MUIDatatable from "mui-datatables"
import { selectEmployees } from "../../utils/selectors"
import { Page } from "../../style"

function Employees(){

    const employees = useSelector(selectEmployees())

    const datatableEmployeesList = employees.list.map( (employee) => {
        return [
            employee.firstName, 
            employee.lastName, 
            employee.startDate, 
            employee.department, 
            employee.dateOfBirth, 
            employee.street, 
            employee.city, 
            employee.state, 
            employee.zipCode
        ] 
    }, [])

    const datatableColumnTitles = [
        "First name", 
        "Last name", 
        "Start date", 
        "Department", 
        "Date of birth", 
        "Street", 
        "City",
        "State", 
        "Zip code"
    ] 

    return (
        <Page>
            <MUIDatatable 
                title={ "Employees list" }
                data={ datatableEmployeesList } 
                columns={ datatableColumnTitles }
            />
            <Link to="/">Home</Link>
        </Page>
    )

}

export default Employees