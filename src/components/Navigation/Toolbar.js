import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import HamburgerIcon from '../UIComponents/HamburgerIcon/HamburgerIcon';

const Toolbar =(props) =>(

    <header className={classes.Toolbar}>
        <HamburgerIcon clicked={props.openSideDrawer}/>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default Toolbar;