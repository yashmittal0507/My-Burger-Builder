import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png'; // we can import image with any name i.e instead of burgerLogo we can use any name
const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurgerLogo" />
    </div>
)

export default logo;