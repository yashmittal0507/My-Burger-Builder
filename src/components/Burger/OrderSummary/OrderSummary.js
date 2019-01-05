import React,{Component} from 'react';
import Aux from '../../../hoc/AuxFolder/auxHoc';
import Button from '../../UIComponents/Button/Button';

class Ordersummary extends Component {

    componentWillUpdate(){
        console.log('[OrderSummary] will update');
    }

    //This could be a functional component not required to be a class
    //can remove the method 'Component Will Update' as it is for only debugging purpose

    render(){
        const ingredientsSummary  = Object.keys(this.props.ingredients)
        .map(ingKey => {
            return (
            <li key={ingKey}><span style={{textTransform: 'capitalize'}}>
            {ingKey}</span>: {this.props.ingredients[ingKey]}</li>
         ) });
        return (
            <Aux>
               <h1 style={{textAlign:'center'}}>Order Summary</h1> 
               <p>A delicious Burger with the following Ingredients:</p>
               <ul>
                    {ingredientsSummary}
                    
               </ul>
               <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
               <p>Continue to checkout ?</p>
               <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
               <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
    
            </Aux>
        )
    }
   

   
    
}

export default Ordersummary