import React,{Component} from 'react';
import Input from '../../components/UIComponents/Input/Input';
import Button from '../../components/UIComponents/Button/Button';
import classes from './Auth.module.css';
import * as authActions from '../../store/actions/index';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updatedObject,checkValidatity} from '../../shared/utility';

export class Auth extends Component {
   state={
       controls:{
        Email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your E-Mail'
            },
            value:'',
            validation:{
                required:true,
                pattern:true
            },
            valid:false,
            touched:false,
            validationErrorMessage:'Please Enter a valid Email Address'
            },
            Password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
                validationErrorMessage:'Please Enter atleast six digit password'
                }
       },
       isSignUp:true
   }

   componentDidMount(){
       if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
           this.props.onSetAuthRedirectPath();
       }
   }

 

inputChangeHandler=(event,controlName)=>{
  
        const updatedControlName = updatedObject(this.state.controls[controlName],{
            value:event.target.value,
            valid:checkValidatity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        })

        const updatedAuthControls = updatedObject(this.state.controls,{
            [controlName]:updatedControlName
        })
        this.setState({controls:updatedAuthControls});
}

submitHandler =(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.Email.value,this.state.controls.Password.value,this.state.isSignUp)
}

switchAuthModeHandler=()=>{
    this.setState(prevState=>{
        return {isSignUp:!prevState.isSignUp}
    })
}

        render(){

            const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form =formElementsArray.map(el=>{
            return  <Input elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
             key={el.id} 
             changed={(event)=> this.inputChangeHandler(event,el.id)}
             invalid={!el.config.valid}
             shouldValidate={el.config.validation}
             touched={el.config.touched}
             errorMessage={el.config.validationErrorMessage}
             value={el.config.value}
             />
        })

        if(this.props.loading){
            form =<Spinner/>
        }
        let errorMessage=null;
       
        if(this.props.error && this.props.error !=='undefined'){
            console.log(this.state.controls)
            errorMessage=<p>{this.props.error}</p>
        }
        if(this.props.error ==='undefined' && this.state.isSignUp){
            errorMessage=<p>Sign up successfull</p>
        }

        let authRedirect =null
       
        if(this.props.isAuthenticated){
            authRedirect=<Redirect  to={this.props.authDirectPath}/>
        }
       
       
            return (
                <div className={classes.Auth} >
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                    
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button btnType="Primary" clicked={this.switchAuthModeHandler}>{this.state.isSignUp?'SWITCH TO SIGNIN':'SWITCH TO SIGNUP'}</Button>
                </div>
           
            )

            }
}

const mapStateToProps = state =>{

    return {
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthenticated:state.auth.token!==null,
    authDirectPath:state.auth.authRedirectPath,
    buildingBurger:state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email,password,isSignup) => dispatch(authActions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:() => dispatch(authActions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);