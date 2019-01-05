import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
   <div>
      <Layout>
      
      <p>This is Test Component</p>
      <BurgerBuilder/>
      </Layout>
   </div>
    )
  }
}

export default App;
