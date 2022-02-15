import { ref, set } from "firebase/database"

import { db } from "./config"

function addEmployee({
    id, 
    firstName, 
    lastName, 
    dateOfBirth, 
    startDate, 
    street, 
    city, 
    state, 
    zipCode, 
    department 
}){
    set(ref(db, 'employees/'+id), {
        firstName, 
        lastName, 
        dateOfBirth, 
        startDate, 
        street, 
        city,
        state, 
        zipCode, 
        department
    })
}

export default addEmployee