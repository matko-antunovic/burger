import React from "react";
import classes from "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient" ;

const burger = (props) => {

    let transformedIngredients= Object.keys(props.ingredients)
    .map(ing => {
        return [...Array(props.ingredients[ing])]
    .map((_,i)=> {
        return <BurgerIngredient key={ing+i} type={ing} />;
    });
    })
    .reduce((acc, el)=> {
        return  acc.concat(el)
    } , []);
    
    if(transformedIngredients === 0) {
       transformedIngredients =  <p>Please add ingredients</p>
    }
    return (
        <div className= {classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
        
    );
};

export default burger;