import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger =(props) =>{
    let transformedIngredient = Object.keys(props.ingredients)
        .map(ingKey =>{
            return [...Array(props.ingredients[ingKey])].map((_, i)=> {
                return <BurgerIngredient key={ ingKey + i} type={ingKey} />
            });
        })
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[])
    
        console.log(transformedIngredient);
        if(transformedIngredient.length===0){
            transformedIngredient = <p>Please Start Adding Some Ingredients!</p>
        }
        return (
            <div className ={classes.Burger}>
                <BurgerIngredient type='bread-top'></BurgerIngredient>
                 {transformedIngredient}
                <BurgerIngredient type='bread-bottom'></BurgerIngredient>
            </div>
        )

};

export default burger;