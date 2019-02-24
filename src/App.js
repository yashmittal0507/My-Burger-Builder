import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckoutPage/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {

  componentDidMount(){
    this.props.onAuthRedirect()
  }
  render() {

   let routes =null;
    if(this.props.isAuthInitialized){
     routes = (
      
      <Switch>
        <Route path="/auth" component ={Auth}/>
        <Route path="/" exact component ={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
     
    if(this.props.isAuthenticated){
      routes=(
      <Switch>
        <Route path="/checkout" component ={Checkout}/>
        <Route path="/auth" component ={Auth}/>
        <Route path="/orders" component ={Orders}/>
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
