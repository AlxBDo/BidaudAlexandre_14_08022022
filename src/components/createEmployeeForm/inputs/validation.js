/**
 * @typedef {object} format
 * @description Provide function to check inputs value format
 * @property {object} args - Contains regExp parameter to check name and adress 
 * @property {string} args.adress 
 * @property {string} args.name 
 * @property {function} check - Check format of value passed in first parameter 
 * @example `format.check( myValueToCheck, { type: "number", max: 50, min: 1} )` 
 * @property {function} test - Execute regExp method test 
 */
export const format = {

    args : {
        adress: "^[a-zA-Z0-9- ]+$",
        name: "^[a-zA-Z- ]+$"
    },

    /**
     * @description Check format of "toCheck" parameter
     * @name format.check
     * @memberof format
     * @function
     * @param {string | number} toCheck - value to check 
     * @param {object} param1 
     * @param {string} param1.type - accept number, name or adress 
     * @param {number} param1.max - maximum value allowed (max length for string) 
     * @param {number} param1.min - minimum value allowed (min length for string) 
     * @returns {boolean} checkResult
     */
    check: (toCheck, { type, max = false, min = false }) => {
        if(min || max){
            const toCheckQuantity =  type === "number" ?  toCheck : toCheck.length 
            if(max && toCheckQuantity > max) { return false }
            if(min && toCheckQuantity < min) { return false }
        }
        return type === "number" ? Number.isInteger(parseInt(toCheck)) : format.test(toCheck, type)
    },

    /**
     * Execute regExp method test
     * @param {string | number} toCheck - value to check 
     * @param {string} type - accept number, name or adress 
     * @returns {boolean} checkResult
     */
    test: (toCheck, type) => {
        if(typeof toCheck !== "string"){ return false }
        const regExpObj = new RegExp(format.args[type])
        return regExpObj.test(toCheck)
    }

}