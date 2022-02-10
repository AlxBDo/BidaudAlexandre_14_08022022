
export const format = {

    args : {
        adress: "^[a-zA-Z0-9- ]+$",
        name: "^[a-zA-Z- ]+$"
    },

    check: (toCheck, { type, max = false, min = false }) => {
        if(min || max){
            const toCheckQuantity =  type === "number" ?  toCheck : toCheck.length 
            if(max && toCheckQuantity > max) { return false }
            if(min && toCheckQuantity < min) { return false }
        }
        return type === "number" ? Number.isInteger(parseInt(toCheck)) : format.test(toCheck, type)
    },

    test: (toCheck, type) => {
        if(typeof toCheck !== "string"){ return false }
        const regExpObj = new RegExp(format.args[type])
        return regExpObj.test(toCheck)
    }

}