import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UIComponents/Backdrop/Backdrop';
import Aux from '../../../hoc/AuxFolder/auxHoc';


const sideDrawer = (props) => {

    let attachedClasses =[classes.SideDrawer,classes.Close]
    if(props.open){
        attachedClasses =[classes.SideDrawer,classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems  isAuth={props.isAuth}/>
            </div>
        </Aux>
    )
}

export default sideDrawer