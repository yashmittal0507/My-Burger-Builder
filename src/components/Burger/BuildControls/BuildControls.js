import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
const controls =[
    {name:'Salad', type:'salad'},
    {name:'Cheese', type:'cheese'},
    {name:'Bacon', type:'bacon'},
    {name:'Meat', type:'meat'},
]
const buildControls =(props) => (
    <div className={classes.BuildControls}>
        <p>Total Price :<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>{
           return <BuildControl key={ctrl.name} label ={ctrl.name}
           added ={()=> props.addedIngredient(ctrl.type)}
           removed ={() => props.removedIngredient(ctrl.type)} 
           disable ={props.disabledButton[ctrl.type]}/>
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable}
        onClick= {props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;