import React , {Component} from 'react';

import Aux from '../../hoc/AuxFolder/auxHoc';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UIComponents/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-Order';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENTS_PRICE ={
    salad:0.5,
    bacon:0.7,
    cheese:1,
    meat:2
}

class BurgerBuilder extends Component {

    state ={
        ingredients:null,
        purchasable:false,
       totalPrice:4,
       purchasing:false,
       loading:false,
       error:false
    }

    componentDidMount(){
        axios.get('https://react-burger-builder-app-4c229.firebaseio.com/ingredients')
        .then(response=>{
            this.setState({ingredients:response.data})
        })
        .catch(error=>{
            this.setState({error:true})
        })
    }

    addIngredient =(type)=>{
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount+1;
        let upgradedIngredient ={ ...this.state.ingredients}
        let newPrice = this.state.totalPrice+INGREDIENTS_PRICE[type];
        upgradedIngredient[type]= newCount;

        this.setState({ingredients:upgradedIngredient,totalPrice:newPrice})
        this.calculateIngredientsQuantitySum(upgradedIngredient);
        
    }
    removeIngredient =(type)=>{
        let oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        let newCount = oldCount-1;
        let upgradedIngredient ={ ...this.state.ingredients}
        let deletedPrice = this.state.totalPrice-INGREDIENTS_PRICE[type];
        upgradedIngredient[type]= newCount;

        this.setState({ingredients:upgradedIngredient,totalPrice:deletedPrice})
        this.calculateIngredientsQuantitySum(upgradedIngredient);
        
    }

    calculateIngredientsQuantitySum(updatedIngredients){
        const ingredients = {...updatedIngredients}
        const sum = Object.keys(ingredients)
                    .map(ingKey => ingredients[ingKey])
                    .reduce((sum,el)=>{
                        return sum+el
                    },0)
        this.setState({purchasable:sum>0})
    }

    purchaseHandler=() => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        // alert('you can continue the purchase');
        this.setState({loading:true});
        const order ={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
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
                this.setState({ loading: false, purchasing: false });
            } )
            .catch( error => {
                this.setState({ loading: false, purchasing: false });
            } );
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]===0
        }
        let orderSummary=null;
         

        
        let burger =this.state.error?<p>The Ingredient's Can't be loaded</p>:<Spinner/>
        // if(this.state.loading){
        //     orderSummary=<Spinner/>
        // }
        if(this.state.ingredients){
            orderSummary= <OrderSummary 
            ingredients ={this.state.ingredients}
            purchaseCancel ={this.purchaseCancelHandler}
            purchaseContinue ={this.purchaseContinueHandler}
            price ={this.state.totalPrice}/>
            burger=( <Aux>
            <Burger ingredients ={this.state.ingredients}/>
            <BuildControls addedIngredient =
        
                {this.addIngredient}
            removedIngredient = {this.removeIngredient}
            disabledButton = {disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered ={this.purchaseHandler}/>
            </Aux>
            )
            if(this.state.loading){
                orderSummary=<Spinner/>
            }
            
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

export default errorHandler(BurgerBuilder,axios);