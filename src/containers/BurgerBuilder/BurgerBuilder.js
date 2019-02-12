import React , {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/AuxFolder/auxHoc';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UIComponents/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-Order';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state ={
        
       purchasing:false
    }

    componentDidMount(){
        console.log('mounted')
        this.props.onInitIngredients()
        
    }

    // addIngredient =(type)=>{
    //     let oldCount = this.state.ingredients[type];
    //     let newCount = oldCount+1;
    //     let upgradedIngredient ={ ...this.state.ingredients}
    //     let newPrice = this.state.totalPrice+INGREDIENTS_PRICE[type];
    //     upgradedIngredient[type]= newCount;

    //     this.setState({ingredients:upgradedIngredient,totalPrice:newPrice})
    //     this.calculateIngredientsQuantitySum(upgradedIngredient);
        
    // }
    // removeIngredient =(type)=>{
    //     let oldCount = this.state.ingredients[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     let newCount = oldCount-1;
    //     let upgradedIngredient ={ ...this.state.ingredients}
    //     let deletedPrice = this.state.totalPrice-INGREDIENTS_PRICE[type];
    //     upgradedIngredient[type]= newCount;

    //     this.setState({ingredients:upgradedIngredient,totalPrice:deletedPrice})
    //     this.calculateIngredientsQuantitySum(upgradedIngredient);
        
    // }

    calculateIngredientsQuantitySum(updatedIngredients){
        console.log('executed');
        const ingredients = {...updatedIngredients}
        const sum = Object.keys(ingredients)
                    .map(ingKey => ingredients[ingKey])
                    .reduce((sum,el)=>{
                        return sum+el
                    },0)
       return sum>0;
    }

    purchaseHandler=() => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        this.props.onPurchasedBurgerInit()
        this.props.history.push('/checkout');
     
    }
    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]===0
        }
        let orderSummary=null;
         

        
        let burger =this.props.error?<p>The Ingredient's Can't be loaded</p>:<Spinner/>
        if(this.props.ings){
            orderSummary= <OrderSummary 
            ingredients ={this.props.ings}
            purchaseCancel ={this.purchaseCancelHandler}
            purchaseContinue ={this.purchaseContinueHandler}
            price ={this.props.price}/>
            burger=( <Aux>
            <Burger ingredients ={this.props.ings}/>
            <BuildControls addedIngredient =
        
                {this.props.onIngredientAdded}
            removedIngredient = {this.props.onIngredientRemoved}
            disabledButton = {disabledInfo}
            price={this.props.price}
            purchasable={this.calculateIngredientsQuantitySum(this.props.ings)}
            ordered ={this.purchaseHandler}/>
            </Aux>
            )
           
            
        }

      
       
        return (
            <Aux>
            <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps =state =>{
    return {
        ings:state.burgerBuilder.ingredients,
       price:state.burgerBuilder.totalPrice,
       error:state.burgerBuilder.error
    }
}

const mapDispatchToProps =dispatch =>{
    return {
        onIngredientAdded:(ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients()),
        onPurchasedBurgerInit:() => dispatch(burgerBuilderActions.burgerPurchased())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder,axios));