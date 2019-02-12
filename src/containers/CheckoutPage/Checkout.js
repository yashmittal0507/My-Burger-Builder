import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactForm from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {
    // state ={
    //     ingredients:null,
    //     totalPrice:0
    // }
    // componentWillMount(){
    //     const queryParams = new URLSearchParams(this.props.location.search)
    //     const ingredients={};
    //     for(let params of queryParams.entries()){
    //         if(params[0]==='totalPrice'){
    //             this.setState({totalPrice:+params[1]})
    //         }
    //         else {
    //             ingredients[params[0]]=+params[1]
    //         }
         
    //     }
    //     this.setState({ingredients:ingredients});
    //     // console.log(this.props);
    // }

    // componentWillMount(){
    //     if(!this.props.ings){
    //         this.props.history.goBack(); // This is one more way of redirecting if no ingredients are there
    //     }
    // }
    checkoutCancelHandler= ()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler =() => {
       this.props.history.replace('/checkout/contact-data-form');
    }

    render(){
        let summary =<Redirect to="/"/>
        // let summary=null;
        if(this.props.ings){
            const purchasedRedirect =this.props.purchased?<Redirect to ="/"/>:null
             summary=<React.Fragment>
             {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelHandler={this.checkoutCancelHandler}
                checkoutContinueHandler={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data-form'} 
                component={ContactForm}/>
           </React.Fragment>
        }
        return summary
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);