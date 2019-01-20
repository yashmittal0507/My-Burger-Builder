import React from 'react';
import classes from './Order.module.css';
const Order =(props)=>{

    let ingredients=[];

    for(let ing in props.ingredients){
        ingredients.push({name:ing,quantity:props.ingredients[ing]})
    }

    const ingredientOutput = ingredients.map(ing=>{
        return <span key={ing.name} className={classes.Ingredient}>{ing.name}({ing.quantity})</span>
    }

    )
    return(
        <div className={classes.Order}>
        <p>Ingredients:{ingredientOutput}</p>
        <p> Price:<strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )

    
}

export default Order;