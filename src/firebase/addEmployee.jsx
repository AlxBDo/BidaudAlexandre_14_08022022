import { firestoreDb } from "./config"
import { collection, addDoc } from "firebase/firestore"; 
import { encryptItem } from "../utils/crypt"

/**
 * Add employee to FireStore database. 
 * Last name, first name and street are encrypted before injection into the database.
 * @param {object} param0 
 * @param {string} param0.firstName 
 * @param {string} param0.lastName 
 * @param {string} param0.dateOfBirth 
 * @param {string} param0.startDate  
 * @param {string} param0.street  
 * @param {string} param0.city  
 * @param {string} param0.state 
 * @param {number} param0.zipCode 
 * @param {string} param0.department 
 * @see encryptItem
 */
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
