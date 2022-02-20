import { createSlice } from "@reduxjs/toolkit"

const formState = (inputs) => { return {
    status: "to-check", 
    issue: false,
    inputs, 
    checked: [], 
    values: {}
}}

const initialState = {
    status: "off", 
    forms: {} 
}

const { actions, reducer } = createSlice({
    name: "validationForm", 
    initialState,
    reducers: {
        clearForm: {
            prepare: (formId) => ({
                payload : { formId }
            }), 
            reducer: (draft, action) => {
                if(draft.forms[action.payload.formId] && draft.forms[action.payload.formId].status !== "to-check"){
                    draft.forms[action.payload.formId].status = "to-check"
                    draft.forms[action.payload.formId].checked = []
                    draft.forms[action.payload.formId].issue = false 
                    draft.forms[action.payload.formId].values = {}
                }
                return
            }
        },
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
        addCheckedInput: {
            prepare: (formId, inputId, inputValue = false) => ({
                payload: {formId, inputId, inputValue}
            }),
            reducer: (draft, action) => {
                const formId = String(action.payload.formId)
                const inputChecked = draft.forms[formId].checked
                const inputId = action.payload.inputId
                const inputs = draft.forms[formId].inputs
                if(draft.forms[formId] && inputs.indexOf(inputId) >= 0){
                    draft.forms[formId].checked = [inputId, ...inputChecked] 
                    if(action.payload.inputValue){
                        draft.forms[formId].values[inputId] = action.payload.inputValue
                    }
                    if(inputs.length === (inputChecked.length + 1)){
                        draft.forms[formId].status = "checked"
                    }
                }
                return 
            }
        }, 
        removeCheckedInput: {
            prepare: (formId, inputId) => ({
                payload: {formId, inputId}
            }),
            reducer: (draft, action) => {
                const formId = String(action.payload.formId)
                const inputChecked = draft.forms[formId].checked
                const inputId = action.payload.inputId
                const index = inputChecked.indexOf(inputId)
                if(draft.forms[formId] && index >= 0){
                    draft.forms[formId].checked = inputChecked.splice(index, 1)
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
        submitForm: {
            prepare: (formId, submitIssue) => ({
                payload: { formId, submitIssue }
            }),
            reducer: (draft, action) => {
                const formId = action.payload.formId
                if(draft.forms[formId] && draft.forms[formId].checked.length === draft.forms[formId].inputs.length){
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