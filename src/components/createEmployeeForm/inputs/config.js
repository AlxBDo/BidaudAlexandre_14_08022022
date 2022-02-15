import { departments, states } from "./selectOptions"
import { format } from './validation'


function define(id, label, type, required = true) { return { id, label, required, type } }

function defineInputHtml(id, label, max, min, type, required = true) { 
    type = type === "text" ? id !== "street" ? "name" : "adress" : type 
    const checkFunction = (valueToCheck) => format.check(valueToCheck, {type, max, min})
    return { checkFunction, max, min, ...define(id, label, type, required) } 
}

function defineSelect(id, label, options, required = true){
    return { options, ...define(id, label, "select", required) } 
}

function defineText(id, label, max = 30, min = 2, type = "text", required = true) { 
    return defineInputHtml(id, label, max, min, type, required) 
}


const city = defineText("city", "City", 50)

const dateOfBirth = define("dateOfBirth", "Date of Birth", "date")

const department = defineSelect("department", "Department", departments)

const firstName = defineText("firstName", "First Name") 

const lastName = defineText("lastName", "Last Name")

const startDate = define("startDate", "Start Date", "date") 

const state = defineSelect("state", "State", states)

const street = defineText("street", "Street", 75, 4)

const zipCode = defineInputHtml("zipCode", "Zip Code", 99950, 501, "number")


export const config = { 
    city, 
    dateOfBirth, 
    department, 
    firstName, 
    lastName, 
    startDate, 
    state, 
    street, 
    zipCode
}
