import { getDatabase, ref, child, get } from "firebase/database";
import { db } from "./config";

const dbRef = ref(getDatabase())

const employees = {sum: 0}

get(child(dbRef, "employees/")).then((employeesDb) => {
    if(employeesDb.exists()){ 
        const value = employeesDb.val()
        employees.sum = Object.keys(value).length
        employees.value = value
    } 
}).catch((error) => {
    console.error("get employees error : ", error)
})

export default employees