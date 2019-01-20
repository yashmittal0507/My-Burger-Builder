import React,{Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UIComponents/Button/Button';
import axios from '../../../Axios-Order';
import Spinner from '../../../components/UIComponents/Spinner/Spinner';
class ContactForm extends Component {
    state ={
       name:'',
       email:'',
       address:{
           street:'',
           postalCode:''
       },
       loading:false
    }

    orderhandler=()=>{
        this.setState({loading:true});
        const order ={
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer:{
                Name:'Yash',
                Email:'Test@Test.com',
                'Delivery-Method':'Fastest',
                Address:{
                    Street:'Test-Street',
                    City:'Banglore',
                    Pincode:474006,
                    Country:'India'
                }
            }
        }
       
         axios.post( '/orders.json', order )
            .then( response => {
                console.log(response);
                this.setState({ loading: false});
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState({ loading: false});
            } );

    }
render() {
    let form =null;
    if(this.state.loading){
        form =<Spinner/>
    }
    else {
        form = <form>
        <input type="text" placeholder="Your Name" name="name"/>
        <input type="email" placeholder="Mail Id" name="mail"/>
        <input type="text" placeholder="Street" name="street"/>
        <input type="text" placeholder="postalCode" name="postal"/>
        <Button btnType="Success" clicked={this.orderhandler}>ORDER</Button>
        </form>
    }
    return(
        <div className={classes.ContactData}>
        <h4>Please Enter your Contact Details!</h4>
           {form}
        </div>
    )
}
}

export default ContactForm;