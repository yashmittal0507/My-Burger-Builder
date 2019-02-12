import React,{Component} from 'react';
import {connect} from 'react-redux'; 
import classes from './ContactData.module.css';
import Button from '../../../components/UIComponents/Button/Button';
import axios from '../../../Axios-Order';
import Spinner from '../../../components/UIComponents/Spinner/Spinner';
import Input from '../../../components/UIComponents/Input/Input';
import errorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
class ContactForm extends Component {
    state ={
        orderForm:{
            Name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter your Name'
                }
                ,
            Email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter a valid Email Address'
                },
               
            Street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter Street Address'
                },
            City:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'City Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter The City '
                },
            Pincode:{
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Postal Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter a valid Pincode'
                },
            Country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter Country Name'
                },
            'Delivery-Method':{
                elementType:'select',
                elementConfig:{
                   options:[{
                       value:'fastest',displayName:'Fastest'
                   },
                   {
                    value:'cheapest',displayName:'Cheapest'
                }]
                },
                value:'',
                valid:true,
                validation:{}
                },
        },
       isFormValid:false
    }

    orderhandler=(event)=>{
        event.preventDefault();
        // this.setState({loading:true});
        const formData={};
        for (let formDataField in this.state.orderForm){
            formData[formDataField] = this.state.orderForm[formDataField].value
        }
        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        
        }
        this.props.onBurgerOrdered(order)
       
        //  axios.post( '/orders.json', order )
        //     .then( response => {
        //         console.log(response);
        //         this.setState({ loading: false});
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState({ loading: false});
        //     } );

    }
    inputChangeHandler(event,inputIdentifier){
        const updatedOrderForm ={...this.state.orderForm}

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value =event.target.value;
        updatedFormElement.valid = this.checkValidatity( updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        
        updatedOrderForm[inputIdentifier] =   updatedFormElement
        let isFormValid=true;
        for(let inputElement in updatedOrderForm){
            isFormValid = updatedOrderForm[inputElement].valid && isFormValid 
            console.log(this.state.isFormValid,inputElement)
        }
     
        this.setState({orderForm:updatedOrderForm,isFormValid:isFormValid})
       ;
    }

    checkValidatity(value,rules){
        let isValid=true;

        if(!rules){
            return true
        }
        if(rules.required){
            isValid =value!==''
        }
        if(rules.minLength){
            isValid = value.length>=5 && isValid;
        }
        if(rules.maxLength){
            isValid = value.length<=5 && isValid;
        }
        return isValid;
    }

render() {
    let form =null;
    if(this.props.loading){
        form =<Spinner/>
    }
    else {
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        form = (<form onSubmit={this.orderhandler}>
       { formElementsArray.map(el=>{
           return  <Input elementType={el.config.elementType}
           elementConfig={el.config.elementConfig}
            key={el.id} 
            changed={(event)=> this.inputChangeHandler(event,el.id)}
            invalid={!el.config.valid}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            errorMessage={el.config.validationErrorMessage}
            />
        })}
        <Button btnType="Success" clicked={this.orderhandler} disabled={!this.state.isFormValid}>ORDER</Button>
        </form>
        )
    }
    return(
        <div className={classes.ContactData}>
        <h4>Please Enter your Contact Details!</h4>
           {form}
        </div>
    )
}
}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
}
const mapDispatchToProps =dispatch =>{
    return {
        onBurgerOrdered:(orderData) => dispatch(actions.purchaseBurger(orderData)),
     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(ContactForm,axios));