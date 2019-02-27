import React,{Component} from 'react';
import {connect} from 'react-redux'; 
import classes from './ContactData.module.css';
import Button from '../../../components/UIComponents/Button/Button';
import axios from '../../../Axios-Order';
import Spinner from '../../../components/UIComponents/Spinner/Spinner';
import Input from '../../../components/UIComponents/Input/Input';
import errorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
import {updatedObject,checkValidatity} from '../../../shared/utility';
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
        const formData={};
        for (let formDataField in this.state.orderForm){
            formData[formDataField] = this.state.orderForm[formDataField].value
        }
        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        
        }
        this.props.onBurgerOrdered(order,this.props.token)
       

    }
    inputChangeHandler(event,inputIdentifier){
        

        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidatity( event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        });
        const updatedOrderForm =updatedObject(this.state.orderForm,{
            [inputIdentifier]:updatedFormElement
        })
        let isFormValid=true;
        for(let inputElement in updatedOrderForm){
            isFormValid = updatedOrderForm[inputElement].valid && isFormValid 
        }
     
        this.setState({orderForm:updatedOrderForm,isFormValid:isFormValid})
       ;
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
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps =dispatch =>{
    return {
        onBurgerOrdered:(orderData,token) => dispatch(actions.purchaseBurger(orderData,token)),
     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(ContactForm,axios));