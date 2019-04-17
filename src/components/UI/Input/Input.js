import React from "react";
import classes from "./Input.css";

const input = (props) => { 
    let inputElement=null;
    const inputClasses=[classes.inputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case("input"):
        
            inputElement= <input 
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}
             {...props.elementConfig} />;
            break;
        case("textarea"):
            inputElement=<textarea 
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}
             {...props.elementConfig} />;
            break;
        case("select"):
            inputElement= (
            <select
            className={inputClasses.join(" ")}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option=>(
                <option 
                key={option.value}
                value={option.value}>
                {option.displayValue}
                </option>
            ))}
            </select>)
            break;

        default:
        inputElement= <input 
        className={inputClasses.join(" ")}
        value={props.value} 
        {...props.elementConfig} />;    
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;
