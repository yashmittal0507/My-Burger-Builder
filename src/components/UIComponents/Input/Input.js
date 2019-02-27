import React from 'react';
import classes from './Input.module.css';

const input =(props)=>{

    let inputElement=null;
    const inputClasses =[classes.InputElement]
    let validationErrorMsg =null;
    if(props.invalid && props.shouldValidate && props.touched){
        validationErrorMsg=<p className={classes.ValidationError}>{props.errorMessage}</p>
        inputClasses.push(classes.Invalid)
       
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig}
            defaultValue={props.value}/>
            break;
        case('textarea'):
            inputElement =<textarea  className={inputClasses.join(' ')}
            {...props.elementConfig}
            defaultValue={props.value}/>
            break;
        case('select'):
        inputElement=<select className={inputClasses.join(' ')} value={props.value} style={{padding:'3px 14px'}}>
        <option value='' style={{display:'none'}}>--select--</option>
            {props.elementConfig.options.map(option=>{
               return <option key={option.value} value={option.value}>{option.displayName}</option>
            })}
        </select>
        break;
        
        default:
            inputElement = <input className={inputClasses.join(' ')} 
            {...props.elementConfig}
            defaultValue={props.value}/>
            break;
    }

   


    return(
        <div className={classes.Input} onChange={props.changed}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationErrorMsg}
        </div>
    )
}

export default input;