import { firestoreDb } from "./config"
import { collection, addDoc } from "firebase/firestore"; 


export function addEmployee({ 
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
    try {
        const docRef = addDoc(collection(firestoreDb, "employees"), {
            firstName, 
            lastName, 
            dateOfBirth, 
            startDate, 
            street, 
            city, 
            state, 
            zipCode, 
            department 
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
