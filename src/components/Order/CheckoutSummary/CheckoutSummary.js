import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UIComponents/Button/Button';
const checkoutSummary =(props)=>(

    <div className={classes.CheckoutSummary}>
        <h1>We Hope it Tastes Good !</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType="Danger">CANCEL</Button>
        <Button btnType="Success">CONTINUE</Button>
    </div>
);

export default checkoutSummary;
    
