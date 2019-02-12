import React,{Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../Axios-Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
import * as actions from '../../store/actions/index';
class Orders extends Component {
    

    componentDidMount(){
      this.props.onFetchOrders();
    }
    render(){
        let order=null;
        if(this.props.loading){
            order =<Spinner/>
        }
        else {
            order =(
                <React.Fragment>
                
               {this.props.orders.map(order=>{
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
               })
            }
            </React.Fragment>
            )
        }
        return(
            <div>
             {order}
            </div>
        )
    }
}

const mapStateToProps = state =>{
return  {
    loading:state.order.loading,
    orders:state.order.orders
}
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders:()=> dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));