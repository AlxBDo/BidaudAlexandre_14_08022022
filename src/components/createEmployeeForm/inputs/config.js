import { departments, states } from "./selectOptions"
import { format } from './validation'

/**
 * Provide object contains params use to create inputs 
 * @param {string} id - use for html attribute
 * @param {string} label - text display to label
 * @param {string} type - use for input html attribute (number, text, ...)
 * @param {boolean} required - use for input html attribute. 
 * @returns {object} 
 * @example { id: "myInputId", label: "My label text", type: "text", required: true }
 */
function define(id, label, type, required = true) { return { id, label, required, type } }

/**
 * Provide object contains params use to create inputs 
 * @param {string} id - use for html attribute
 * @param {string} label - text display to label
 * @param {number} max - use for html attribute (define maxLength for text input)
 * @param {number} min - use for html attribute (define minLength for text input)
 * @param {string} type - use for input html attribute (number, text, ...)
 * @param {boolean} required - use for input html attribute. 
 * @returns {object} 
 * @example { id: "myInputId", label: "My label text", max: 50, min: 2, type: "text", required: true }
 */
 function defineInputHtml(id, label, max, min, type, required = true) { 
    type = type === "text" ? id !== "street" ? "name" : "adress" : type 
    const checkFunction = (valueToCheck) => format.check(valueToCheck, {type, max, min})
    return { checkFunction, max, min, ...define(id, label, type, required) } 
}

/**
 * Provide object contains params use to create select inputs 
 * @param {string} id - use for html attribute
 * @param {string} label - text display to label
 * @param {array} options - contains objects defining select options 
 * @param {boolean} required - use for input html attribute. 
 * @returns {object} 
 * @example { id: "myInputId", label: "My label text", options: [ { label: "option 1", value: 1 }, ... ], type: "select", required: true }
 */
 function defineSelect(id, label, options, required = true){
    return { options, ...define(id, label, "select", required) } 
}

/**
 * Provide object contains params use to create inputs 
 * @param {string} id - use for html attribute
 * @param {string} label - text display to label
 * @param {number} max - use to define max length allowed 
 * @param {number} min - use to define min length allowed
 * @param {boolean} required - use for input html attribute. 
 * @returns {object} 
 * @example { id: "myInputId", label: "My label text", max: 50, min: 2, type: "text", required: true }
 */
function defineText(id, label, max = 30, min = 2, required = true) { 
    return defineInputHtml(id, label, max, min, "text", required) 
}


const city = defineText("city", "City", 50)

const dateOfBirth = define("dateOfBirth", "Date of Birth", "date")

const department = defineSelect("department", "Department", departments)

const firstName = defineText("firstName", "First Name") 

const lastName = defineText("lastName", "Last Name")

const startDate = define("startDate", "Start Date", "date") 

const state = defineSelect("state", "State", states)

const street = defineText("street", "Street", 80, 4)

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
