import DatePicker from 'rh-date-picker/dist/component/datePicker'
import Select from 'react-select'
import { useDispatch } from 'react-redux'

import * as validationFormAction from "../../../features/validationForm"
import { config } from './config'
import Input from '../../input'
import ErrorBox from '../../errorBox'


function DatePickerInput({id, label, type}){
    const dispatch = useDispatch()
    const eventFunction = {
        onBlur: (inputValue) => {
            if(inputValue){
                dispatch(validationFormAction.addCheckedInput("createEmployeeForm", id))
            } else {
                dispatch(validationFormAction.removeCheckedInput("createEmployeeForm", id))
            }
        }
    }

    return(
        <DatePicker 
            inputId={ id } 
            label={ label } 
            type={ type } 
            eventFunction={ eventFunction }
        />
    )
}

function InputBox({ checkFunction, id, label, max, min, required, type, options = false }){
    return(
        <div>
            <label htmlFor={ id }>{ label }</label>
            { type === "select" ? SelectInput(id, options) 
            : (
                <Input 
                    checkFunction={checkFunction}
                    id={id} 
                    formId={"createEmployeeForm"}
                    max={max} 
                    min={min} 
                    isRequired={required} 
                    type={type} 
                />
            )}
            <ErrorBox inputId={id} inputName={label} max={max} min={min} />
        </div>
    )
}

function SelectInput(id, options){
    const dispatch = useDispatch()
    
    return(
        <Select id={ id } options={ options } onChange={(e) => {
            if(e.label && e.value){
                dispatch(validationFormAction.addCheckedInput("createEmployeeForm", id))
            } else {
                dispatch(validationFormAction.removeCheckedInput("createEmployeeForm", id))
            }
        }} />
    )
}


export const inputsId = Object.keys(config).map((ipt) => config[ipt].id, [])

export const City = () => InputBox(config.city)

export const DateOfBirth = () => DatePickerInput(config.dateOfBirth) 

export const Department = () => InputBox(config.department)

export const FirstName = () => InputBox(config.firstName)

export const LastName = () => InputBox(config.lastName)

export const States = () => InputBox(config.state)

export const StartDate = () => DatePickerInput(config.startDate) 

export const Street = () => InputBox(config.street) 

export const ZipCode = () => InputBox(config.zipCode)