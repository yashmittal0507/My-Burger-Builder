import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import {consoleStatementsRemover} from './shared/utility';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import( './containers/CheckoutPage/Checkout')
});

const asyncOrders = asyncComponent(()=>{
  return import( './containers/Orders/Orders')
});

const asyncAuth = asyncComponent(()=>{
  return import( './containers/Auth/Auth')
});
class App extends Component {

  componentDidMount() {
    this.props.onAuthRedirect()
    if (process.env.NODE_ENV === 'production') {
      consoleStatementsRemover()
    }
  }
  render() {
  
   let routes =null;
    if(this.props.isAuthInitialized){
     routes = (
      
      <Switch> 
        <Route path="/auth" component ={asyncAuth}/>
        <Route path="/" exact component ={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
     
    if(this.props.isAuthenticated){
      routes=(
      <Switch>
        <Route path="/checkout" component ={asyncCheckout}/>
        <Route path="/auth" component ={asyncAuth}/>
        <Route path="/orders" component ={asyncOrders}/>
        <Route path="/logout" component ={Logout}/>
        <Route path="/" exact component ={BurgerBuilder}/>
        
      </Switch>
      )
    }
  }
    return (
   <div>
      <Layout>
         {routes}
      </Layout>
   </div>
    )
  }
}
const mapStateToProps =state=>{
  return {
    isAuthenticated:state.auth.token!==null,
    isAuthInitialized:state.auth.isAuthInitializedAfterReloading
  }
}

const mapDispatchToProps =dispatch=>{
  return {
    onAuthRedirect:()=> dispatch(actions.checkAuthState())
  }
 
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
