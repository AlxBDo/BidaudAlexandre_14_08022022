import { createSlice } from "@reduxjs/toolkit"

const formState = (inputs) => { return {
    status: "to-check", 
    issue: false,
    inputs, 
    checked: { sum: 0 }, 
    values: {}
}}

const initialState = {
    status: "off", 
    forms: {} 
}

/**
 * @typedef {object} validationForm 
 * @component 
 * @description Redux component storing information relating to the validation of forms created with the Form component. 
 * @property {function} clearForm - Deletes the information from the form corresponding to the id passed as an argument.
 * @property {function} addForm - Add new form to state.
 * @property {function} addCheckedInput - Add an input to the list of validated inputs
 * @property {function} removeCheckedInput - Remove an input to the list of validated inputs. 
 * @property {function} submitForm - Change the state to "submitted" and add an issue if necessary.
 */
const { actions, reducer } = createSlice({
    name: "validationForm", 
    initialState,
    reducers: {

        /**
         * @name clearForm 
         * @memberof validationForm 
         * @description Deletes the information from the form corresponding to the id passed as an argument. 
         * @param {string} formId - Form id to clean 
         * @example `validationFormAction.clearForm( myFormId )`
         */
        clearForm: {
            prepare: (formId) => ({
                payload : { formId }
            }), 
            reducer: (draft, action) => {
                if(draft.forms[action.payload.formId]){
                    draft.forms[action.payload.formId].status = "to-check"
                    draft.forms[action.payload.formId].checked = { sum: 0 } 
                    draft.forms[action.payload.formId].issue = false 
                    draft.forms[action.payload.formId].values = {} 
                }
                return
            }
        },
        
        /**
         * @name addForm 
         * @memberof validationForm 
         * @description Add new form to state. 
         * @param {string} formId - Form id
         * @param {array} inputs - Inputs id array 
         * @example `validationFormAction.addForm( myFormId, inputs = [ input1Id, input2Id, ... ] )`
         */
        addForm: {
            prepare: (formId, inputs) => ({
                payload: {formId, inputs}
            }),
            reducer: (draft, action) => {
                const formId = String(action.payload.formId) 
                if(formId && !draft.forms[formId]){
                    const inputs = action.payload.inputs
                    if(Array.isArray(inputs) && inputs.length > 0){
                        draft.forms[formId] = formState(inputs)
                        if(draft.status === "off"){ draft.status = "on" }
                    } 
                }
                return
            }
        }, 
        
        /**
         * @name addCheckedInput 
         * @memberof validationForm 
         * @description Add an input to the list of validated inputs. 
         * @param {string} formId - Form id  
         * @param {string} inputId - Input id  
         * @param {string | number | boolean} [false] inputValue - Input value to store
         * @example `validationFormAction.addCheckedInput( myFormId, inputId, inputValue = false )`
         */
        addCheckedInput: {
            prepare: (formId, inputId, inputValue = false) => ({
                payload: {formId, inputId, inputValue}
            }),
            reducer: (draft, action) => {
                const formId = String(action.payload.formId)
                const inputId = action.payload.inputId
                const inputs = draft.forms[formId].inputs
                if(draft.forms[formId] && inputs.indexOf(inputId) >= 0 && !draft.forms[formId].checked[inputId]){
                    draft.forms[formId].checked[inputId] = true 
                    draft.forms[formId].checked.sum++
                    if(action.payload.inputValue){
                        draft.forms[formId].values[inputId] = action.payload.inputValue
                    }
                    if(inputs.length === draft.forms[formId].checked.sum){
                        draft.forms[formId].status = "checked"
                    }
                }
                return 
            }
        }, 
        
        /**
         * @name removeCheckedInput 
         * @memberof validationForm 
         * @description Remove an input to the list of validated inputs. 
         * @param {string} formId - Form id to clean 
         * @param {string} inputId - Input id  
         * @example `validationFormAction.removeCheckedInput( myFormId, inputId )`
         */
        removeCheckedInput: {
            prepare: (formId, inputId) => ({
                payload: {formId, inputId}
            }),
            reducer: (draft, action) => {
                const formId = String(action.payload.formId)
                const inputId = action.payload.inputId
                if(draft.forms[formId]){
                    if(draft.forms[formId].checked[inputId]){ draft.forms[formId].checked.sum-- }
                    draft.forms[formId].checked[inputId] = false
                    if(draft.forms[formId].values[inputId]){
                        draft.forms[formId].values[inputId] = null
                    }
                    if(draft.forms[formId].status !== "to-check"){
                        draft.forms[formId].status = "to-check"
                        draft.forms[formId].issue = false
                    }
                }
                return 
            }
        }, 
        
        /**
         * @name submitForm 
         * @memberof validationForm 
         * @description Change the state to "submitted" and add an issue if necessary. 
         * @param {string} formId - Form id to submit 
         * @param {string} submitIssue - Message informing of the validation of the formulation displayed at its submission
         * @example `validationFormAction.submitForm( myFormId, submitIssue = false )`
         */
        submitForm: {
            prepare: (formId, submitIssue) => ({
                payload: { formId, submitIssue }
            }),
            reducer: (draft, action) => {
                const formId = action.payload.formId
                if(draft.forms[formId] && draft.forms[formId].checked.sum === draft.forms[formId].inputs.length){
                    draft.forms[formId].issue = action.payload.submitIssue
                    draft.forms[formId].status = "submited" 
                }
                return
            }
        }
    }
})

export const { addForm, addCheckedInput, clearForm, removeCheckedInput, submitForm } = actions

export default reducer