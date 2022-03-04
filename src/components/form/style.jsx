import styled from "styled-components";
import { styleDef } from "../../style";
import { style, theme } from "rh-date-picker/dist/style"


export const defaultFlex = `
    display: flex;
    align-items: baseline;
    @media (min-width : 501px){
        flex-wrap: wrap;
    }
    @media (max-width : 500px){
        flex-direction: column;
    }
`

export const defaultInputRules = `
    color: ${ style.color() };
    background: ${ style.backgroundColor() }; 
    height: 20px;
    border: 1px solid;
    border-radius: 3px;
    padding: ${ styleDef.padding }
`

export const defaultInputCtnRules = `
    width: 250px;
    text-align: left;
    margin: 3% auto;
    ${ defaultFlex }
    align-items: center;
    label, div:first-child:not(.date-picker-input div) { margin: 0; }
    label { padding-right: 5px; }
    @media (max-width : 1150px){
        flex-direction: column;
        flex-wrap: nowrap;
    }
`

export const InputsSection = styled.section`
    ${ defaultFlex };
    justify-content: space-between;
    fieldset {
        width: 100%;
        border: 1px solid rgba(${theme === "dark" ? (`0, 0, 0, 0.5`) : (`255, 255, 255, 0.5`)});
        border-radius: 5px;
        background-color: rgba(${theme === "dark" ? (`0, 0, 0, 0.1`) : (`255, 255, 255, 0.3`)});
        ${ defaultFlex }
        legend {
            padding: 0px 0px 11px;
            border-radius: 10px;
            margin: 0 1%;
            color: rgba(${theme === "dark" ? (`0, 0, 0, 0.5`) : (`255, 255, 255, 0.5`)});
        }
    };
    div.css-1bytwjp-control {
        border-color: ${ style.color() }
    }
`

export const StyledForm = styled.form`
    text-align: left;
    div.hrnet-dp-error {
        max-width: 250px;
        div {
            margin: 0px 10px;
        }
    }
    div.hrnet-input-ctn {
        ${ defaultInputCtnRules } 
        input { ${defaultInputRules} }
    };
    div.date-picker-input div {
        box-sizing: content-box;
    };
    section div.date-ctn {
        width: 270px;
    };
`

export const SubmitButton = styled.button`
    margin-bottom: 25px;
    padding: 10px 15px;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 3px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 250ms ease-out;
    &:disabled {
        opacity: 0.25;
        cursor: not-allowed;
        background-color: #465403;
    }
  }
`

export const ValidationSection = styled.section`
    text-align: center;
    display: flex;
    flex-wrap: wrap;
` 