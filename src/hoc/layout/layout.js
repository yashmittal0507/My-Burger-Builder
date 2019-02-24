import React, { Component } from 'react';
import Aux from '../AuxFolder/auxHoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
                <SideDrawer open ={this.state.showSideDrawer} closed={this.closeSideDrawerHandler} isAuth={this.props.isAuthenticated}/>
                <Toolbar openSideDrawer={this.sideDrawerToggle} isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }



}

const mapStateToProps=state=>{
    return {
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);