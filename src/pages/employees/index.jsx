import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom" 
import { style, theme } from 'rh-date-picker/dist/style';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import MUIDatatable from "mui-datatables"
import { selectEmployees } from "../../utils/selectors"
import { Page } from "../../style"
import * as employeesAction from "../../features/employees"

const getMuiTheme = () => createTheme({
  theme,
  palette: {
    primary: {
      main: style.page.color(),
    },
    background: {
      default: style.backgroundColor(),
    },
  },
})


function Employees(){

    const employees = useSelector(selectEmployees())
    const dispatch = useDispatch()
    employeesAction.fetchListFromFirestore().then( (el) => { return el && el
    }).then( (value) => { dispatch(employeesAction.setList(value)) }) 

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
        {
          name: "First name",
          options: {
            filter: false
          }
        }, 
        {
          name: "Last name"
        }, 
        {
          name: "Start date", 
          options: {
            display: false,
          }
        }, 
        {
          name: "Department"
        }, 
        {
          name: "Date of birth", 
          options: {
            display: false, 
            filter: false
          }
        }, 
         
        {
          name: "Street", 
          options: {
            display: false, 
            filter: false
          }
        }, 
         
        {
          name: "City", 
          options: {
            display: false,
          }
        },
        {
          name: "State", 
          options: {
            display: false,
          }
        }, 
         
        {
          name: "Zip code",
        }
    ] 
    
    return (
        <Page>
          <ThemeProvider theme={ getMuiTheme() }>
            <MUIDatatable 
                title={ "Employees list" }
                data={ datatableEmployeesList } 
                columns={ datatableColumnTitles }
                options={ {responsive: "simple"} } 
            />
            <Link to="/">Home</Link>
          </ThemeProvider>
        </Page>
    )

}

export default Employees