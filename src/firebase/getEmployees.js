import { getDatabase, ref, child, get } from "firebase/database";
import { collection, getDocs } from "firebase/firestore"; 
import { db, firestoreDb } from "./config";

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

const employeesFirestore = await getDocs(collection(firestoreDb, "employees"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

export { employees, employeesFirestore}