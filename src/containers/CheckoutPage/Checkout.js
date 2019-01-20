import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactForm from './ContactData/ContactData';
class Checkout extends Component {
    state ={
        ingredients:null,
        totalPrice:0
    }
    componentWillMount(){
        const queryParams = new URLSearchParams(this.props.location.search)
        const ingredients={};
        for(let params of queryParams.entries()){
            if(params[0]==='totalPrice'){
                this.setState({totalPrice:+params[1]})
            }
            else {
                ingredients[params[0]]=+params[1]
            }
         
        }
        this.setState({ingredients:ingredients});
        // console.log(this.props);
    }
    checkoutCancelHandler= ()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler =() => {
       this.props.history.replace('/checkout/contact-data-form');
    }

    render(){
        // let checkoutSummary = null;
        // if(this.state.ingredients){
        //     checkoutSummary = (
        //      <React.Fragment>
            
        //    </React.Fragment>

            
        //     )
        // }
        // else {
        //     checkoutSummary= <div>No Ingredient's Added yet</div>
        // }
        return (
            <React.Fragment>
            <CheckoutSummary 
            ingredients={this.state.ingredients}
            checkoutCancelHandler={this.checkoutCancelHandler}
            checkoutContinueHandler={this.checkoutContinueHandler}/>
            <Route path={this.props.match.path+'/contact-data-form'} 
            render={(props)=><ContactForm ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}/>
           </React.Fragment>

        )
    }
}

export default Checkout;