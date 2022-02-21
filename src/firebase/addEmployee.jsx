import { firestoreDb } from "./config"
import { collection, addDoc } from "firebase/firestore"; 
import { encryptItem } from "../utils/crypt"


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
      firstName = encryptItem(firstName) 
      lastName = encryptItem(lastName)
      street = encryptItem(street)
        addDoc(collection(firestoreDb, "employees"), {
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
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
