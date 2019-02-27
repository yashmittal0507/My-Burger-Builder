import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../Axios-Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
import * as actions from '../../store/actions/index';
class Orders extends Component {
    

    componentDidMount(){
      this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let order=null;
        if(this.props.loading){
            order =<Spinner/>
        }
        else if(this.props.orders.length>0) {
            order =(
                <Fragment>
                
               {this.props.orders.map(order=>{
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
               })
            }
            </Fragment>
            )
        }
        else {
            order =<p style={{textAlign:'center',fontWeight:'bold'}}>You Don't have any orders yet</p>
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
    orders:state.order.orders,
    token:state.auth.token,
    userId:state.auth.userId
}
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders:(token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));