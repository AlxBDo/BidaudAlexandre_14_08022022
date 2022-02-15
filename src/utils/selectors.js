export const selectEmployees = () => (state) => { return state.employees }

export const selectValidationForm = (formId) => (state) => { return state.validationForm.forms[formId] }