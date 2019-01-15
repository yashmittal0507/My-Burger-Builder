import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/CheckoutPage/Checkout';
import {Route,Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
   <div>
      <Layout>
    <Switch>
    <Route path="/checkout" component ={Checkout}/>
    <Route path="/" component ={BurgerBuilder}/>
    </Switch>
      </Layout>
   </div>
    )
  }
}

export default App;
