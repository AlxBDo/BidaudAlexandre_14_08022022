import DatePicker from 'rh-date-picker/dist/component/datePicker'
import {currentDate} from "rh-date-picker/dist/utils/date"
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'

import { selectValidationForm } from "../../../utils/selectors"
import * as validationFormAction from "../../../features/validationForm"
import { config } from './config'
import Input from '../../input'
import ErrorBox from '../../errorBox'
import { InputCtn, StyledLabel } from "../style"
import { style } from "rh-date-picker/dist/style";


function DatePickerInput({id, label, type}){

    const dispatch = useDispatch()
    
    const deadlines = id === "dateOfBirth" && {
        max: `${currentDate.day}-${currentDate.month}-${parseInt(currentDate.year - 14)}`, 
        min: `${currentDate.day}-${currentDate.month}-${parseInt(currentDate.year - 70)}`
    }
    
    const eventFunction = {
        onBlur: (inputValue) => {
            if(inputValue){
                dispatch(validationFormAction.addCheckedInput("createEmployeeForm", id))
            } else {
                dispatch(validationFormAction.removeCheckedInput("createEmployeeForm", id))
            }
        }
    }

    const htmlClass = { container: "hrnet-input-ctn"}
    
    return(
        <DatePicker 
            inputId={ id } 
            label={ label } 
            deadlines= { deadlines }
            type={ type } 
            eventFunction={ eventFunction } 
            htmlClass={ htmlClass }
        />
    )
}

function InputBox({ checkFunction, id, label, max, min, required, type, options = false }){
    return(
        <InputCtn>
            <StyledLabel htmlFor={ id }>{ label }</StyledLabel>
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
        </InputCtn>
    )
}

function SelectInput(id, options){
    const dispatch = useDispatch()
    const validationForm = useSelector(selectValidationForm("createEmployeeForm"))
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: "165px",
        }),
        control: (provided) => ({
            ...provided,
            color: style.color(),
            backgroundColor: style.backgroundColor()
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: style.backgroundColor()
        }),
        option: (provided) => ({
            ...provided,
            color: style.color(),
            backgroundColor: style.backgroundColor()
        }),
        singleValue: (provided) => ({
            ...provided,
            color: style.color()
        }),
      }
    return(
        <Select id={ id } options={ options } styles={customStyles} value={ validationForm.values[id] ? [validationForm.values[id]] : {label: null, value: null} } isClearable={true} onChange={(e) => {
            if(e && e.value){
                dispatch(validationFormAction.addCheckedInput("createEmployeeForm", id, e))
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