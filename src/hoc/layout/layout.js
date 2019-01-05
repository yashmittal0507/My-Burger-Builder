import React, { Component } from 'react';
import Aux from '../AuxFolder/auxHoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={
        showSideDrawer:false
    }
    closeSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggle=()=>{
        this.setState((prevState) =>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render() {

        
        return (
            <Aux>
                <SideDrawer open ={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <Toolbar openSideDrawer={this.sideDrawerToggle} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }



}

export default Layout;